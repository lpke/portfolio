import { SectionLink } from '@/components/SectionLink';
import { RequestResumeButton } from './components/RequestResumeButton';
import { ToolsBar } from './components/ToolsBar';

const introCopy =
  'Strategist who turned to the nerd side. I build web apps, the infrastructure that ships them, and the tools that make writing them faster.';

function HeroActions() {
  return (
    <div className="hero-reveal hero-delay-5 flex flex-wrap items-center justify-center gap-4">
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
      className={`hero-portrait hero-reveal h-20 w-20 shrink-0 min-[360px]:h-24 min-[360px]:w-24 min-[420px]:h-32 min-[420px]:w-32 sm:h-44 sm:w-44 md:h-52 md:w-52 ${className}`}
      role="img"
    >
      <span className="sr-only">Luke Perich</span>
    </div>
  );
}

function KineticName() {
  return (
    <h1 className="font-headline hero-reveal hero-delay-1 min-w-max overflow-visible text-4xl leading-none font-black text-white min-[360px]:text-5xl min-[420px]:text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
      <span className="block">LUKE</span>
      <span className="hero-title-accent hero-type-text text-primary block italic">
        PERICH
      </span>
    </h1>
  );
}

function NameLockup() {
  return (
    <div className="flex items-center justify-center gap-3 text-left min-[420px]:gap-4 sm:gap-6 md:gap-8">
      <HeroPortrait className="hero-delay-1" />
      <KineticName />
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="hero-shell hero-waves relative flex h-screen items-center overflow-hidden px-5 pt-24 pb-16 md:px-8 md:pt-28"
    >
      <div className="hero-grid pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center text-center">
        <p className="hero-reveal hero-delay-2 font-mono text-primary mb-6 text-lg font-semibold md:text-xl">
          Senior Software Engineer
        </p>

        <NameLockup />

        <div className="hero-reveal hero-delay-3 mt-8 max-w-2xl">
          <p className="text-on-surface-variant text-lg leading-relaxed opacity-75">
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
        className="hero-scroll-indicator hero-reveal hero-delay-6 absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-mono text-on-surface-variant/55 text-[10px] font-semibold tracking-[0.28em] uppercase">
          Scroll
        </span>
        <span className="hero-scroll-line" />
      </div>
    </section>
  );
}
