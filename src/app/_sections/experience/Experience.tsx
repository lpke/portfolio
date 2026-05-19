import { PageHero } from '@/components/PageHero';
import { EXPERIENCE_SECTION_CONTENT, SECTION_IDS } from '@/utils/constants';
import { Timeline } from './components/Timeline';
import { Philosophy } from './components/Philosophy';

export function Experience() {
  return (
    <section
      id={SECTION_IDS.experience}
      className="mx-auto max-w-7xl px-6 pt-24 pb-24 md:px-12 md:pt-32"
    >
      <PageHero
        title={
          <>
            {EXPERIENCE_SECTION_CONTENT.title.lead}{' '}
            <span className="text-primary italic">
              {EXPERIENCE_SECTION_CONTENT.title.accent}
            </span>
          </>
        }
        subtitle={EXPERIENCE_SECTION_CONTENT.subtitle}
      />
      <Timeline />
      <Philosophy />
    </section>
  );
}
