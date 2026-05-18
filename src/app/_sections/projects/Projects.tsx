import { PageHero } from '@/components/PageHero';
import { ProjectGrid } from './components/ProjectGrid';

export function Projects() {
  return (
    <section
      id="projects"
      className="mx-auto max-w-7xl px-6 pt-24 pb-20 md:pt-32"
    >
      <PageHero
        title={
          <>
            Selected <span className="text-primary italic">Works</span>
          </>
        }
        subtitle="Exploring the intersection of high-performance backend architecture and intuitive, fluid user interfaces. Each project represents a unique challenge in precision engineering."
      />
      <ProjectGrid />
    </section>
  );
}
