import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Timeline } from './_sections/Timeline';
import { PhilosophySection } from './_sections/PhilosophySection';

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'A chronological mapping of my technical journey — architectural precision, scalable systems, and engineering leadership.',
};

export default function ExperiencePage() {
  return (
    <main className="mx-auto max-w-7xl px-6 pt-32 pb-24 md:px-12">
      <PageHero
        title={
          <>
            Career{' '}
            <span className="italic text-primary">Timeline</span>
          </>
        }
        subtitle="A chronological mapping of my technical journey, focusing on architectural precision, scalable systems, and transformative engineering leadership."
      />
      <Timeline />
      <PhilosophySection />
    </main>
  );
}
