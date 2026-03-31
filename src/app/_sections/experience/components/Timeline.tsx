import { TechTag } from '@/components/TechTag';
import { EXPERIENCE_DATA } from '../data/experience';
import type { TimelineEntry } from '../data/experience';

const BADGE_STYLES = {
  current: 'bg-primary-container text-primary',
  experience: 'bg-surface-container-high text-on-surface-variant',
  previous: 'bg-surface-container-high text-on-surface-variant',
  early: 'bg-surface-container-high text-on-surface-variant',
} as const;

const BADGE_LABELS = {
  current: null, // uses period instead
  experience: 'Experience',
  previous: 'Previous',
  early: 'Early Career',
} as const;

function HighlightText({ text }: { text: string }) {
  // Render **bold** markdown segments
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-bold text-white">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function TimelineNode({
  entry,
  index,
}: {
  entry: TimelineEntry;
  index: number;
}) {
  const isLeft = index % 2 === 0; // Alternating sides

  const badgeText = BADGE_LABELS[entry.badge] ?? entry.period;

  const infoColumn = (
    <div className={`${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
      {/* Date/Badge */}
      <div
        className={`mb-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold tracking-widest uppercase ${BADGE_STYLES[entry.badge]}`}
      >
        {entry.period || badgeText}
      </div>

      <h2 className="font-headline mb-1 text-3xl font-bold text-white">
        {entry.company}
      </h2>
      <h3
        className={`font-headline mb-4 text-xl font-medium italic ${
          isLeft ? 'text-primary' : 'text-secondary-fixed-dim'
        }`}
      >
        {entry.role}
      </h3>

      {entry.description && (
        <p className="text-on-surface-variant mb-6 text-sm leading-relaxed">
          {entry.description}
        </p>
      )}

      {entry.tags.length > 0 && (
        <div
          className={`flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : ''}`}
        >
          {entry.tags.map((tag) => (
            <TechTag key={tag}>{tag}</TechTag>
          ))}
        </div>
      )}
    </div>
  );

  const highlightColumn = (
    <div className="group relative">
      {/* Timeline Node Icon */}
      <div
        className={`bg-surface absolute top-10 z-10 hidden h-10 w-10 items-center justify-center rounded-full border-2 md:flex ${
          index === 0
            ? 'border-primary'
            : 'border-outline-variant/40 group-hover:border-primary'
        } ${isLeft ? 'left-[-45px]' : 'right-[-45px]'}`}
      >
        <span
          className={`text-sm ${
            index === 0
              ? 'text-primary'
              : 'text-outline group-hover:text-primary'
          } transition-colors`}
        >
          {entry.icon}
        </span>
      </div>

      {/* Highlight Card */}
      <div className="border-outline-variant/10 bg-surface-container group-hover:border-primary/30 rounded-lg border p-8 shadow-xl transition-all duration-500">
        {entry.highlights.length === 1 &&
        !entry.highlights[0]!.startsWith('0') ? (
          <p className="text-on-surface/80 text-sm leading-relaxed italic">
            <HighlightText text={entry.highlights[0]!} />
          </p>
        ) : (
          <ul className="text-on-surface/80 space-y-4 text-sm leading-relaxed">
            {entry.highlights.map((highlight, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className={`font-bold ${isLeft ? 'text-primary' : 'text-secondary-fixed-dim'}`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>
                  <HighlightText text={highlight} />
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
      {isLeft ? (
        <>
          <div className="order-2 md:order-1">{infoColumn}</div>
          <div className="order-1 md:order-2">{highlightColumn}</div>
        </>
      ) : (
        <>
          <div>{highlightColumn}</div>
          <div>{infoColumn}</div>
        </>
      )}
    </div>
  );
}

export function Timeline() {
  return (
    <div className="relative">
      {/* Central vertical line */}
      <div className="from-primary/50 via-outline-variant/20 absolute top-0 bottom-0 left-0 hidden w-px -translate-x-1/2 bg-gradient-to-b to-transparent md:left-1/2 md:block" />

      <div className="relative space-y-24">
        {EXPERIENCE_DATA.map((entry, index) => (
          <TimelineNode key={entry.company} entry={entry} index={index} />
        ))}
      </div>
    </div>
  );
}
