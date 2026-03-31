import { TechTag } from '@/components/TechTag';
import {
  CORE_FOCUS,
  RUNTIMES,
  PRODUCT_STACK,
  TOOLS,
  TERMINAL_LINES,
} from '../data/skills';

export function SkillsGrid() {
  return (
    <div className="mb-32 grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* ── Core & Languages (2 cols) ── */}
      <div className="group bg-surface-container-low hover:bg-surface-container rounded-lg border border-white/5 p-8 transition-colors duration-300 md:col-span-2">
        <div className="mb-8 flex items-center gap-4">
          <span className="text-primary text-3xl">⌨</span>
          <h2 className="font-headline text-2xl font-bold tracking-wider text-white uppercase">
            Core &amp; Languages
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {/* Core Focus */}
          <div>
            <h3 className="font-label text-on-surface-variant/50 mb-4 text-sm tracking-widest uppercase">
              Core Focus
            </h3>
            <div className="flex flex-wrap gap-2">
              {CORE_FOCUS.map((skill) => (
                <TechTag key={skill} variant="primary">
                  {skill}
                </TechTag>
              ))}
            </div>
          </div>

          {/* Runtimes & Dialects */}
          <div>
            <h3 className="font-label text-on-surface-variant/50 mb-4 text-sm tracking-widest uppercase">
              Runtimes &amp; Dialects
            </h3>
            <div className="flex flex-wrap gap-2">
              {RUNTIMES.map((runtime) => (
                <TechTag key={runtime}>{runtime}</TechTag>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative code image bar */}
        <div className="relative mt-8 h-32 overflow-hidden rounded-lg border border-white/5">
          <div className="from-primary/10 absolute inset-0 z-10 bg-gradient-to-r to-transparent" />
          <div className="from-surface-container-highest via-surface-container to-surface-container-low h-full w-full bg-gradient-to-br opacity-60 transition-transform duration-700 group-hover:scale-105" />
        </div>
      </div>

      {/* ── Product Stack (1 col) ── */}
      <div className="bg-surface-container flex flex-col justify-between rounded-lg border border-white/5 p-8">
        <div>
          <div className="mb-6 flex items-center gap-4">
            <span className="text-tertiary text-3xl">📊</span>
            <h2 className="font-headline text-2xl font-bold tracking-wider text-white uppercase">
              Product
            </h2>
          </div>
          <p className="text-on-surface-variant mb-8 text-sm leading-relaxed">
            Specialized stack for experimentation, lifecycle marketing, and
            analytics-driven growth.
          </p>
        </div>

        <div className="space-y-3">
          {PRODUCT_STACK.map(({ tool, category }, i) => (
            <div
              key={tool}
              className={`font-label text-on-surface-variant flex items-center justify-between text-sm ${
                i < PRODUCT_STACK.length - 1
                  ? 'border-b border-white/5 pb-2'
                  : ''
              }`}
            >
              <span>{tool}</span>
              <span className="text-tertiary">{category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tools & Libraries (full width) ── */}
      <div className="bg-surface-container-low grid items-center gap-8 rounded-lg border border-white/5 p-8 md:col-span-3 md:grid-cols-2">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="text-primary text-3xl">🔧</span>
            <h2 className="font-headline text-2xl font-bold tracking-wider text-white uppercase">
              Tools &amp; Libraries
            </h2>
          </div>
          <p className="text-on-surface-variant">
            The utility belt for modern web engineering: monorepos, automated
            testing, and developer productivity tools.
          </p>
          <div className="flex flex-wrap gap-2">
            {TOOLS.map((tool) => (
              <TechTag key={tool} variant="tool">
                {tool}
              </TechTag>
            ))}
          </div>
        </div>

        {/* Terminal Block */}
        <div className="bg-surface-container-lowest relative h-56 overflow-hidden rounded-lg border border-white/10">
          <div className="signature-gradient absolute inset-0 opacity-10" />
          <div className="text-secondary-fixed-dim relative z-10 space-y-2 p-6 font-mono text-xs opacity-80">
            {TERMINAL_LINES.map(({ text, color }) => (
              <p
                key={text}
                className={
                  color === 'tertiary'
                    ? 'text-tertiary'
                    : color === 'primary'
                      ? 'text-primary'
                      : ''
                }
              >
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
