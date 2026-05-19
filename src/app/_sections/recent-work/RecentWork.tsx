import { SectionLink } from '@/components/SectionLink';
import { TechTag } from '@/components/TechTag';
import { RECENT_WORK_CONTENT, SECTION_IDS } from '@/utils/constants';

export function RecentWork() {
  return (
    <section className="bg-surface-container-low py-24">
      <div className="mx-auto max-w-7xl px-8">
        {/* Section Header */}
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-headline mb-4 text-4xl font-black tracking-tight text-white">
              {RECENT_WORK_CONTENT.title}
            </h2>
            <p className="text-on-surface-variant max-w-md">
              {RECENT_WORK_CONTENT.intro}
            </p>
          </div>
          <SectionLink
            to={SECTION_IDS.projects}
            className="font-headline text-primary flex items-center gap-2 font-bold transition-all hover:gap-4"
          >
            {RECENT_WORK_CONTENT.archiveLinkLabel}
          </SectionLink>
        </div>

        {/* Bento Grid */}
        <div className="grid h-auto grid-cols-1 gap-6 md:h-[600px] md:grid-cols-12">
          {/* Montu Project — Large Card */}
          <div className="ghost-border group bg-surface-container relative overflow-hidden rounded-xl md:col-span-8">
            <div className="from-primary/10 via-surface-container absolute inset-0 bg-gradient-to-br to-transparent opacity-40 transition-opacity duration-700 group-hover:opacity-60" />
            <div className="from-surface-container absolute inset-0 flex flex-col justify-end bg-gradient-to-t via-transparent to-transparent p-8">
              <div className="mb-4 flex gap-2">
                {RECENT_WORK_CONTENT.cards.montu.tags.map((tag) => (
                  <TechTag key={tag}>{tag}</TechTag>
                ))}
              </div>
              <h3 className="font-headline mb-2 text-2xl font-bold text-white">
                {RECENT_WORK_CONTENT.cards.montu.title}
              </h3>
              <p className="text-on-surface-variant max-w-sm text-sm">
                {RECENT_WORK_CONTENT.cards.montu.description}
              </p>
            </div>
          </div>

          {/* Akcelo Project — Small Card */}
          <div className="ghost-border group bg-surface-container relative overflow-hidden rounded-xl md:col-span-4">
            <div className="from-secondary/10 via-surface-container absolute inset-0 bg-gradient-to-br to-transparent opacity-30 transition-opacity duration-700 group-hover:opacity-50" />
            <div className="from-surface-container absolute inset-0 flex flex-col justify-end bg-gradient-to-t to-transparent p-6">
              <div className="mb-3 flex gap-2">
                {RECENT_WORK_CONTENT.cards.akcelo.tags.map((tag) => (
                  <TechTag key={tag}>{tag}</TechTag>
                ))}
              </div>
              <h3 className="font-headline mb-1 text-xl font-bold text-white">
                {RECENT_WORK_CONTENT.cards.akcelo.title}
              </h3>
              <p className="text-on-surface-variant text-xs">
                {RECENT_WORK_CONTENT.cards.akcelo.description}
              </p>
            </div>
          </div>

          {/* Architecture & Tooling — Info Card */}
          <div className="ghost-border group bg-surface-container relative overflow-hidden rounded-xl md:col-span-4">
            <div className="bg-primary/5 absolute inset-0" />
            <div className="absolute inset-0 flex flex-col justify-between p-6">
              <span className="text-primary text-4xl">
                {RECENT_WORK_CONTENT.cards.tooling.icon}
              </span>
              <div>
                <h3 className="font-headline mb-1 text-xl font-bold text-white">
                  {RECENT_WORK_CONTENT.cards.tooling.title}
                </h3>
                <p className="text-on-surface-variant mb-4 text-xs">
                  {RECENT_WORK_CONTENT.cards.tooling.description}
                </p>
              </div>
            </div>
          </div>

          {/* Core Competencies Bar */}
          <div className="ghost-border bg-surface-container flex items-center justify-between rounded-xl p-8 md:col-span-8">
            <div>
              <p className="text-primary mb-2 font-mono text-xs tracking-[0.2em] uppercase">
                {RECENT_WORK_CONTENT.competencies.label}
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-4">
                {RECENT_WORK_CONTENT.competencies.items.map((skill) => (
                  <span
                    key={skill}
                    className="font-headline text-2xl font-bold text-white/90"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="border-outline-variant flex h-16 w-16 items-center justify-center rounded-full border border-dashed">
                <span className="text-on-surface-variant">
                  {RECENT_WORK_CONTENT.competencies.icon}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
