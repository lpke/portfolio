import { CONTACT_LINKS } from '@/utils/constants';
import { ContactCard } from './ContactCard';
import { ContactForm } from './ContactForm';

export function ContactContent() {
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
      <div className="bg-surface-container-low/70 relative overflow-hidden rounded-lg border border-white/10 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.22)] sm:p-6 lg:p-7">
        {/* Decorative glow — static radial gradient instead of blur filter */}
        <div
          className="pointer-events-none absolute -top-44 -right-36 h-80 w-80"
          style={{
            background:
              'radial-gradient(circle, rgba(123,208,255,0.07) 0%, rgba(60,221,199,0.035) 34%, transparent 64%)',
          }}
        />
        <ContactForm />
      </div>
    </div>
  );
}
