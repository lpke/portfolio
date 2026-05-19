import { PHILOSOPHY_CONTENT } from '@/utils/constants';

export function Philosophy() {
  return (
    <section className="mt-32 grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* Philosophy Card */}
      <div className="group bg-surface-container-low relative overflow-hidden rounded-xl p-10 md:col-span-2">
        <div className="text-on-surface/5 group-hover:text-on-surface/10 absolute top-0 right-0 p-8 text-9xl transition-opacity">
          {PHILOSOPHY_CONTENT.symbol}
        </div>
        <h4 className="font-headline mb-4 text-2xl font-bold text-white">
          {PHILOSOPHY_CONTENT.title}
        </h4>
        <p className="text-on-surface-variant mb-6 leading-relaxed">
          {PHILOSOPHY_CONTENT.body}
        </p>
        <div className="group/link text-primary flex cursor-pointer items-center gap-4 text-sm font-bold tracking-widest uppercase">
          {PHILOSOPHY_CONTENT.ctaLabel}
          <span className="transition-transform group-hover/link:translate-x-2">
            {PHILOSOPHY_CONTENT.ctaGlyph}
          </span>
        </div>
      </div>

      {/* Stats Card */}
      <div className="border-primary/20 bg-primary-container flex flex-col justify-center rounded-xl border p-10">
        <div className="text-primary mb-2 text-5xl font-black">
          {PHILOSOPHY_CONTENT.stats.value}
        </div>
        <div className="font-headline mb-2 text-lg font-bold text-white">
          {PHILOSOPHY_CONTENT.stats.label}
        </div>
        <div className="text-on-primary-container text-sm">
          {PHILOSOPHY_CONTENT.stats.description}
        </div>
      </div>
    </section>
  );
}
