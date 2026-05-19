import { PageHero } from '@/components/PageHero';
import { PROJECTS_SECTION_CONTENT, SECTION_IDS } from '@/utils/constants';
import { ProjectGrid } from './components/ProjectGrid';

export function Projects() {
  return (
    <section
      id={SECTION_IDS.projects}
      className="mx-auto max-w-7xl px-6 pt-24 pb-20 md:pt-32"
    >
      <PageHero
        title={
          <>
            {PROJECTS_SECTION_CONTENT.title.lead}{' '}
            <span className="text-primary italic">
              {PROJECTS_SECTION_CONTENT.title.accent}
            </span>
          </>
        }
        subtitle={PROJECTS_SECTION_CONTENT.subtitle}
      />
      <ProjectGrid />
    </section>
  );
}
