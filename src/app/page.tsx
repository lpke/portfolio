import { Hero } from './_sections/hero/Hero';
import { RecentWork } from './_sections/recent-work/RecentWork';
import { Foundation } from './_sections/foundation/Foundation';
import { Experience } from './_sections/experience/Experience';
import { Projects } from './_sections/projects/Projects';
import { Skills } from './_sections/skills/Skills';
import { Contact } from './_sections/contact/Contact';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <RecentWork />
      <Foundation />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}

