import { HeroSection } from './_sections/HeroSection';
import { RecentWorkSection } from './_sections/RecentWorkSection';
import { FoundationSection } from './_sections/FoundationSection';

export default function HomePage() {
  return (
    <main className="pt-24">
      <HeroSection />
      <RecentWorkSection />
      <FoundationSection />
    </main>
  );
}
