import { CONTACT_LINKS } from '@/utils/constants';
import { ContactCard } from './ContactCard';
import { ContactForm } from './ContactForm';

export function ContactContent() {
  return (
    <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
      {/* Left Column — Info + Links */}
      <div className="space-y-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
      <div className="bg-surface-container-low relative overflow-hidden rounded-lg border border-white/5 p-10 shadow-2xl">
        {/* Decorative glow — static radial gradient instead of blur filter */}
        <div
          className="absolute -top-40 -right-40 h-80 w-80 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(123,208,255,0.04) 0%, rgba(123,208,255,0.02) 30%, transparent 60%)',
          }}
        />
        <ContactForm />
      </div>
    </div>
  );
}
