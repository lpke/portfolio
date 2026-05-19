import { SectionLink } from '@/components/SectionLink';
import { RequestResumeButton } from './components/RequestResumeButton';
import { StableHeroViewport } from './components/StableHeroViewport';
import { ToolsBar } from './components/ToolsBar';

const introCopy =
  'Strategist who turned to the nerd side. I build web apps, the infrastructure that ships them, and the tools that make writing them faster.';

function HeroActions() {
  return (
    <div
      data-hero-actions
      className="hero-reveal hero-delay-5 flex flex-wrap items-center justify-center gap-4"
    >
      <SectionLink
        to="contact"
        scrollTargetId="contact-card-first"
        className="signature-gradient font-headline text-on-primary rounded-full px-8 py-4 font-bold transition-all hover:shadow-[0_0_20px_rgba(123,208,255,0.4)] active:scale-95"
      >
        Contact Me
      </SectionLink>
      <RequestResumeButton />
    </div>
  );
}

function HeroTools({ className = '' }: { className?: string }) {
  return (
    <div
      className={`hero-reveal hero-delay-6 w-full max-w-4xl ${className}`}
    >
      <ToolsBar />
    </div>
  );
}

function HeroPortrait({ className = '' }: { className?: string }) {
  return (
    <div
      aria-label="Luke Perich headshot"
      className={`hero-portrait hero-reveal shrink-0 ${className}`}
      role="img"
    >
      <span className="sr-only">Luke Perich</span>
    </div>
  );
}

function KineticName() {
  return (
    <h1 className="font-headline hero-name hero-reveal hero-delay-1 min-w-max overflow-visible font-black text-white">
      <span className="block">LUKE</span>
      <span
        data-hero-perich
        className="hero-title-accent hero-type-text text-primary block italic"
      >
        PERICH
      </span>
    </h1>
  );
}

function NameLockup() {
  return (
    <div className="hero-name-lockup flex items-center justify-center text-left">
      <HeroPortrait className="hero-delay-1" />
      <KineticName />
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="hero-shell hero-waves relative flex min-h-[44rem] items-center overflow-hidden px-5 pt-24 pb-16 min-[390px]:min-h-[46rem] md:min-h-[48rem] md:px-8 md:pt-28"
    >
      <StableHeroViewport />
      <div className="hero-grid pointer-events-none absolute inset-0" />

      <div
        data-hero-content
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center text-center"
      >
        <p className="hero-reveal hero-delay-2 font-mono text-primary mb-6 text-lg font-semibold md:text-xl">
          Senior Software Engineer
        </p>

        <NameLockup />

        <div className="hero-reveal hero-delay-3 mt-8 max-w-2xl">
          <p className="text-on-surface-variant text-base leading-relaxed opacity-75 md:text-lg">
            {introCopy} When not coding, I&apos;m training - calisthenics and
            competitive swimming.
          </p>
        </div>

        <div className="mt-9">
          <HeroActions />
        </div>

        <HeroTools className="mt-12" />
      </div>

      <div
        aria-hidden
        className="hero-scroll-indicator hero-reveal hero-delay-6 absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="font-mono text-on-surface-variant/55 text-[10px] font-semibold tracking-[0.28em] uppercase">
          Scroll
        </span>
        <span className="hero-scroll-line" />
      </div>
    </section>
  );
}
