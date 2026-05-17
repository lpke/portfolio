import type { ReactNode } from 'react';
import { Hero } from '@/sections/hero/Hero';
import { Contact } from '@/sections/contact/Contact';

type SkillsVariantPageProps = {
  children: ReactNode;
};

export function SkillsVariantPage({ children }: SkillsVariantPageProps) {
  return (
    <main>
      <Hero />
      {children}
      <Contact />
    </main>
  );
}
