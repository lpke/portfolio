import { Hero } from '@/sections/hero/Hero';
import { WhatIDo } from '@/sections/what-i-do/WhatIDo';
import { Contact } from '@/sections/contact/Contact';
import { ScrollToSection } from '@/components/ScrollToSection';

type LayoutProps = {
  scrollToId?: string;
};

export function Layout({ scrollToId }: LayoutProps) {
  return (
    <main>
      <Hero />
      <WhatIDo />
      <Contact />

      {scrollToId && <ScrollToSection sectionId={scrollToId} />}
    </main>
  );
}
