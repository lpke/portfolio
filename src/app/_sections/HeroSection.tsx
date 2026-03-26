export function HeroSection() {
  return (
    <section
      className="hero-waves relative flex min-h-[800px] items-center overflow-hidden px-8 pt-24"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Copy */}
        <div className="relative z-10 max-w-2xl">
          {/* Availability Badge */}
          <div className="ghost-border mb-6 inline-flex items-center gap-2 rounded-full bg-tertiary-container px-3 py-1 text-xs font-bold text-on-tertiary-container">
            <span className="h-2 w-2 animate-pulse rounded-full bg-tertiary" />
            Available for New Projects
          </div>

          <h1 className="mb-4 font-headline text-6xl font-black leading-none tracking-tighter text-white md:text-8xl">
            LUKE
            <br />
            <span className="italic text-primary">PERICH</span>
          </h1>

          <h2 className="mb-6 font-headline text-2xl font-bold text-on-surface-variant">
            Senior Software Engineer
          </h2>

          <p className="mb-10 max-w-lg text-lg leading-relaxed text-on-surface-variant">
            I&apos;m a Senior Front-End Developer focused on building great
            products and the systems that ship them. I specialise in
            Typescript/React, and also have experience across monorepo
            architecture, CI/CD, and build tooling. Big on developer experience.
          </p>

          {/* Personality Tidbits */}
          <div className="mt-12 flex items-center gap-6">
            <span className="font-mono text-sm text-on-surface-variant/60">
              ⌨ Avid vim-user
            </span>
            <span className="h-1 w-1 rounded-full bg-outline-variant" />
            <span className="font-mono text-sm text-on-surface-variant/60">
              🏊 Competitive Swimmer
            </span>
          </div>
        </div>
      </div>

      {/* Background Decorative Blurs */}
      <div className="pointer-events-none absolute top-1/4 -right-20 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-tertiary/10 blur-[100px]" />
    </section>
  );
}

