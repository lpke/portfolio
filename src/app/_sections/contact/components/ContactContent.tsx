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
      <div className="relative overflow-hidden rounded-lg border border-white/5 bg-surface-container-low p-10 shadow-2xl">
        {/* Decorative glow */}
        <div className="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
        <ContactForm />
      </div>
    </div>
  );
}
