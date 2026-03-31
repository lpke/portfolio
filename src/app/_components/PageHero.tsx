import type { ReactNode } from 'react';

type PageHeroProps = {
  title: ReactNode;
  subtitle: string;
};

/** Consistent hero banner used across all pages */
export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <header className="mb-20">
      <h1 className="mb-6 font-headline text-5xl font-black tracking-tighter text-white md:text-7xl lg:text-8xl">
        {title}
      </h1>
      <p className="max-w-2xl text-lg leading-relaxed text-on-surface-variant">
        {subtitle}
      </p>
    </header>
  );
}
