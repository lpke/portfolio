import { Hero } from '@/sections/hero/Hero';
import { RecentWork } from '@/sections/recent-work/RecentWork';
import { Foundation } from '@/sections/foundation/Foundation';
import { Experience } from '@/sections/experience/Experience';
import { Projects } from '@/sections/projects/Projects';
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
      <RecentWork />
      <Foundation />
      <Experience />
      <Projects />
      <Skills />
      <Contact />

      {scrollToId && <ScrollToSection sectionId={scrollToId} />}
    </main>
  );
}
