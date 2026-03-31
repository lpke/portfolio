'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

const ANIM_MS = 300;

export function RequestResumeButton() {
  const [phase, setPhase] = useState<'closed' | 'opening' | 'open' | 'closing'>(
    'closed',
  );
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelContentRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const [btnRect, setBtnRect] = useState<DOMRect | null>(null);
  const [panelSize, setPanelSize] = useState<{ w: number; h: number } | null>(
    null,
  );

  const isVisible = phase !== 'closed';

  const measureButton = useCallback(() => {
    if (!triggerRef.current) return null;
    return triggerRef.current.getBoundingClientRect();
  }, []);

  const measurePanel = useCallback(() => {
    if (!panelContentRef.current) return;
    const rect = panelContentRef.current.getBoundingClientRect();
    setPanelSize({ w: Math.max(rect.width, 320), h: rect.height });
  }, []);

  // ── Open ──
  const open = useCallback(() => {
    const rect = measureButton();
    if (!rect) return;
    setBtnRect(rect);
    setPhase('opening');
  }, [measureButton]);

  useEffect(() => {
    if (phase !== 'opening' || !btnRect) return;
    const raf = requestAnimationFrame(() => {
      measurePanel();
      requestAnimationFrame(() => setPhase('open'));
    });
    return () => cancelAnimationFrame(raf);
  }, [phase, btnRect, measurePanel]);

  useEffect(() => {
    if (phase === 'open') {
      const t = setTimeout(() => emailInputRef.current?.focus(), ANIM_MS);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // ── Close ──
  const close = useCallback(() => {
    const rect = measureButton();
    if (rect) setBtnRect(rect);
    setPhase('closing');
    setTimeout(() => {
      setPhase('closed');
      setPanelSize(null);
    }, ANIM_MS);
  }, [measureButton]);

  // Click outside
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (phase !== 'open') return;
      const target = e.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        panelRef.current &&
        !panelRef.current.contains(target)
      ) {
        close();
      }
    },
    [phase, close],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  // Reposition on scroll / resize
  const updateBtnRect = useCallback(() => {
    const rect = measureButton();
    if (rect) setBtnRect(rect);
  }, [measureButton]);

  useEffect(() => {
    if (!isVisible) return;
    window.addEventListener('scroll', updateBtnRect, true);
    window.addEventListener('resize', updateBtnRect);
    return () => {
      window.removeEventListener('scroll', updateBtnRect, true);
      window.removeEventListener('resize', updateBtnRect);
    };
  }, [isVisible, updateBtnRect]);

  // Re-measure panel as message area animates — poll during the transition
  useEffect(() => {
    if (phase !== 'open') return;
    // Measure at start, middle, and end of the 300ms CSS transition
    const t1 = setTimeout(() => measurePanel(), 10);
    const t2 = setTimeout(() => measurePanel(), 150);
    const t3 = setTimeout(() => measurePanel(), 320);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [showMessage, phase, measurePanel]);

  const handleSubmit = () => {
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      close();
      setEmail('');
      setMessage('');
      setShowMessage(false);
    }, 1400);
  };

  // ── Morph geometry ──
  const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
  const scrollX = typeof window !== 'undefined' ? window.scrollX : 0;

  const collapsed = btnRect
    ? {
        top: btnRect.top + scrollY,
        left: btnRect.left + scrollX,
        width: btnRect.width,
        height: btnRect.height,
        borderRadius: btnRect.height / 2,
      }
    : null;

  const expanded =
    btnRect && panelSize
      ? {
          top: btnRect.top + scrollY,
          left: btnRect.left + scrollX,
          width: panelSize.w,
          height: panelSize.h,
          borderRadius: 12,
        }
      : null;

  const isAtExpanded = phase === 'open';
  const morphTarget = isAtExpanded ? (expanded ?? collapsed) : collapsed;

  const portal =
    isVisible && btnRect
      ? createPortal(
          <div
            ref={panelRef}
            className="z-9999 overflow-hidden border shadow-2xl"
            style={{
              position: 'absolute',
              top: morphTarget?.top ?? 0,
              left: morphTarget?.left ?? 0,
              width: morphTarget?.width ?? 0,
              height: morphTarget?.height ?? 'auto',
              borderRadius: morphTarget?.borderRadius ?? btnRect.height / 2,
              borderColor: 'rgba(255, 255, 255, 0.2)',
              transitionProperty: 'top, left, width, height, border-radius',
              transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)',
              transitionDuration: `${ANIM_MS}ms`,
              transitionDelay: '0ms',
              pointerEvents: phase === 'open' ? 'auto' : 'none',
            }}
          >
            {/* Collapsed: ghost button label */}
            <div
              className="font-headline text-primary absolute inset-0 flex cursor-pointer items-center justify-center font-bold"
              style={{
                opacity: phase === 'open' ? 0 : 1,
                transitionProperty: 'opacity',
                transitionDuration: `${phase === 'open' ? ANIM_MS * 0.25 : ANIM_MS * 0.5}ms`,
                transitionTimingFunction: 'ease',
                transitionDelay:
                  phase === 'closing' ? `${ANIM_MS * 0.4}ms` : '0ms',
                pointerEvents: 'none',
              }}
            >
              Request CV
            </div>

            {/* Expanded panel content */}
            <div
              ref={panelContentRef}
              style={{
                opacity: phase === 'open' ? 1 : 0,
                transitionProperty: 'opacity',
                transitionDuration: `${ANIM_MS * 0.5}ms`,
                transitionTimingFunction: 'ease',
                transitionDelay:
                  phase === 'open' ? `${ANIM_MS * 0.35}ms` : '0ms',
                width: 320,
              }}
            >
              {/* Email row */}
              <div className="bg-surface-container-lowest flex items-center gap-3 px-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-on-surface-variant/40 h-4 w-4 shrink-0"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57V12c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57V12c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
                </svg>
                <input
                  ref={emailInputRef}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="text-on-surface placeholder:text-on-surface-variant/40 flex-1 bg-transparent py-3.5 text-sm outline-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !showMessage) handleSubmit();
                  }}
                />
              </div>

              {/* Message area */}
              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  maxHeight: showMessage ? '140px' : '0',
                  opacity: showMessage ? 1 : 0,
                }}
              >
                <div className="bg-surface-container-lowest border-t border-white/5">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write an optional message..."
                    rows={3}
                    className="text-on-surface placeholder:text-on-surface-variant/40 w-full resize-none bg-transparent px-4 py-3 text-sm outline-none"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="bg-surface-container flex items-center justify-between px-4 py-3">
                <button
                  type="button"
                  onClick={() => setShowMessage(!showMessage)}
                  className="flex items-center gap-2"
                >
                  <span
                    className={`relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors duration-200 ${
                      showMessage
                        ? 'bg-primary/60'
                        : 'bg-surface-container-highest'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 h-3 w-3 rounded-full bg-white shadow transition-transform duration-200 ${
                        showMessage ? 'translate-x-4' : ''
                      }`}
                    />
                  </span>
                  <span className="text-on-surface-variant/50 text-xs font-medium">
                    Add message
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!email || submitted}
                  className="signature-gradient text-on-primary rounded-full px-5 py-1.5 text-sm font-bold transition-all hover:shadow-[0_0_12px_rgba(123,208,255,0.4)] disabled:opacity-40"
                  style={{ cursor: !email || submitted ? 'default' : 'pointer' }}
                >
                  {submitted ? '\u2713 Sent' : 'Request CV'}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={open}
        className="ghost-border font-headline text-primary hover:bg-primary/5 cursor-pointer rounded-full px-8 py-4 font-bold"
        style={{
          borderColor: 'rgba(255, 255, 255, 0.2)',
          visibility: isVisible ? 'hidden' : 'visible',
        }}
      >
        Request CV
      </button>

      {portal}
    </div>
  );
}
