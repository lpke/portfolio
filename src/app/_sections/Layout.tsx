import { Hero } from '@/_sections/hero/Hero';
import { RecentWork } from '@/_sections/recent-work/RecentWork';
import { Foundation } from '@/_sections/foundation/Foundation';
import { Experience } from '@/_sections/experience/Experience';
import { Projects } from '@/_sections/projects/Projects';
import { Skills } from '@/_sections/skills/Skills';
import { Contact } from '@/_sections/contact/Contact';
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
