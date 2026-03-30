import type { Metadata } from 'next';
import { Hero } from '@/_sections/hero/Hero';
import { RecentWork } from '@/_sections/recent-work/RecentWork';
import { Foundation } from '@/_sections/foundation/Foundation';
import { Experience } from '@/_sections/experience/Experience';
import { Projects } from '@/_sections/projects/Projects';
import { Skills } from '@/_sections/skills/Skills';
import { Contact } from '@/_sections/contact/Contact';
import { ScrollToSection } from '@/components/ScrollToSection';

export const metadata: Metadata = {
  title: 'Skills',
  description:
    'A specialized toolkit focused on building resilient architecture and fluid user experiences.',
};

export default function SkillsPage() {
  return (
    <main>
      <ScrollToSection sectionId="skills" />
      <Hero />
      <RecentWork />
      <Foundation />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}
