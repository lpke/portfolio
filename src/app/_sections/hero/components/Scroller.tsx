'use client';

import {
  useRef,
  useEffect,
  useCallback,
  useState,
  type ReactNode,
} from 'react';
import { LAYOUT_CONFIG } from '@/utils/constants';

type ScrollerProps = {
  children: ReactNode;
  /** Speed in pixels per frame at ~60fps. Default: 0.5 */
  speed?: number;
};

const { scroller } = LAYOUT_CONFIG;

/**
 * Horizontal auto-scrolling container with faded edges.
 *
 * - Auto-scrolls using translateX for reliable, jank-free infinite looping.
 * - Click-and-drag on any device (desktop included).
 * - Shift+scroll on desktop and touch-drag on mobile.
 * - Pauses auto-scroll while the user interacts, resumes after a delay.
 * - Uses CSS mask-image for background-agnostic opacity fade on edges.
 * - Content is not selectable.
 */
export function Scroller({
  children,
  speed = scroller.defaultSpeed,
}: ScrollerProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const offsetRef = useRef(0);
  const contentWidthRef = useRef(0);
  const isPaused = useRef(false);
  const pauseTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const lastTimestamp = useRef<number | null>(null);

  // Drag state
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);

  const [cursorStyle, setCursorStyle] = useState<'grab' | 'grabbing'>('grab');

  const pauseAutoScroll = useCallback(() => {
    isPaused.current = true;
    lastTimestamp.current = null;
    clearTimeout(pauseTimeout.current);
    pauseTimeout.current = setTimeout(() => {
      isPaused.current = false;
    }, scroller.pauseMs);
  }, []);

  /** Wrap offset into [0, contentWidth) range (Pac-Man style). */
  const wrapOffset = useCallback((value: number): number => {
    const w = contentWidthRef.current;
    if (w <= 0) return 0;
    return ((value % w) + w) % w;
  }, []);

  // Measure a single set of children.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      // The track contains 3 copies; measure one third.
      const w = track.scrollWidth / 3;
      contentWidthRef.current = w;
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, []);

  // Animation loop.
  useEffect(() => {
    const tick = (timestamp: number) => {
      if (!isPaused.current && contentWidthRef.current > 0) {
        if (lastTimestamp.current !== null) {
          // Normalise speed to ~60fps regardless of actual frame rate.
          const delta = (timestamp - lastTimestamp.current) / (1000 / 60);
          offsetRef.current = wrapOffset(offsetRef.current + speed * delta);
        }
        lastTimestamp.current = timestamp;

        const track = trackRef.current;
        if (track) {
          track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
        }
      } else {
        lastTimestamp.current = null;
      }

      animationRef.current = requestAnimationFrame(tick);
    };

    animationRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationRef.current);
      clearTimeout(pauseTimeout.current);
    };
  }, [speed, wrapOffset]);

  // User interaction handlers.
  useEffect(() => {
    const container = trackRef.current?.parentElement;
    if (!container) return;

    // --- Wheel (shift+scroll or horizontal scroll) ---
    const handleWheel = (e: WheelEvent) => {
      // Accept both explicit horizontal scroll and shift+vertical scroll.
      const dx =
        Math.abs(e.deltaX) > Math.abs(e.deltaY)
          ? e.deltaX
          : e.shiftKey
            ? e.deltaY
            : 0;
      if (dx === 0) return;

      e.preventDefault();
      offsetRef.current = wrapOffset(offsetRef.current + dx);

      const track = trackRef.current;
      if (track) {
        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      pauseAutoScroll();
    };

    // --- Pointer drag (works for mouse AND touch) ---
    const handlePointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      setCursorStyle('grabbing');
      dragStartX.current = e.clientX;
      dragStartOffset.current = offsetRef.current;
      container.setPointerCapture(e.pointerId);
      pauseAutoScroll();
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = dragStartX.current - e.clientX;
      offsetRef.current = wrapOffset(dragStartOffset.current + dx);

      const track = trackRef.current;
      if (track) {
        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }
    };

    const handlePointerUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      setCursorStyle('grab');
      pauseAutoScroll();
    };

    // Use non-passive wheel so we can preventDefault for horizontal scroll.
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('pointerdown', handlePointerDown);
    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('pointercancel', handlePointerUp);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('pointerdown', handlePointerDown);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [pauseAutoScroll, wrapOffset]);

  const maskStyle: React.CSSProperties = {
    maskImage: `linear-gradient(to right, transparent 0px, black ${
      scroller.fadeWidthPx + scroller.safetyMarginPx
    }px, black calc(100% - ${
      scroller.fadeWidthPx + scroller.safetyMarginPx
    }px), transparent 100%)`,
    WebkitMaskImage: `linear-gradient(to right, transparent 0px, black ${
      scroller.fadeWidthPx + scroller.safetyMarginPx
    }px, black calc(100% - ${
      scroller.fadeWidthPx + scroller.safetyMarginPx
    }px), transparent 100%)`,
  };

  return (
    <div
      className="relative overflow-hidden select-none"
      style={{
        cursor: cursorStyle,
        touchAction: 'pan-y',
        ...maskStyle,
      }}
    >
      <div
        ref={trackRef}
        className="flex w-max will-change-transform"
        style={{ transform: 'translate3d(0, 0, 0)' }}
        aria-hidden
      >
        {/* Render children 3× for seamless wrapping in both directions. */}
        {children}
        {children}
        {children}
      </div>
    </div>
  );
}
