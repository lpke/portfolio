'use client';

import { useRef, useEffect, useCallback, type ReactNode } from 'react';

type ScrollerProps = {
  children: ReactNode;
  /** Speed in pixels per frame at ~60fps. Default: 0.5 */
  speed?: number;
};

/**
 * Horizontal auto-scrolling container with faded edges.
 *
 * - Auto-scrolls slowly to the right, looping seamlessly.
 * - Supports native shift+scroll on desktop.
 * - Supports touch drag on mobile (native overflow-x-auto).
 * - Pauses auto-scroll while the user interacts.
 */
export function Scroller({ children, speed = 0.5 }: ScrollerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const isPaused = useRef(false);
  const pauseTimeout = useRef<ReturnType<typeof setTimeout>>();

  const pauseAutoScroll = useCallback(() => {
    isPaused.current = true;
    clearTimeout(pauseTimeout.current);
    pauseTimeout.current = setTimeout(() => {
      isPaused.current = false;
    }, 3000);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const tick = () => {
      if (!isPaused.current && el.scrollWidth > el.clientWidth) {
        el.scrollLeft += speed;

        // Loop: when we've scrolled past the first set, jump back
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animationRef.current = requestAnimationFrame(tick);
    };

    animationRef.current = requestAnimationFrame(tick);

    // Pause on user interaction
    const handleWheel = () => pauseAutoScroll();
    const handleTouchStart = () => pauseAutoScroll();
    const handlePointerDown = () => pauseAutoScroll();

    el.addEventListener('wheel', handleWheel, { passive: true });
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('pointerdown', handlePointerDown);

    return () => {
      cancelAnimationFrame(animationRef.current);
      clearTimeout(pauseTimeout.current);
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [speed, pauseAutoScroll]);

  return (
    <div className="relative">
      {/* Left fade */}
      <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-16 bg-gradient-to-r from-surface to-transparent" />
      {/* Right fade */}
      <div className="pointer-events-none absolute top-0 bottom-0 right-0 z-10 w-16 bg-gradient-to-l from-surface to-transparent" />

      <div
        ref={scrollRef}
        className="scrollbar-hide flex overflow-x-auto scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Render children twice for seamless loop */}
        {children}
        {children}
      </div>
    </div>
  );
}
