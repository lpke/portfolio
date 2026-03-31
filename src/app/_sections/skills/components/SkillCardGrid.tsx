'use client';

import type { SkillCardData } from '../data/skills';
import { SkillCard } from './SkillCard';

type SkillCardGridProps = {
  skills: SkillCardData[];
};

/**
 * Responsive grid for skill cards.
 * 1 col on mobile, 2 cols on md, 3 cols on lg.
 */
export function SkillCardGrid({ skills }: SkillCardGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {skills.map((skill) => (
        <SkillCard key={skill.id} skill={skill} />
      ))}
    </div>
  );
}
