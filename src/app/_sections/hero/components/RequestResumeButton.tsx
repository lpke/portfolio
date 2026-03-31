'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

export function RequestResumeButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        isOpen &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    },
    [isOpen],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const handleSubmit = () => {
    if (!email) return;
    // TODO: Wire up to a real endpoint
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
      setEmail('');
      setMessage('');
      setShowMessage(false);
    }, 2000);
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="ghost-border font-headline text-primary hover:bg-primary/5 rounded-full px-8 py-4 font-bold transition-all"
        style={{ borderColor: 'rgba(123, 208, 255, 0.3)' }}
      >
        Request Resume
      </button>

      {/* Floating Panel */}
      {isOpen && (
        <div
          className="absolute top-full left-0 z-50 mt-3 w-80 overflow-hidden rounded-xl border border-white/10 bg-surface-container shadow-2xl"
          style={{
            animation: 'fadeSlideIn 0.2s ease-out',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-4 pb-3">
            <span className="font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/50">
              Add Message
            </span>
            <button
              type="button"
              onClick={() => setShowMessage(!showMessage)}
              aria-label="Toggle message"
              className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${
                showMessage ? 'bg-primary/60' : 'bg-surface-container-highest'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
                  showMessage ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>

          {/* Email + Message Input Area */}
          <div className="px-4 pb-4">
            <div className="overflow-hidden rounded-xl border border-white/10 bg-surface-container-lowest">
              {/* Email row */}
              <div className="flex items-center gap-3 px-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent py-3 text-sm text-on-surface outline-none placeholder:text-on-surface-variant/40"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !showMessage) handleSubmit();
                  }}
                />
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!email || submitted}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-on-primary-container text-on-primary transition-all hover:shadow-[0_0_12px_rgba(123,208,255,0.4)] disabled:opacity-40"
                >
                  {submitted ? (
                    <span className="text-xs">✓</span>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Message area — animated reveal */}
              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  maxHeight: showMessage ? '120px' : '0',
                  opacity: showMessage ? 1 : 0,
                }}
              >
                <div className="mx-4 border-t border-white/10" />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write an optional message..."
                  rows={3}
                  className="w-full resize-none bg-transparent px-4 py-3 text-sm text-on-surface outline-none placeholder:text-on-surface-variant/40"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
