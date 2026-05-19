import { SectionLink } from '@/components/SectionLink';
import { SectionScrollIndicator } from '@/components/SectionScrollIndicator';
import {
  HERO_CONTENT,
  SCROLL_TARGETS,
  SECTION_IDS,
  SITE,
} from '@/utils/constants';
import { RequestResumeButton } from './components/RequestResumeButton';
import { StableHeroViewport } from './components/StableHeroViewport';
import { ToolsBar } from './components/ToolsBar';

export function Hero() {
  return (
    <section
      id={SECTION_IDS.home}
      className="hero-shell hero-waves relative flex min-h-[44rem] items-center overflow-hidden px-5 pt-24 pb-16 min-[390px]:min-h-[46rem] md:min-h-[48rem] md:px-8 md:pt-28"
    >
      <StableHeroViewport />
      <div className="hero-grid pointer-events-none absolute inset-0" />

      <div
        data-hero-content
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center text-center"
      >
        {/* Pic/name align */}
        <div className="hero-name-lockup flex items-center justify-center text-left">
          {/* Hero portrait */}
          <div
            aria-label={HERO_CONTENT.portraitLabel}
            className={'hero-portrait hero-delay-1 hero-reveal shrink-0'}
            role="img"
          >
            <span className="sr-only">{SITE.name}</span>
          </div>

          {/* Kinetic name */}
          <h1 className="font-headline hero-name hero-reveal hero-delay-1 min-w-max overflow-visible font-black text-white">
            <span className="block">{SITE.firstName.toUpperCase()}</span>
            <span
              data-hero-perich
              className="hero-title-accent hero-type-text text-primary block italic"
            >
              {SITE.lastName.toUpperCase()}
            </span>
          </h1>
        </div>

        {/* Bio paragraph */}
        <div className="hero-reveal hero-delay-3 mt-8 max-w-2xl">
          <p className="text-on-surface-variant text-base leading-relaxed text-white/60 md:text-lg">
            {HERO_CONTENT.bio.beforeRole}{' '}
            <span className="font-medium text-white/94">
              {HERO_CONTENT.bio.highlightedRole}
            </span>
            {HERO_CONTENT.bio.afterRole}
          </p>
        </div>

        {/* Hero actions */}
        <div className="mt-9">
          <div
            data-hero-actions
            className="hero-reveal hero-delay-5 flex flex-wrap items-center justify-center gap-4"
          >
            <SectionLink
              to={SECTION_IDS.contact}
              scrollTargetId={SCROLL_TARGETS.contactCardFirst}
              className="signature-gradient font-headline text-on-primary rounded-full px-8 py-4 font-bold transition-all hover:shadow-[0_0_20px_rgba(123,208,255,0.4)] active:scale-95"
            >
              {HERO_CONTENT.ctaLabel}
            </SectionLink>
            <RequestResumeButton />
          </div>
        </div>

        {/* Hero tools */}
        <div className={'hero-reveal hero-delay-6 mt-12 w-full max-w-4xl'}>
          <ToolsBar />
        </div>
      </div>

      <SectionScrollIndicator nextSectionId={SECTION_IDS.skills} />
    </section>
  );
}
