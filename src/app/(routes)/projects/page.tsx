import type { Metadata } from 'next';
import { HomeSections } from '@/components/HomeSections';
import { ScrollToSection } from '@/components/ScrollToSection';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Exploring the intersection of high-performance architecture and intuitive, fluid user interfaces.',
};

export default function ProjectsPage() {
  return (
    <main>
      <HomeSections />
      <ScrollToSection sectionId="projects" />
    </main>
  );
}
