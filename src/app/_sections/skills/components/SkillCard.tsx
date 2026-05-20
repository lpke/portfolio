import type { ReactNode } from 'react';
import {
  SKILL_CARD_CLASS_NAMES,
  SKILL_CARD_PADDING_CLASS_NAMES,
  type SkillCardType,
} from '../data/skills';
import { SkillChips, cx } from './shared';

export type { SkillCardType };

type SkillCardProps = {
  title?: ReactNode;
  eyebrow?: ReactNode;
  description?: ReactNode;
  chips?: readonly string[];
  icon?: ReactNode;
  meta?: ReactNode;
  href?: string;
  type?: SkillCardType;
  className?: string;
  contentClassName?: string;
  ariaLabel?: string;
  children?: ReactNode;
};

export function SkillCard({
  title,
  eyebrow,
  description,
  chips,
  icon,
  meta,
  href,
  type = 'default',
  className,
  contentClassName,
  ariaLabel,
  children,
}: SkillCardProps) {
  const isLinked = Boolean(href);
  const cardClassName = cx(
    'group/skill-card relative isolate min-w-0 overflow-hidden rounded-[8px] border transition-[border-color,background-color,box-shadow,transform] duration-250',
    SKILL_CARD_CLASS_NAMES[type],
    SKILL_CARD_PADDING_CLASS_NAMES[type],
    isLinked &&
      'block cursor-pointer hover:-translate-y-0.5 hover:border-[color:color-mix(in_srgb,var(--skill-accent)_48%,rgba(255,255,255,0.18))] hover:bg-white/[0.055]',
    className,
  );

  const body = (
    <>
      {type !== 'quiet' && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_4%,var(--skill-accent-soft),transparent_46%)] opacity-0 transition-opacity duration-300 group-hover/skill-card:opacity-70"
        />
      )}

      <div className={cx('relative min-w-0', contentClassName)}>
        {(eyebrow || icon || meta || (isLinked && !meta)) && (
          <div className="mb-3 flex min-w-0 items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              {icon && (
                <span className="text-[var(--skill-accent)]">{icon}</span>
              )}
              {eyebrow && (
                <span className="font-label min-w-0 truncate text-[11px] font-bold tracking-widest text-[color:color-mix(in_srgb,var(--skill-accent)_44%,white)] uppercase">
                  {eyebrow}
                </span>
              )}
            </div>

            {(meta || isLinked) && (
              <span className="text-on-surface-variant/75 shrink-0">
                {meta ?? <ExternalLinkIcon />}
              </span>
            )}
          </div>
        )}

        {title && (
          <h4
            className={cx(
              'font-headline min-w-0 font-bold text-white transition-colors duration-200 group-hover/skill-card:text-[var(--skill-accent)]',
              type === 'feature'
                ? 'text-xl leading-tight lg:text-2xl'
                : 'text-base leading-snug lg:text-lg',
            )}
          >
            {title}
          </h4>
        )}

        {description && (
          <p
            className={cx(
              'text-on-surface-variant leading-relaxed',
              title ? 'mt-2' : '',
              type === 'feature'
                ? 'text-sm lg:text-[15px]'
                : 'text-xs lg:text-sm',
            )}
          >
            {description}
          </p>
        )}

        {chips && (
          <SkillChips
            items={chips}
            className={cx(title || description ? 'mt-4' : '')}
          />
        )}

        {children && (
          <div className={cx(title || description || chips ? 'mt-4' : '')}>
            {children}
          </div>
        )}
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={ariaLabel}
        className={cardClassName}
      >
        {body}
      </a>
    );
  }

  return (
    <article aria-label={ariaLabel} className={cardClassName}>
      {body}
    </article>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 transition-colors duration-200 group-hover/skill-card:text-[var(--skill-accent)]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}
