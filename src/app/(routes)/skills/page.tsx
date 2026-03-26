import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { SkillsGrid } from './_sections/SkillsGrid';
import { ContactSection } from './_sections/ContactSection';

export const metadata: Metadata = {
  title: 'Skills & Contact',
  description:
    'A specialized toolkit focused on building resilient architecture and fluid user experiences.',
};

export default function SkillsPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 pt-32 pb-24 md:px-8">
      <PageHero
        title={
          <>
            Expertise <span className="text-primary">&amp;</span> Access
          </>
        }
        subtitle="A specialized toolkit focused on building resilient architecture and fluid user experiences. Let's transform your vision into production-ready reality."
      />
      <SkillsGrid />
      <ContactSection />
    </main>
  );
}
