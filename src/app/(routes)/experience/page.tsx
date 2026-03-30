import type { Metadata } from 'next';
import { HomeSections } from '@/components/HomeSections';
import { ScrollToSection } from '@/components/ScrollToSection';

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'A chronological mapping of my technical journey — architectural precision, scalable systems, and engineering leadership.',
};

export default function ExperiencePage() {
  return (
    <main>
      <HomeSections />
      <ScrollToSection sectionId="experience" />
    </main>
  );
}
