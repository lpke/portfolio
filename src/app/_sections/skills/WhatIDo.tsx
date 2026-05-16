import { PageHero } from '@/components/PageHero';
import { Skills } from './components/Skills';
import { SHOWCASE_SKILLS } from './data/showcaseSkills';

export function WhatIDo() {
  return (
    <section id="skills" className="px-4 pt-32 pb-24 sm:px-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        <PageHero
          title={
            <>
              What I <span className="text-primary italic">do</span>
            </>
          }
          subtitle="Select a focus area to see how I approach the work, the tools I reach for, and the systems I tend to build."
        />
      </div>

      <div className="mx-auto max-w-[96rem]">
        <Skills skills={SHOWCASE_SKILLS} />
      </div>
    </section>
  );
}
