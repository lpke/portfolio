import type { Metadata } from 'next';
import { HomeSections } from '@/components/HomeSections';
import { ScrollToSection } from '@/components/ScrollToSection';

export const metadata: Metadata = {
  title: 'Skills',
  description:
    'A specialized toolkit focused on building resilient architecture and fluid user experiences.',
};

export default function SkillsPage() {
  return (
    <main>
      <HomeSections />
      <ScrollToSection sectionId="skills" />
    </main>
  );
}
