'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '@/components/skills/shared';

const EXIT_MS = 180;
const MODAL_SHEET_MEDIA_QUERY = '(max-height: 760px)';
const SCROLL_LOCK_KEYS = new Set([
  'ArrowDown',
  'ArrowUp',
  'PageDown',
  'PageUp',
  'Home',
  'End',
]);
const DEFAULT_MODAL_PADDING = {
  viewport: 'px-3 py-6 sm:px-4 md:py-8',
  viewportSheetBottom: '0',
  header: 'px-6 pt-5 pb-1 md:px-9 md:pt-7',
  scroll: 'px-6 pb-6 md:px-9 md:pb-9',
  scrollWithHeader: 'pt-1',
  scrollWithoutHeader: 'pt-6 md:pt-9',
} as const;
const MODAL_TITLE_SIZE_CLASS_NAMES = {
  sm: 'text-xl md:text-xl',
  md: 'text-2xl md:text-2xl',
  lg: 'text-[1.625rem] md:text-[1.625rem]',
} as const;

export type ModalTitleSize = keyof typeof MODAL_TITLE_SIZE_CLASS_NAMES;
export type ModalRenderProps = {
  /** Closes the modal and returns focus to the trigger. */
  close: () => void;
};
export type ModalChildren =
  | ReactNode
  | ((props: ModalRenderProps) => ReactNode);

export type ModalContentProps = {
  /**
   * Modal body content rendered inside the scrollable content area.
   * Can be a render prop when content needs to close the modal.
   * Example: `children={({ close }) => <button onClick={close}>Done</button>}`.
   */
  children: ModalChildren;
  /** Optional heading rendered in the modal header. Default: no title. */
  title?: ReactNode;
  /** Heading size. Default: `md`. Example: `titleSize="lg"`. */
  titleSize?: ModalTitleSize;
  /** Hides the header close button. Default: `false`. */
  hideCloseButton?: boolean;
  /** Accessible label for the dialog. Default: `Modal`, or a caller-provided contextual label. */
  modalAriaLabel?: string;
  /**
   * Classes appended to the modal panel in every presentation mode.
   * Default: none.
   * Example: `className="max-w-none w-[92vw] md:w-[48rem]"`.
   */
  className?: string;
  /**
   * Classes appended to the modal panel only in floating, centered mode.
   * Default: none.
   * Example: `classNameFloating="md:max-w-[42rem]"`.
   */
  classNameFloating?: string;
  /**
   * Classes appended to the modal panel only in bottom-sheet mode.
   * Bottom-sheet mode is selected by `max-height: 760px`. Default: none.
   * Example: `classNameSheet="w-full max-w-none max-h-[82svh]"`.
   */
  classNameSheet?: string;
  /**
   * CSS padding shorthand applied directly to the modal panel.
   * Default: built-in header/content padding classes.
   * Example: `padding="2rem"` or `padding="2rem 3rem"`.
   */
  padding?: string;
};

type ModalProps = ModalContentProps & {
  /** Element rendered as the clickable/focusable modal trigger. */
  trigger: ReactNode;
  /** Classes applied to the trigger wrapper. Default: none. */
  triggerClassName?: string;
  /** Inline styles applied to the trigger wrapper. Default: none. */
  triggerStyle?: CSSProperties;
  /** Accessible label for the trigger wrapper. Default: `Open modal`. */
  triggerAriaLabel?: string;
};

