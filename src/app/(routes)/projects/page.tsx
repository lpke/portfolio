import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { ProjectGrid } from './_sections/ProjectGrid';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Exploring the intersection of high-performance architecture and intuitive, fluid user interfaces.',
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 pt-32 pb-20">
      <PageHero
        title={
          <>
            Selected <span className="italic text-primary">Works</span>
          </>
        }
        subtitle="Exploring the intersection of high-performance backend architecture and intuitive, fluid user interfaces. Each project represents a unique challenge in precision engineering."
      />
      <ProjectGrid />
    </main>
  );
}
