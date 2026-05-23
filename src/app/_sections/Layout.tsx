import { Hero } from '@/sections/hero/Hero';
import { Skills } from '@/sections/skills/Skills';
import { Contact } from '@/sections/contact/Contact';
import { ScrollToSection } from '@/components/ScrollToSection';

type LayoutProps = {
  scrollToId?: string;
};

export function Layout({ scrollToId }: LayoutProps) {
  return (
    <main>
      <Hero />
      <Skills />
      <Contact />

      {scrollToId && <ScrollToSection sectionId={scrollToId} />}
    </main>
  );
}
