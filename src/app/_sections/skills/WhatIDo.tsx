import { PageHero } from '@/components/PageHero';
import { SKILL_CARDS } from './data/skills';
import { SkillCardGrid } from './components/SkillCardGrid';

export function WhatIDo() {
  return (
    <section
      id="skills"
      className="mx-auto max-w-7xl px-6 pt-32 pb-24 md:px-8"
    >
      <PageHero
        title={
          <>
            What I <span className="text-primary italic">do</span>
          </>
        }
        subtitle="My areas of specialisation. Click a card to learn more about my professional experience and related skills in that area."
      />
      <SkillCardGrid skills={SKILL_CARDS} />
    </section>
  );
}
