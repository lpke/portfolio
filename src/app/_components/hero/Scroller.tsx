'use client';

import {
  Fragment,
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

function applyTrackTransform(track: HTMLDivElement | null, offset: number) {
  if (!track) return;
  track.style.transform = `translate3d(${-offset}px, 0, 0)`;
}

/**
 * Horizontal auto-scrolling container with faded edges.
 *
 * - Auto-scrolls using translateX for reliable, jank-free infinite looping.
 * - Click-and-drag on any device (desktop included).
 * - Shift+scroll on desktop and touch-drag on mobile.
 * - Pauses auto-scroll while the user interacts with the scroller, resumes after a delay.
 * - Uses CSS mask-image for background-agnostic opacity fade on edges.
 * - Content is not selectable.
 */
export function Scroller({
  children,
  speed = scroller.defaultSpeed,
}: ScrollerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const offsetRef = useRef(0);
  const contentWidthRef = useRef(0);
  const isPaused = useRef(false);
  const isInViewport = useRef(true);
  const isPageVisible = useRef(true);
  const reduceMotion = useRef(false);
  const pauseTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const lastTimestamp = useRef<number | null>(null);

  // Drag state
  const isPointerActive = useRef(false);
  const isDragging = useRef(false);
  const hasPointerCapture = useRef(false);
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);
  const dragStartOffset = useRef(0);

  const [isHydrated, setIsHydrated] = useState(false);
  const [cursorStyle, setCursorStyle] = useState<'grab' | 'grabbing'>('grab');
  const renderCopyCount = isHydrated ? scroller.hydratedCopyCount : 1;

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

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsHydrated(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  // Measure a single set of children.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const w = track.scrollWidth / renderCopyCount;
      contentWidthRef.current = w;
      offsetRef.current = wrapOffset(offsetRef.current);
      applyTrackTransform(track, offsetRef.current);
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, [renderCopyCount, wrapOffset]);

  // Animation loop.
  useEffect(() => {
    if (!isHydrated) return;

    const container = containerRef.current;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    reduceMotion.current = motionQuery.matches;

    const handleMotionChange = () => {
      reduceMotion.current = motionQuery.matches;
      lastTimestamp.current = null;
    };

    const handleVisibilityChange = () => {
      isPageVisible.current = !document.hidden;
      lastTimestamp.current = null;
    };

    const observer =
      container && 'IntersectionObserver' in window
        ? new IntersectionObserver(
            ([entry]) => {
              isInViewport.current = Boolean(entry?.isIntersecting);
              lastTimestamp.current = null;
            },
            { rootMargin: '120px 0px' },
          )
        : null;

    if (container && observer) {
      observer.observe(container);
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    motionQuery.addEventListener('change', handleMotionChange);

    const tick = (timestamp: number) => {
      const shouldAnimate =
        !isPaused.current &&
        !reduceMotion.current &&
        isInViewport.current &&
        isPageVisible.current &&
        contentWidthRef.current > 0;

      if (shouldAnimate) {
        if (lastTimestamp.current !== null) {
          // Normalise speed to ~60fps regardless of actual frame rate.
          const delta = (timestamp - lastTimestamp.current) / (1000 / 60);
          offsetRef.current = wrapOffset(offsetRef.current + speed * delta);
        }
        lastTimestamp.current = timestamp;

        applyTrackTransform(trackRef.current, offsetRef.current);
      } else {
        lastTimestamp.current = null;
      }

      animationRef.current = requestAnimationFrame(tick);
    };

    animationRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationRef.current);
      clearTimeout(pauseTimeout.current);
      observer?.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, [isHydrated, speed, wrapOffset]);

  // User interaction handlers.
  useEffect(() => {
    const container = containerRef.current;
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
      applyTrackTransform(trackRef.current, offsetRef.current);

      pauseAutoScroll();
    };

    // --- Pointer drag (works for mouse AND touch) ---
    const handlePointerDown = (e: PointerEvent) => {
      isPointerActive.current = true;
      dragStartX.current = e.clientX;
      dragStartY.current = e.clientY;
      dragStartOffset.current = offsetRef.current;
      isDragging.current = e.pointerType === 'mouse';
      hasPointerCapture.current = isDragging.current;

      if (isDragging.current) {
        setCursorStyle('grabbing');
        container.setPointerCapture(e.pointerId);
      }

      pauseAutoScroll();
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isPointerActive.current) return;

      if (!isDragging.current) {
        const dx = e.clientX - dragStartX.current;
        const dy = e.clientY - dragStartY.current;

        if (Math.abs(dx) <= 6 || Math.abs(dx) <= Math.abs(dy)) {
          return;
        }

        isDragging.current = true;
        hasPointerCapture.current = true;
        setCursorStyle('grabbing');
        container.setPointerCapture(e.pointerId);
      }

      const dx = dragStartX.current - e.clientX;
      offsetRef.current = wrapOffset(dragStartOffset.current + dx);
      applyTrackTransform(trackRef.current, offsetRef.current);
    };

    const handlePointerUp = (e: PointerEvent) => {
      isPointerActive.current = false;
      if (!isDragging.current) return;

      isDragging.current = false;
      if (hasPointerCapture.current) {
        hasPointerCapture.current = false;
        if (container.hasPointerCapture(e.pointerId)) {
          container.releasePointerCapture(e.pointerId);
        }
      }
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
      ref={containerRef}
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
        {Array.from({ length: renderCopyCount }, (_, index) => (
          <Fragment key={index}>{children}</Fragment>
        ))}
      </div>
    </div>
  );
}
