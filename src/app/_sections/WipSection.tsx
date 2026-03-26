import { CONTACT_LINKS } from '@/utils/constants';
import { ContactCard } from '@/routes/contact/_sections/ContactCard';

export function WipSection() {
  return (
    <section className="relative overflow-hidden py-24 px-6 md:px-8">
      <div className="mx-auto max-w-3xl text-center">
        {/* WIP Badge */}
        <div className="ghost-border mb-6 inline-flex items-center gap-2 rounded-full bg-surface-container px-4 py-1.5 text-xs font-bold text-on-surface-variant">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          Work in Progress
        </div>

        <h2 className="mb-4 font-headline text-3xl font-black tracking-tight text-white md:text-4xl">
          This site is <span className="italic text-primary">under construction</span>
        </h2>

        <p className="mx-auto mb-12 max-w-lg text-lg leading-relaxed text-on-surface-variant">
          I&apos;m actively building out the full portfolio. In the meantime, feel free to reach out through any of the channels below.
        </p>

        {/* Contact Cards */}
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
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

      {/* Decorative blur */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/5 blur-[100px]" />
    </section>
  );
}
