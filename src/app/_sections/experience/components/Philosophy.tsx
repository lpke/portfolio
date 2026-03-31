export function Philosophy() {
  return (
    <section className="mt-32 grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* Philosophy Card */}
      <div className="group bg-surface-container-low relative overflow-hidden rounded-xl p-10 md:col-span-2">
        <div className="text-on-surface/5 group-hover:text-on-surface/10 absolute top-0 right-0 p-8 text-9xl transition-opacity">
          {'</>'}
        </div>
        <h4 className="font-headline mb-4 text-2xl font-bold text-white">
          Technical Philosophy
        </h4>
        <p className="text-on-surface-variant mb-6 leading-relaxed">
          I believe that software is a craft. Beyond just &ldquo;making it
          work,&rdquo; I strive for code that is elegant, testable, and
          resilient. My approach combines rigorous engineering principles with
          the creative problem-solving required to navigate complex system
          constraints.
        </p>
        <div className="group/link text-primary flex cursor-pointer items-center gap-4 text-sm font-bold tracking-widest uppercase">
          Read the manifesto
          <span className="transition-transform group-hover/link:translate-x-2">
            →
          </span>
        </div>
      </div>

      {/* Stats Card */}
      <div className="border-primary/20 bg-primary-container flex flex-col justify-center rounded-xl border p-10">
        <div className="text-primary mb-2 text-5xl font-black">12+</div>
        <div className="font-headline mb-2 text-lg font-bold text-white">
          Projects Delivered
        </div>
        <div className="text-on-primary-container text-sm">
          From startup MVPs to enterprise-grade cloud systems.
        </div>
      </div>
    </section>
  );
}
