'use client';

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
  useSyncExternalStore,
} from 'react';
import { createPortal, flushSync } from 'react-dom';
import {
  EMAIL_CONFIG,
  LAYOUT_CONFIG,
  RESUME_REQUEST_CONTENT,
} from '@/utils/constants';

const ANIM_MS = LAYOUT_CONFIG.motion.resumePanelMs;
const MOBILE_BREAKPOINT = LAYOUT_CONFIG.breakpoints.sm; // Tailwind `sm`

const mobileQuery = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;

type FocusableFormField = HTMLInputElement | HTMLTextAreaElement;
type SubmitStatus = 'idle' | 'submitting' | 'sent' | 'error';

function isCompleteEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

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
  return useSyncExternalStore(
    subscribeMobile,
    getSnapshotMobile,
    getServerSnapshotMobile,
  );
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
  submitStatus,
  handleSubmit,
  emailInputRef,
  messageInputRef,
  isEmailValid,
  focusFieldWithoutScroll,
  mobile = false,
}: {
  email: string;
  setEmail: (v: string) => void;
  message: string;
  setMessage: (v: string) => void;
  showMessage: boolean;
  setShowMessage: (v: boolean) => void;
  submitStatus: SubmitStatus;
  handleSubmit: () => void | Promise<void>;
  emailInputRef: React.RefObject<HTMLInputElement | null>;
  messageInputRef: React.RefObject<HTMLTextAreaElement | null>;
  isEmailValid: boolean;
  focusFieldWithoutScroll: (
    field: FocusableFormField,
    options?: { select?: boolean },
  ) => void;
  mobile?: boolean;
}) {
  const isSubmitting = submitStatus === 'submitting';
  const submitted = submitStatus === 'sent';

  const handleMobileFieldPointerDown = (
    e: React.PointerEvent<FocusableFormField>,
  ) => {
    if (!mobile) return;
    if (document.activeElement === e.currentTarget) return;

    e.preventDefault();
    focusFieldWithoutScroll(e.currentTarget);
  };

  const handleMessageToggle = () => {
    if (showMessage) {
      setShowMessage(false);
      return;
    }

    flushSync(() => setShowMessage(true));
    if (isEmailValid && messageInputRef.current) {
      focusFieldWithoutScroll(messageInputRef.current);
      return;
    }

    if (emailInputRef.current) {
      focusFieldWithoutScroll(emailInputRef.current, { select: !email });
    }
  };

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
          required
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          aria-invalid={email.length > 0 && !isEmailValid}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={RESUME_REQUEST_CONTENT.emailPlaceholder}
          className={`text-on-surface placeholder:text-on-surface-variant/40 flex-1 bg-transparent text-base outline-none ${mobile ? 'py-5' : 'py-4'}`}
          onPointerDown={handleMobileFieldPointerDown}
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
              ref={messageInputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={RESUME_REQUEST_CONTENT.messagePlaceholder}
              rows={3}
              className="text-on-surface placeholder:text-on-surface-variant/40 w-full resize-none bg-transparent px-4 py-3.5 text-base outline-none"
              onPointerDown={handleMobileFieldPointerDown}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className={`bg-surface-container flex items-center justify-between px-4 py-3 ${mobile ? 'pb-5' : ''}`}
      >
        <button
          type="button"
          onClick={handleMessageToggle}
          className="flex items-center gap-2"
        >
          <span
            className={`relative inline-flex h-6 w-10 shrink-0 rounded-full transition-colors duration-200 ${
              showMessage ? 'bg-primary/60' : 'bg-surface-container-highest'
            }`}
          >
            <span
              className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${
                showMessage ? 'translate-x-4' : ''
              }`}
            />
          </span>
          <span className="text-on-surface-variant/50 text-sm font-medium">
            {RESUME_REQUEST_CONTENT.noteToggleLabel}
          </span>
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isEmailValid || isSubmitting || submitted}
          className="signature-gradient text-on-primary rounded-full px-6 py-2 text-base font-bold transition-all hover:shadow-[0_0_12px_rgba(123,208,255,0.4)] disabled:opacity-40"
          style={{
            cursor:
              !isEmailValid || isSubmitting || submitted
                ? 'default'
                : 'pointer',
          }}
        >
          {isSubmitting
            ? RESUME_REQUEST_CONTENT.pendingLabel
            : submitted
              ? RESUME_REQUEST_CONTENT.submittedLabel
              : RESUME_REQUEST_CONTENT.triggerLabel}
        </button>
      </div>

      {submitStatus === 'error' && (
        <p className="text-error bg-surface-container px-4 pb-3 text-sm">
          {RESUME_REQUEST_CONTENT.feedback.error}
        </p>
      )}
    </>
  );
}

/* ────────────────────────────────────────────
 * Mobile floating dialog
 * ──────────────────────────────────────────── */
function useFixedBodyLock(active: boolean) {
  useLayoutEffect(() => {
    if (!active) return;

    const { body, documentElement } = document;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
    const previousBody = {
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
      overscrollBehavior: body.style.overscrollBehavior,
      touchAction: body.style.touchAction,
    };
    const previousRootOverscroll = documentElement.style.overscrollBehavior;

    body.style.overflow = 'hidden';
    body.style.overscrollBehavior = 'none';
    body.style.touchAction = 'none';
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }
    documentElement.style.overscrollBehavior = 'none';

    return () => {
      body.style.overflow = previousBody.overflow;
      body.style.paddingRight = previousBody.paddingRight;
      body.style.overscrollBehavior = previousBody.overscrollBehavior;
      body.style.touchAction = previousBody.touchAction;
      documentElement.style.overscrollBehavior = previousRootOverscroll;
    };
  }, [active]);
}

function MobileDialog({
  phase,
  close,
  children,
}: {
  phase: 'closed' | 'opening' | 'open' | 'closing';
  close: () => void;
  children: React.ReactNode;
}) {
  const active = phase !== 'closed';

  useFixedBodyLock(active);

  useEffect(() => {
    if (!active) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [active, close]);

  if (phase === 'closed') return null;

  const isOpening = phase === 'opening';
  const isOpen = phase === 'open';
  const isClosing = phase === 'closing';
  const isInteractive = isOpening || isOpen;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-4"
      style={{
        paddingTop: 'calc(env(safe-area-inset-top, 0px) + 3.5rem)',
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.5rem)',
        pointerEvents: isInteractive ? 'auto' : 'none',
        touchAction: 'none',
      }}
      role="dialog"
      aria-modal="true"
      aria-label={RESUME_REQUEST_CONTENT.dialogAriaLabel}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/55 backdrop-blur-sm transition-opacity"
        style={{
          opacity: isOpen ? 1 : 0,
          transitionDuration: `${ANIM_MS}ms`,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        onClick={close}
      />

      {/* Dialog */}
      <div
        className="bg-surface-container relative z-10 w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
        style={{
          transform: isOpen ? 'scale(1)' : 'scale(0.96)',
          opacity: isClosing ? 0 : 1,
          transition: `transform ${ANIM_MS}ms cubic-bezier(0.16,1,0.3,1), opacity ${ANIM_MS * 0.6}ms ease`,
          pointerEvents: isInteractive ? 'auto' : 'none',
        }}
      >
        <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
          <p className="font-headline text-base font-bold text-white">
            {RESUME_REQUEST_CONTENT.dialogTitle}
          </p>
          <button
            type="button"
            onClick={close}
            className="text-on-surface-variant/55 flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/10 hover:text-white"
            aria-label={RESUME_REQUEST_CONTENT.closeDialogLabel}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
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
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelContentRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [btnRect, setBtnRect] = useState<DOMRect | null>(null);
  const [morphHeight, setMorphHeight] = useState<number | null>(null);

  const isVisible = phase !== 'closed';
  const isEmailValid = isCompleteEmail(email);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const focusFieldWithoutScroll = useCallback(
    (field: FocusableFormField, options: { select?: boolean } = {}) => {
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      field.focus({ preventScroll: true });
      if (options.select && 'select' in field) {
        field.select();
      }

      requestAnimationFrame(() => {
        if (window.scrollX !== scrollX || window.scrollY !== scrollY) {
          window.scrollTo(scrollX, scrollY);
        }
      });
    },
    [],
  );

  const focusEmailInput = useCallback(() => {
    const input = emailInputRef.current;
    if (!input) return;

    focusFieldWithoutScroll(input, { select: true });
  }, [focusFieldWithoutScroll]);

  const measureButton = useCallback(() => {
    if (!triggerRef.current) return null;
    return triggerRef.current.getBoundingClientRect();
  }, []);

  // ── Open ──
  const open = useCallback(() => {
    if (isMobile) {
      flushSync(() => setPhase('opening'));
      focusEmailInput();
      requestAnimationFrame(() => setPhase('open'));
      return;
    }
    const rect = measureButton();
    if (!rect) return;
    setBtnRect(rect);
    setPhase('opening');
  }, [focusEmailInput, isMobile, measureButton]);

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
    if (isMobile) return;
    if (phase !== 'open') return;
    const t = setTimeout(() => {
      setMorphHeight(null);
      focusEmailInput();
    }, ANIM_MS);
    return () => clearTimeout(t);
  }, [focusEmailInput, isMobile, phase]);

  // ── Close ──
  const close = useCallback(() => {
    if (isMobile) {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
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
    if (isMobile || phase !== 'open') return;

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside, isMobile, phase]);

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

  const updateEmail = useCallback(
    (value: string) => {
      setEmail(value);
      if (submitStatus === 'error') setSubmitStatus('idle');
    },
    [submitStatus],
  );

  const updateMessage = useCallback(
    (value: string) => {
      setMessage(value);
      if (submitStatus === 'error') setSubmitStatus('idle');
    },
    [submitStatus],
  );

  const handleSubmit = useCallback(async () => {
    if (submitStatus === 'submitting' || submitStatus === 'sent') return;

    if (!isEmailValid) {
      focusEmailInput();
      return;
    }

    setSubmitStatus('submitting');

    try {
      const response = await fetch(EMAIL_CONFIG.apiPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'resume',
          email: email.trim(),
          message: message.trim(),
        }),
      });

      if (!response.ok) throw new Error('Resume request failed');

      setSubmitStatus('sent');

      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }

      resetTimerRef.current = setTimeout(() => {
        setSubmitStatus('idle');
        close();
        setEmail('');
        setMessage('');
        setShowMessage(false);
      }, LAYOUT_CONFIG.motion.resumeResetMs);
    } catch {
      setSubmitStatus('error');
    }
  }, [close, email, focusEmailInput, isEmailValid, message, submitStatus]);

  const resetPanelState = useCallback(() => {
    setSubmitStatus('idle');
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
    setEmail('');
    setMessage('');
    setShowMessage(false);
  }, []);

  useEffect(() => {
    if (phase !== 'closed') return;
    if (submitStatus === 'submitting' || submitStatus === 'sent') return;
    resetPanelState();
  }, [phase, resetPanelState, submitStatus]);

  // ── Form props shared by both layouts ──
  const formProps = {
    email,
    setEmail: updateEmail,
    message,
    setMessage: updateMessage,
    showMessage,
    setShowMessage,
    submitStatus,
    handleSubmit,
    emailInputRef,
    messageInputRef,
    isEmailValid,
    focusFieldWithoutScroll,
  };

  // ── Mobile portal (floating dialog) ──
  const mobilePortal = isMobile ? (
    <MobileDialog phase={phase} close={close}>
      <PanelForm {...formProps} mobile />
    </MobileDialog>
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
              {RESUME_REQUEST_CONTENT.triggerLabel}
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
        {RESUME_REQUEST_CONTENT.triggerLabel}
      </button>

      {mobilePortal}
      {desktopPortal}
    </div>
  );
}
