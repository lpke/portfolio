import { Hero } from '@/_sections/hero/Hero';
import { RecentWork } from '@/_sections/recent-work/RecentWork';
import { Foundation } from '@/_sections/foundation/Foundation';
import { Experience } from '@/_sections/experience/Experience';
import { Projects } from '@/_sections/projects/Projects';
import { Skills } from '@/_sections/skills/Skills';
import { Contact } from '@/_sections/contact/Contact';

/**
 * All homepage sections in their canonical order.
 *
 * Reorder, add, or remove sections here and every route
 * (/, /experience, /projects, /skills, /contact) picks up
 * the change automatically.
 */
export function HomeSections() {
  return (
    <>
      <Hero />
      <RecentWork />
      <Foundation />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
}
