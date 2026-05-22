'use client';

import type { ReactNode } from 'react';
import { SurfaceOverlay } from '@/components/SurfaceOverlay';

export function ContactFormShell({ children }: { children: ReactNode }) {
  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    if (target.closest('input, textarea, button, label, a')) {
      return;
    }

    event.currentTarget.focus();
  };

  return (
    <div
      tabIndex={-1}
      onPointerDown={handlePointerDown}
      className="group/contact-form bg-surface-container/92 focus-within:bg-surface-container/96 relative overflow-hidden rounded-lg border border-white/20 p-5 shadow-[0_22px_72px_rgba(0,0,0,0.36)] transition-[background-color,box-shadow] duration-800 outline-none focus-within:shadow-[0_34px_96px_rgba(0,0,0,0.54)] sm:p-6 lg:p-7"
    >
      {/* Decorative glow - static radial gradient instead of blur filter */}
      <div
        className="pointer-events-none absolute -top-44 -right-36 h-80 w-80 opacity-100 transition-opacity duration-800 group-focus-within/contact-form:opacity-100"
        style={{
          background:
            'radial-gradient(circle, rgba(123,208,255,0.09) 0%, rgba(60,221,199,0.045) 34%, transparent 64%)',
        }}
      />
      <SurfaceOverlay
        className="opacity-0 transition-opacity duration-800 group-focus-within/contact-form:opacity-100"
        style={{
          background:
            'radial-gradient(circle at 82% 0%, rgba(92,196,255,0.098), rgba(32,232,204,0.049) 28%, transparent 50%), radial-gradient(circle at 0% 100%, rgba(255,184,108,0.085), rgba(255,124,148,0.043) 30%, transparent 52%)',
        }}
      />
      {children}
    </div>
  );
}
