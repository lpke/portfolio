export function HeroSection() {
  return (
    <section className="hero-waves relative flex min-h-[780px] items-center overflow-hidden px-8 pt-24">
      <div className="mx-auto w-full max-w-7xl">
        {/* Copy */}
        <div className="relative z-10 max-w-2xl">
          {/* Availability Badge */}
          {/* <div className="ghost-border mb-6 inline-flex items-center gap-2 rounded-full bg-tertiary-container px-3 py-1 text-xs font-bold text-on-tertiary-container"> */}
          {/*   <span className="h-2 w-2 animate-pulse rounded-full bg-tertiary" /> */}
          {/*   Available for New Projects */}
          {/* </div> */}

          <h1 className="font-headline mb-4 text-6xl leading-none font-black tracking-tighter text-white md:text-8xl">
            LUKE
            <br />
            <span className="text-primary italic">PERICH</span>
          </h1>

          <h2 className="font-headline text-on-surface-variant mb-6 text-2xl font-bold">
            Senior Software Engineer
          </h2>

          <p className="text-on-surface-variant mb-10 max-w-lg text-lg leading-relaxed">
            I&apos;m a Senior Front-End Developer focused on building great
            products and the systems that ship them. I specialise in
            Typescript/React, and also have experience across monorepo
            architecture, CI/CD, and build tooling. Big on developer experience.
          </p>

          {/* Personality Tidbits */}
          <div className="mt-12 flex items-center gap-6">
            <span className="text-on-surface-variant/60 font-mono text-sm">
              ⌨ Avid vim-user
            </span>
            <span className="bg-outline-variant h-1 w-1 rounded-full" />
            <span className="text-on-surface-variant/60 font-mono text-sm">
              🏊 Competitive Swimmer
            </span>
          </div>
        </div>
      </div>

      {/* Background Decorative Blurs */}
      <div className="bg-primary/10 pointer-events-none absolute top-1/4 -right-20 h-96 w-96 rounded-full blur-[120px]" />
      <div className="bg-tertiary/10 pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full blur-[100px]" />
    </section>
  );
}
