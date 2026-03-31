import type { ReactNode } from 'react';

type PageHeroProps = {
  title: ReactNode;
  subtitle: string;
};

/** Consistent hero banner used across all pages */
export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <header className="mb-20">
      <h1 className="font-headline mb-6 text-5xl font-black tracking-tighter text-white md:text-7xl lg:text-8xl">
        {title}
      </h1>
      <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed">
        {subtitle}
      </p>
    </header>
  );
}
