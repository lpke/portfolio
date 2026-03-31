'use client';

import { useState, useRef, useEffect, useCallback, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

const ANIM_MS = 300;
const MOBILE_BREAKPOINT = 640; // Tailwind `sm`

const mobileQuery = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

function subscribeMobile(cb: () => void) {
  const mql = window.matchMedia(mobileQuery);
  mql.addEventListener('change', cb);
  return () => mql.removeEventListener('change', cb);
}

function getSnapshotMobile() {
  return window.matchMedia(mobileQuery).matches;
}

function getServerSnapshotMobile() {
  return false;
}

function useIsMobile() {
  return useSyncExternalStore(subscribeMobile, getSnapshotMobile, getServerSnapshotMobile);
}

/* ────────────────────────────────────────────
 * Shared form content used by both layouts
 * ──────────────────────────────────────────── */
function PanelForm({
  email,
  setEmail,
  message,
  setMessage,
  showMessage,
  setShowMessage,
  submitted,
  handleSubmit,
  emailInputRef,
  mobile = false,
}: {
  email: string;
  setEmail: (v: string) => void;
  message: string;
  setMessage: (v: string) => void;
  showMessage: boolean;
  setShowMessage: (v: boolean) => void;
  submitted: boolean;
  handleSubmit: () => void;
  emailInputRef: React.RefObject<HTMLInputElement | null>;
  mobile?: boolean;
}) {
  return (
    <>
      {/* Email row */}
      <div className="bg-surface-container-lowest flex items-center gap-3 px-4">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-on-surface-variant/40 h-5 w-5 shrink-0"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57V12c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57V12c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
        </svg>
        <input
          ref={emailInputRef}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className={`text-on-surface placeholder:text-on-surface-variant/40 flex-1 bg-transparent text-base outline-none ${mobile ? 'py-5' : 'py-4'}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !showMessage) handleSubmit();
          }}
        />
      </div>

      {/* Message area */}
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: showMessage ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="bg-surface-container-lowest border-t border-white/5">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Include an optional message..."
              rows={3}
              className="text-on-surface placeholder:text-on-surface-variant/40 w-full resize-none bg-transparent px-4 py-3.5 text-base outline-none"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`bg-surface-container flex items-center justify-between px-4 py-3 ${mobile ? 'pb-5' : ''}`}>
        <button
          type="button"
          onClick={() => setShowMessage(!showMessage)}
          className="flex items-center gap-2"
        >
          <span
            className={`relative inline-flex h-6 w-10 shrink-0 rounded-full transition-colors duration-200 ${
              showMessage
                ? 'bg-primary/60'
                : 'bg-surface-container-highest'
            }`}
          >
            <span
              className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${
                showMessage ? 'translate-x-4' : ''
              }`}
            />
          </span>
          <span className="text-on-surface-variant/50 text-sm font-medium">
            Add message
          </span>
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!email || submitted}
          className="signature-gradient text-on-primary rounded-full px-6 py-2 text-base font-bold transition-all hover:shadow-[0_0_12px_rgba(123,208,255,0.4)] disabled:opacity-40"
          style={{ cursor: !email || submitted ? 'default' : 'pointer' }}
        >
          {submitted ? '\u2713 Sent' : 'Request CV'}
        </button>
      </div>
    </>
  );
}

/* ────────────────────────────────────────────
 * Mobile form — toolbar top, email bottom
 * ──────────────────────────────────────────── */
