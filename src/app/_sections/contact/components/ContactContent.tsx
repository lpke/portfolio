'use client';

import { CONTACT_LINKS } from '@/utils/constants';
import { ContactCard } from './ContactCard';
import { ContactForm } from './ContactForm';

export function ContactContent() {
  const handleFormShellPointerDown = (
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
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
      {/* Left Column — Info + Links */}
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {CONTACT_LINKS.map(({ iconSrc, label, value, href, copyContent }) => (
            <ContactCard
              key={label}
              iconSrc={iconSrc}
              label={label}
              value={value}
              href={href}
              copyContent={copyContent}
            />
          ))}
        </div>
      </div>

      {/* Right Column — Contact Form */}
      <div
        tabIndex={-1}
        onPointerDown={handleFormShellPointerDown}
        className="group/contact-form bg-surface-container-low/70 focus-within:bg-surface-container-low/80 relative overflow-hidden rounded-lg border border-white/10 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.22)] transition-[background-color,box-shadow] duration-800 outline-none focus-within:shadow-[0_34px_96px_rgba(0,0,0,0.54)] sm:p-6 lg:p-7"
      >
        {/* Decorative glow — static radial gradient instead of blur filter */}
        <div
          className="pointer-events-none absolute -top-44 -right-36 h-80 w-80 opacity-100 transition-opacity duration-800 group-focus-within/contact-form:opacity-100"
          style={{
            background:
              'radial-gradient(circle, rgba(123,208,255,0.07) 0%, rgba(60,221,199,0.035) 34%, transparent 64%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-800 group-focus-within/contact-form:opacity-100"
          style={{
            background:
              'radial-gradient(circle at 82% 0%, rgba(92,196,255,0.06), rgba(32,232,204,0.03) 28%, transparent 48%), radial-gradient(circle at 0% 100%, rgba(255,184,108,0.055), rgba(255,124,148,0.03) 30%, transparent 50%)',
          }}
        />
        <ContactForm />
      </div>
    </div>
  );
}
