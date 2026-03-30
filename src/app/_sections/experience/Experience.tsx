import { PageHero } from '@/components/PageHero';
import { Timeline } from './components/Timeline';
import { Philosophy } from './components/Philosophy';

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-7xl px-6 pt-32 pb-24 md:px-12">
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
      <Philosophy />
    </section>
  );
}