function MobilePanelForm({
  email,
  setEmail,
  message,
  setMessage,
  showMessage,
  setShowMessage,
  submitted,
  handleSubmit,
  emailInputRef,
}: {
  email: string;
  setEmail: (v: string) => void;
  message: string;
  setMessage: (v: string) => void;
  showMessage: boolean;
  setShowMessage: (v: boolean) => void;
  submitted: boolean;
  handleSubmit: () => void;
  emailInputRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <>
      {/* Toolbar — toggle + submit */}
      <div className="bg-surface-container flex items-center justify-between px-4 py-3">
        <button
          type="button"
          onClick={() => setShowMessage(!showMessage)}
          className="flex items-center gap-2"
        >
          <span
            className={`relative inline-flex h-6 w-10 shrink-0 rounded-full transition-colors duration-200 ${
              showMessage
                ? 'bg-primary/60'
                : 'bg-surface-container-highest'
            }`}
          >
            <span
              className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${
                showMessage ? 'translate-x-4' : ''
              }`}
            />
          </span>
          <span className="text-on-surface-variant/50 text-sm font-medium">
            Add message
          </span>
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!email || submitted}
          className="signature-gradient text-on-primary rounded-full px-6 py-2 text-base font-bold transition-all hover:shadow-[0_0_12px_rgba(123,208,255,0.4)] disabled:opacity-40"
          style={{ cursor: !email || submitted ? 'default' : 'pointer' }}
        >
          {submitted ? '\u2713 Sent' : 'Request CV'}
        </button>
      </div>

      {/* Message area */}
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: showMessage ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="bg-surface-container-lowest border-t border-white/5">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Include an optional message..."
              rows={3}
              className="text-on-surface placeholder:text-on-surface-variant/40 w-full resize-none bg-transparent px-4 py-3.5 text-base outline-none"
            />
          </div>
        </div>
      </div>

      {/* Email row */}
      <div className="bg-surface-container-lowest flex items-center gap-3 px-4">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-on-surface-variant/40 h-5 w-5 shrink-0"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57V12c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57V12c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
        </svg>
        <input
          ref={emailInputRef}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="text-on-surface placeholder:text-on-surface-variant/40 flex-1 bg-transparent py-4 text-base outline-none"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !showMessage) handleSubmit();
          }}
        />
      </div>
    </>
  );
}

/* ────────────────────────────────────────────
 * Mobile bottom-sheet
 * ──────────────────────────────────────────── */
function MobileSheet({
  phase,
  close,
  children,
}: {
  phase: 'closed' | 'opening' | 'open' | 'closing';
  close: () => void;
  children: React.ReactNode;
}) {
  const sheetRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll while sheet is visible
  useEffect(() => {
    if (phase === 'closed') return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  if (phase === 'closed') return null;

  const isOpen = phase === 'open';
  const isClosing = phase === 'closing';

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end"
      style={{
        pointerEvents: isOpen ? 'auto' : 'none',
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 transition-opacity"
        style={{
          opacity: isOpen ? 1 : 0,
          transitionDuration: `${ANIM_MS}ms`,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        onClick={close}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className="bg-surface-container relative z-10 w-full overflow-hidden rounded-t-2xl border-t border-x border-white/10 shadow-2xl"
        style={{
          transform:
            isOpen ? 'translateY(0)' : isClosing ? 'translateY(100%)' : 'translateY(100%)',
          opacity: isOpen || isClosing ? 1 : 0,
          transition: `transform ${ANIM_MS}ms cubic-bezier(0.4,0,0.2,1), opacity ${ANIM_MS * 0.5}ms ease`,
          pointerEvents: isOpen ? 'auto' : 'none',
          // Safe-area for devices with home indicator
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

/* ────────────────────────────────────────────
 * Main component
 * ──────────────────────────────────────────── */
export function RequestResumeButton() {
  const isMobile = useIsMobile();

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
  const [morphHeight, setMorphHeight] = useState<number | null>(null);

  const isVisible = phase !== 'closed';

  const measureButton = useCallback(() => {
    if (!triggerRef.current) return null;
    return triggerRef.current.getBoundingClientRect();
  }, []);

  // ── Open ──
  const open = useCallback(() => {
    if (isMobile) {
      setPhase('opening');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPhase('open'));
      });
      return;
    }
    const rect = measureButton();
    if (!rect) return;
    setBtnRect(rect);
    setPhase('opening');
  }, [isMobile, measureButton]);

  // Desktop morph: measure panel then transition
  useEffect(() => {
    if (isMobile) return;
    if (phase !== 'opening' || !btnRect) return;
    const raf = requestAnimationFrame(() => {
      if (panelContentRef.current) {
        const rect = panelContentRef.current.getBoundingClientRect();
        setMorphHeight(rect.height);
      }
      requestAnimationFrame(() => setPhase('open'));
    });
    return () => cancelAnimationFrame(raf);
  }, [phase, btnRect, isMobile]);

  // After morph completes, clear height & focus
  useEffect(() => {
    if (phase !== 'open') return;
    const t = setTimeout(() => {
      setMorphHeight(null);
      emailInputRef.current?.focus();
    }, ANIM_MS);
    return () => clearTimeout(t);
  }, [phase]);

  // ── Close ──
  const close = useCallback(() => {
    if (isMobile) {
      setPhase('closing');
      setTimeout(() => {
        setPhase('closed');
      }, ANIM_MS);
      return;
    }
    if (panelContentRef.current) {
      const rect = panelContentRef.current.getBoundingClientRect();
      setMorphHeight(rect.height);
    }
    const rect = measureButton();
    if (rect) setBtnRect(rect);
    requestAnimationFrame(() => {
      setPhase('closing');
      setTimeout(() => {
        setPhase('closed');
        setMorphHeight(null);
      }, ANIM_MS);
    });
  }, [isMobile, measureButton]);

  // Click outside (desktop only)
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (isMobile) return;
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
    [isMobile, phase, close],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  // Reposition on scroll / resize (desktop only)
  const updateBtnRect = useCallback(() => {
    const rect = measureButton();
    if (rect) setBtnRect(rect);
  }, [measureButton]);

  useEffect(() => {
    if (isMobile) return;
    if (!isVisible) return;
    window.addEventListener('scroll', updateBtnRect, true);
    window.addEventListener('resize', updateBtnRect);
    return () => {
      window.removeEventListener('scroll', updateBtnRect, true);
      window.removeEventListener('resize', updateBtnRect);
    };
  }, [isMobile, isVisible, updateBtnRect]);

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

  // ── Form props shared by both layouts ──
  const formProps = {
    email,
    setEmail,
    message,
    setMessage,
    showMessage,
    setShowMessage,
    submitted,
    handleSubmit,
    emailInputRef,
  };

  // ── Mobile portal (bottom sheet) ──
  const mobilePortal = isMobile ? (
    <MobileSheet phase={phase} close={close}>
      <PanelForm {...formProps} mobile />
    </MobileSheet>
  ) : null;

  // ── Desktop portal (morph animation — original behaviour) ──
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

  const expanded = btnRect
    ? {
        top: btnRect.top + scrollY,
        left: btnRect.left + scrollX,
        width: 360,
        height: morphHeight,
        borderRadius: 12,
      }
    : null;

  const isMorphedOpen = phase === 'open';
  const morphTarget = isMorphedOpen ? (expanded ?? collapsed) : collapsed;
  const useAutoHeight = phase === 'open' && morphHeight === null;

  const desktopPortal =
    !isMobile && isVisible && btnRect
      ? createPortal(
          <div
            ref={panelRef}
            className="z-40 overflow-hidden border shadow-2xl"
            style={{
              position: 'absolute',
              top: morphTarget?.top ?? 0,
              left: morphTarget?.left ?? 0,
              width: morphTarget?.width ?? 0,
              height: useAutoHeight ? 'auto' : (morphTarget?.height ?? 0),
              borderRadius: morphTarget?.borderRadius ?? btnRect.height / 2,
              borderColor: 'rgba(255, 255, 255, 0.2)',
              transitionProperty: useAutoHeight
                ? 'top, left, width, border-radius'
                : 'top, left, width, height, border-radius',
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
                width: 360,
              }}
            >
              <PanelForm {...formProps} />
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
          visibility: !isMobile && isVisible ? 'hidden' : 'visible',
        }}
      >
        Request CV
      </button>

      {mobilePortal}
      {desktopPortal}
    </div>
  );
}

