import { CONTACT_LINKS } from '../_data/skills';
import { ContactForm } from './ContactForm';

export function ContactSection() {
  return (
    <section
      id="contact"
      className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2"
    >
      {/* Left Column — Info + Links */}
      <div className="space-y-12">
        <div>
          <h2 className="mb-4 font-headline text-5xl font-black tracking-tighter text-white">
            Let&apos;s Connect
          </h2>
          <p className="text-lg text-on-surface-variant">
            Currently open to freelance opportunities and technical
            consultations. Usually responds within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {CONTACT_LINKS.map(({ icon, label, value, href }) => {
            const Wrapper = href ? 'a' : 'div';
            const linkProps = href
              ? {
                  href,
                  target: href.startsWith('mailto') ? undefined : ('_blank' as const),
                  rel: href.startsWith('mailto')
                    ? undefined
                    : ('noopener noreferrer' as const),
                }
              : {};

            return (
              <Wrapper
                key={label}
                {...linkProps}
                className="group flex items-center gap-6 rounded-lg bg-surface-container-low p-4 transition-colors hover:bg-surface-container"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-container text-primary transition-all duration-300 group-hover:bg-primary-container group-hover:scale-110">
                  <span className="text-lg">{icon}</span>
                </div>
                <div>
                  <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/50">
                    {label}
                  </p>
                  <p className="font-headline font-bold text-white">{value}</p>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>

      {/* Right Column — Contact Form */}
      <div className="relative overflow-hidden rounded-lg border border-white/5 bg-surface-container-low p-10 shadow-2xl">
        {/* Decorative glow */}
        <div className="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
        <ContactForm />
      </div>
    </section>
  );
}
