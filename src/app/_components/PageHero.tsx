import type { ReactNode } from 'react';

type PageHeroProps = {
  title: ReactNode;
  subtitle?: string;
};

/** Consistent hero banner used across all pages */
export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <header className={subtitle ? 'mb-20' : 'mb-14'}>
      <h1
        data-section-heading
        className={`font-headline text-5xl font-black tracking-tighter text-white md:text-7xl lg:text-8xl ${
          subtitle ? 'mb-6' : ''
        }`}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </header>
  );
}
