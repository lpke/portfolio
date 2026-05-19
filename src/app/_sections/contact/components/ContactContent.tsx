import { CONTACT_LINKS, SCROLL_TARGETS } from '@/utils/constants';
import { ContactCard } from './ContactCard';
import { ContactForm } from './ContactForm';
import { ContactFormShell } from './ContactFormShell';

export function ContactContent() {
  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
      {/* Left Column — Info + Links */}
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {CONTACT_LINKS.map(
            ({ iconSrc, label, value, href, copyContent }, index) => (
              <ContactCard
                key={label}
                id={
                  index === 0 ? SCROLL_TARGETS.contactCardFirst : undefined
                }
                iconSrc={iconSrc}
                label={label}
                value={value}
                href={href}
                copyContent={copyContent}
              />
            ),
          )}
        </div>
      </div>

      {/* Right Column — Contact Form */}
      <ContactFormShell>
        <ContactForm />
      </ContactFormShell>
    </div>
  );
}
