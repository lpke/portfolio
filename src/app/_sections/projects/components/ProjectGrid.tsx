import { TechTag } from '@/components/TechTag';
import { PROJECTS } from '../data/projects';
import type { Project } from '../data/projects';

function LargeProjectCard({ project }: { project: Project }) {
  return (
    <div className="ghost-border group bg-surface-container overflow-hidden rounded-lg p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] md:col-span-8">
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Info */}
        <div className="flex-1">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-2xl">{project.icon}</span>
            <span className="font-headline text-tertiary text-xs font-bold tracking-wide uppercase">
              {project.label}
            </span>
          </div>
          <h3 className="font-headline mb-4 text-3xl font-bold text-white">
            {project.title}
          </h3>
          <p className="text-on-surface-variant/70 mb-6 leading-relaxed">
            {project.description}
          </p>
          <div className="mb-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <TechTag key={tag}>{tag}</TechTag>
            ))}
          </div>
          {project.ctaLabel && (
            <a
              href={project.href}
              className="group/link text-primary flex items-center gap-2 font-bold"
            >
              <span className="bg-primary h-2 w-2 rounded-full" />
              <span className="group-hover/link:border-primary border-b border-transparent transition-all">
                {project.ctaLabel}
              </span>
            </a>
          )}
        </div>

        {/* Visual placeholder */}
        <div className="relative min-h-[240px] flex-1 md:min-h-full">
          <div className="from-primary/15 via-surface-container-high to-tertiary/10 group-hover:from-primary/25 absolute inset-0 rounded-lg bg-gradient-to-br transition-all duration-700" />
        </div>
      </div>
    </div>
  );
}

function SmallProjectCard({ project }: { project: Project }) {
  return (
    <div className="ghost-border group bg-surface-container hover:bg-surface-container-high flex flex-col rounded-lg p-8 transition-all duration-300 md:col-span-4">
      <div className="mb-auto">
        <div className="bg-primary/10 group-hover:bg-primary/20 mb-6 flex h-12 w-12 items-center justify-center rounded-full text-xl transition-colors">
          {project.icon}
        </div>
        <div className="font-headline text-tertiary mb-2 text-xs font-bold tracking-wide uppercase">
          {project.label}
        </div>
        <h3 className="font-headline mb-4 text-2xl font-bold text-white">
          {project.title}
        </h3>
        <p className="text-on-surface-variant/70 mb-6">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <TechTag key={tag}>{tag}</TechTag>
          ))}
        </div>
      </div>
      <div className="border-outline-variant/10 mt-8 flex justify-end border-t pt-6">
        <a
          href={project.href ?? '#'}
          className="text-primary transition-colors hover:text-white"
        >
          →
        </a>
      </div>
    </div>
  );
}

export function ProjectGrid() {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {PROJECTS.map((project) =>
          project.size === 'large' ? (
            <LargeProjectCard key={project.title} project={project} />
          ) : (
            <SmallProjectCard key={project.title} project={project} />
          ),
        )}
      </div>

      {/* Pagination Hint */}
      <div className="mt-20 text-center">
        <p className="font-headline text-on-surface-variant/50 mb-4 font-medium italic">
          More projects from Acidgreen, Greenfields, and Greenhouse Creative.
        </p>
        <div className="flex justify-center gap-4">
          <button
            type="button"
            className="border-outline-variant/20 text-on-surface-variant/60 hover:border-primary hover:text-primary flex h-12 w-12 items-center justify-center rounded-full border transition-all"
          >
            ‹
          </button>
          <button
            type="button"
            className="border-outline-variant/20 text-on-surface-variant/60 hover:border-primary hover:text-primary flex h-12 w-12 items-center justify-center rounded-full border transition-all"
          >
            ›
          </button>
        </div>
      </div>
    </>
  );
}
