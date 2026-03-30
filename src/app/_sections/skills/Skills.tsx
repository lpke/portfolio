import { PageHero } from '@/components/PageHero';
import { SkillsGrid } from './components/SkillsGrid';

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-7xl px-6 pt-32 pb-24 md:px-8">
      <PageHero
        title={
          <>
            Expertise <span className="text-primary">&amp;</span> Tools
          </>
        }
        subtitle="A specialized toolkit focused on building resilient architecture and fluid user experiences."
      />
      <SkillsGrid />
    </section>
  );
}
