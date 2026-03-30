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
      <div className="group rounded-lg border border-white/5 bg-surface-container-low p-8 transition-colors duration-300 hover:bg-surface-container md:col-span-2">
        <div className="mb-8 flex items-center gap-4">
          <span className="text-3xl text-primary">⌨</span>
          <h2 className="font-headline text-2xl font-bold uppercase tracking-wider text-white">
            Core &amp; Languages
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {/* Core Focus */}
          <div>
            <h3 className="mb-4 font-label text-sm uppercase tracking-widest text-on-surface-variant/50">
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
            <h3 className="mb-4 font-label text-sm uppercase tracking-widest text-on-surface-variant/50">
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
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-primary/10 to-transparent" />
          <div className="h-full w-full bg-gradient-to-br from-surface-container-highest via-surface-container to-surface-container-low opacity-60 transition-transform duration-700 group-hover:scale-105" />
        </div>
      </div>

      {/* ── Product Stack (1 col) ── */}
      <div className="flex flex-col justify-between rounded-lg border border-white/5 bg-surface-container p-8">
        <div>
          <div className="mb-6 flex items-center gap-4">
            <span className="text-3xl text-tertiary">📊</span>
            <h2 className="font-headline text-2xl font-bold uppercase tracking-wider text-white">
              Product
            </h2>
          </div>
          <p className="mb-8 text-sm leading-relaxed text-on-surface-variant">
            Specialized stack for experimentation, lifecycle marketing, and
            analytics-driven growth.
          </p>
        </div>

        <div className="space-y-3">
          {PRODUCT_STACK.map(({ tool, category }, i) => (
            <div
              key={tool}
              className={`flex items-center justify-between font-label text-sm text-on-surface-variant ${
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
      <div className="grid items-center gap-8 rounded-lg border border-white/5 bg-surface-container-low p-8 md:col-span-3 md:grid-cols-2">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="text-3xl text-primary">🔧</span>
            <h2 className="font-headline text-2xl font-bold uppercase tracking-wider text-white">
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
        <div className="relative h-56 overflow-hidden rounded-lg border border-white/10 bg-surface-container-lowest">
          <div className="signature-gradient absolute inset-0 opacity-10" />
          <div className="relative z-10 space-y-2 p-6 font-mono text-xs text-secondary-fixed-dim opacity-80">
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
