export function Philosophy() {
  return (
    <section className="mt-32 grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* Philosophy Card */}
      <div className="group relative overflow-hidden rounded-xl bg-surface-container-low p-10 md:col-span-2">
        <div className="absolute top-0 right-0 p-8 text-9xl text-on-surface/5 transition-opacity group-hover:text-on-surface/10">
          {'</>'}
        </div>
        <h4 className="mb-4 font-headline text-2xl font-bold text-white">
          Technical Philosophy
        </h4>
        <p className="mb-6 leading-relaxed text-on-surface-variant">
          I believe that software is a craft. Beyond just &ldquo;making it
          work,&rdquo; I strive for code that is elegant, testable, and
          resilient. My approach combines rigorous engineering principles with
          the creative problem-solving required to navigate complex system
          constraints.
        </p>
        <div className="group/link flex cursor-pointer items-center gap-4 text-sm font-bold uppercase tracking-widest text-primary">
          Read the manifesto
          <span className="transition-transform group-hover/link:translate-x-2">
            →
          </span>
        </div>
      </div>

      {/* Stats Card */}
      <div className="flex flex-col justify-center rounded-xl border border-primary/20 bg-primary-container p-10">
        <div className="mb-2 text-5xl font-black text-primary">12+</div>
        <div className="mb-2 font-headline text-lg font-bold text-white">
          Projects Delivered
        </div>
        <div className="text-sm text-on-primary-container">
          From startup MVPs to enterprise-grade cloud systems.
        </div>
      </div>
    </section>
  );
}
