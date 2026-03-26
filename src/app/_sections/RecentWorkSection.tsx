import Link from 'next/link';
import { TechTag } from '@/components/TechTag';

export function RecentWorkSection() {
  return (
    <section className="bg-surface-container-low py-24">
      <div className="mx-auto max-w-7xl px-8">
        {/* Section Header */}
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="mb-4 font-headline text-4xl font-black tracking-tight text-white">
              RECENT WORK
            </h2>
            <p className="max-w-md text-on-surface-variant">
              Highlighting major contributions to large-scale digital products
              and platforms.
            </p>
          </div>
          <Link
            href="/projects"
            className="flex items-center gap-2 font-headline font-bold text-primary transition-all hover:gap-4"
          >
            View Archive →
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid h-auto grid-cols-1 gap-6 md:h-[600px] md:grid-cols-12">
          {/* Montu Project — Large Card */}
          <div className="ghost-border group relative overflow-hidden rounded-xl bg-surface-container md:col-span-8">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-surface-container to-transparent opacity-40 transition-opacity duration-700 group-hover:opacity-60" />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-surface-container via-transparent to-transparent p-8">
              <div className="mb-4 flex gap-2">
                <TechTag>React</TechTag>
                <TechTag>TypeScript</TechTag>
                <TechTag>Next.js</TechTag>
              </div>
              <h3 className="mb-2 font-headline text-2xl font-bold text-white">
                Montu: Pre-Consultation Portal
              </h3>
              <p className="max-w-sm text-sm text-on-surface-variant">
                Streamlining patient intake and medical consultations through a
                robust, secure React application.
              </p>
            </div>
          </div>

          {/* Akcelo Project — Small Card */}
          <div className="ghost-border group relative overflow-hidden rounded-xl bg-surface-container md:col-span-4">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-surface-container to-transparent opacity-30 transition-opacity duration-700 group-hover:opacity-50" />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-surface-container to-transparent p-6">
              <div className="mb-3 flex gap-2">
                <TechTag>Akcelo</TechTag>
              </div>
              <h3 className="mb-1 font-headline text-xl font-bold text-white">
                McDonald&apos;s Digital Menus
              </h3>
              <p className="text-xs text-on-surface-variant">
                Developing and optimizing high-traffic digital menu board
                systems for global McDonald&apos;s outlets.
              </p>
            </div>
          </div>

          {/* Architecture & Tooling — Info Card */}
          <div className="ghost-border group relative overflow-hidden rounded-xl bg-surface-container md:col-span-4">
            <div className="absolute inset-0 bg-primary/5" />
            <div className="absolute inset-0 flex flex-col justify-between p-6">
              <span className="text-4xl text-primary">⌨</span>
              <div>
                <h3 className="mb-1 font-headline text-xl font-bold text-white">
                  Architecture &amp; Tooling
                </h3>
                <p className="mb-4 text-xs text-on-surface-variant">
                  Specialising in monorepos, automated CI/CD pipelines, and
                  internal DX tooling.
                </p>
              </div>
            </div>
          </div>

          {/* Core Competencies Bar */}
          <div className="ghost-border flex items-center justify-between rounded-xl bg-surface-container p-8 md:col-span-8">
            <div>
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">
                Core Competencies
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-4">
                {['TypeScript', 'React', 'Monorepos', 'CI/CD', 'Build Tooling'].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="font-headline text-2xl font-bold text-white/90"
                    >
                      {skill}
                    </span>
                  ),
                )}
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-outline-variant">
                <span className="text-on-surface-variant">✦</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