export function Modal({
  trigger,
  children,
  title,
  titleSize = 'md',
  hideCloseButton = false,
  className,
  classNameFloating,
  classNameSheet,
  triggerClassName,
  triggerStyle,
  triggerAriaLabel = 'Open modal',
  modalAriaLabel = 'Modal',
  padding,
}: ModalProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartRef = useRef<{
    scrollContainer: HTMLElement | null;
    y: number;
  } | null>(null);
  const shouldRestoreFocusRef = useRef(false);
  const [phase, setPhase] = useState<'closed' | 'open' | 'closing'>('closed');
  const [isSheetModal, setIsSheetModal] = useState(false);
  const isClosing = phase === 'closing';
  const isVisible = phase !== 'closed';

  const open = useCallback(() => {
    setIsSheetModal(getIsSheetModalViewport());
    setPhase('open');
  }, []);

  const close = useCallback(() => {
    setPhase((currentPhase) => {
      if (currentPhase !== 'open') return currentPhase;

      return 'closing';
    });
  }, []);

  useEffect(() => {
    if (phase !== 'closing') return;

    const closeTimer = setTimeout(() => {
      shouldRestoreFocusRef.current = true;
      setPhase('closed');
    }, EXIT_MS);

    return () => {
      clearTimeout(closeTimer);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== 'closed' || !shouldRestoreFocusRef.current) return;

    shouldRestoreFocusRef.current = false;
    triggerRef.current?.focus();
  }, [phase]);

  useEffect(() => {
    if (!isVisible) return;

    const sheetMediaQuery = window.matchMedia(MODAL_SHEET_MEDIA_QUERY);
    const updateSheetMode = () => setIsSheetModal(sheetMediaQuery.matches);

    updateSheetMode();
    sheetMediaQuery.addEventListener('change', updateSheetMode);

    return () => {
      sheetMediaQuery.removeEventListener('change', updateSheetMode);
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const handleWheel = (event: WheelEvent) => {
      const scrollContainer = getModalScrollContainer(event.target);

      if (canScroll(scrollContainer, event.deltaY)) {
        return;
      }

      event.preventDefault();
    };

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];

      if (!touch) return;

      touchStartRef.current = {
        scrollContainer: getModalScrollContainer(event.target),
        y: touch.clientY,
      };
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      const touchStart = touchStartRef.current;

      if (!touch || !touchStart) {
        event.preventDefault();
        return;
      }

      const deltaY = touchStart.y - touch.clientY;

      if (canScroll(touchStart.scrollContainer, deltaY)) {
        return;
      }

      event.preventDefault();
    };

    document.addEventListener('wheel', handleWheel, {
      capture: true,
      passive: false,
    });
    document.addEventListener('touchstart', handleTouchStart, {
      capture: true,
      passive: true,
    });
    document.addEventListener('touchmove', handleTouchMove, {
      capture: true,
      passive: false,
    });

    return () => {
      document.removeEventListener('wheel', handleWheel, { capture: true });
      document.removeEventListener('touchstart', handleTouchStart, {
        capture: true,
      });
      document.removeEventListener('touchmove', handleTouchMove, {
        capture: true,
      });
      touchStartRef.current = null;
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        return;
      }

      if (SCROLL_LOCK_KEYS.has(event.key)) {
        event.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    if (!hideCloseButton) {
      closeButtonRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [close, hideCloseButton, isVisible]);

  const hasHeader = Boolean(title) || !hideCloseButton;
  const hasCustomPadding = padding !== undefined;
  const modeClassName = isSheetModal ? classNameSheet : classNameFloating;
  const content =
    typeof children === 'function' ? children({ close }) : children;
  const panelStyle: CSSProperties | undefined = padding
    ? { padding }
    : undefined;

  return (
    <>
      <div
        ref={triggerRef}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-expanded={isVisible}
        aria-label={triggerAriaLabel}
        className={triggerClassName}
        style={triggerStyle}
        onClick={open}
        onKeyDown={(event) => {
          if (event.key !== 'Enter' && event.key !== ' ') return;

          event.preventDefault();
          open();
        }}
      >
        {trigger}
      </div>

      {isVisible &&
        createPortal(
          <div
            className={cx(
              'fixed inset-0 z-50 flex items-center justify-center md:items-center',
              DEFAULT_MODAL_PADDING.viewport,
            )}
            data-modal-root
            role="dialog"
            aria-modal="true"
            aria-label={modalAriaLabel}
            onClick={(event) => event.stopPropagation()}
            onPointerDown={(event) => event.stopPropagation()}
            onPointerUp={(event) => event.stopPropagation()}
          >
            <style>{`
              @keyframes modalSheetIn {
                from { opacity: 0; transform: translateY(100%); }
                to { opacity: 1; transform: translateY(0); }
              }
              @keyframes modalSheetOut {
                from { opacity: 1; transform: translateY(0); }
                to { opacity: 0; transform: translateY(100%); }
              }
              @keyframes modalGrowIn {
                from { opacity: 0; transform: translateY(10px) scale(0.96); }
                to { opacity: 1; transform: translateY(0) scale(1); }
              }
              @keyframes modalGrowOut {
                from { opacity: 1; transform: translateY(0) scale(1); }
                to { opacity: 0; transform: translateY(8px) scale(0.97); }
              }
              @media ${MODAL_SHEET_MEDIA_QUERY} {
                [data-modal-root] {
                  align-items: flex-end;
                  padding-bottom: ${DEFAULT_MODAL_PADDING.viewportSheetBottom};
                }
                [data-modal-panel] {
                  border-bottom-right-radius: 0;
                  border-bottom-left-radius: 0;
                }
                [data-modal-panel][data-modal-state='open'] {
                  animation-name: modalSheetIn;
                }
                [data-modal-panel][data-modal-state='closing'] {
                  animation-name: modalSheetOut;
                }
              }
            `}</style>
            <button
              type="button"
              tabIndex={-1}
              className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-md transition-opacity duration-200"
              style={{
                opacity: isClosing ? 0 : 1,
              }}
              aria-label="Close modal"
              onClick={(event) => {
                event.stopPropagation();
                close();
              }}
            />

            <div
              data-modal-panel
              data-modal-state={isClosing ? 'closing' : 'open'}
              style={panelStyle}
              className={cx(
                'bg-surface-container relative z-10 flex max-h-[90svh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-white/10 shadow-[0_28px_90px_rgba(0,0,0,0.52)] md:max-h-[88vh]',
                isClosing
                  ? 'animate-[modalGrowOut_160ms_ease-in_both]'
                  : 'animate-[modalGrowIn_200ms_cubic-bezier(0.16,1,0.3,1)_both]',
                className,
                isSheetModal && 'min-h-[50svh]',
                modeClassName,
              )}
            >
              {hasHeader && (
                <div
                  className={cx(
                    'flex min-w-0 items-center justify-between gap-4',
                    !hasCustomPadding && DEFAULT_MODAL_PADDING.header,
                  )}
                >
                  {title && (
                    <h2
                      className={cx(
                        'font-headline min-w-0 flex-1 leading-tight font-bold text-white',
                        MODAL_TITLE_SIZE_CLASS_NAMES[titleSize],
                      )}
                    >
                      {title}
                    </h2>
                  )}
                  {!hideCloseButton && (
                    <button
                      ref={closeButtonRef}
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        close();
                      }}
                      className="text-on-surface-variant/60 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:outline-none"
                      aria-label="Close modal"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="h-5 w-5"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              )}
              <div
                data-modal-scroll
                className={cx(
                  'text-on-surface-variant text-md md:text-md min-h-0 flex-1 overflow-y-auto leading-relaxed',
                  !hasCustomPadding && DEFAULT_MODAL_PADDING.scroll,
                  !hasCustomPadding &&
                    (hasHeader
                      ? DEFAULT_MODAL_PADDING.scrollWithHeader
                      : DEFAULT_MODAL_PADDING.scrollWithoutHeader),
                )}
              >
                {content}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

function getModalScrollContainer(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return null;
  }

  return target.closest<HTMLElement>('[data-modal-scroll]');
}

function canScroll(scrollContainer: HTMLElement | null, deltaY: number) {
  if (!scrollContainer) return false;

  const { clientHeight, scrollHeight, scrollTop } = scrollContainer;

  if (scrollHeight <= clientHeight) return false;
  if (deltaY < 0) return scrollTop > 0;
  if (deltaY > 0) return scrollTop + clientHeight < scrollHeight;

  return false;
}

function getIsSheetModalViewport() {
  if (typeof window === 'undefined') return false;

  return window.matchMedia(MODAL_SHEET_MEDIA_QUERY).matches;
}
