import { PageHero } from '@/components/PageHero';
import { Timeline } from './components/Timeline';
import { Philosophy } from './components/Philosophy';

export function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-7xl px-6 pt-24 pb-24 md:px-12 md:pt-32"
    >
      <PageHero
        title={
          <>
            Career <span className="text-primary italic">Timeline</span>
          </>
        }
        subtitle="A chronological mapping of my technical journey, focusing on architectural precision, scalable systems, and transformative engineering leadership."
      />
      <Timeline />
      <Philosophy />
    </section>
  );
}
