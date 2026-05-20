import {
  Children,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import {
  SKILL_PAGER_COPY,
  type SkillCapability,
  type SkillProfile,
  type SkillProofPoint,
} from '../../data/skills';
import {
  SkillCard,
  type SkillCardImageFit,
  type SkillCardImagePosition,
  type SkillCardType,
} from '../SkillCard';
import { GithubIcon, cx } from '../shared';
import type { SkillContentVariant } from './types';

type SkillCardImageProps = {
  image?: ReactNode | string;
  imageAlt?: string;
  imagePosition?: SkillCardImagePosition;
  imageRatio?: string;
  imageFit?: SkillCardImageFit;
  imageClassName?: string;
};

type SkillPagerPageProps = {
  label: string;
  summary?: string;
  children: ReactNode;
};

type SkillPagerDirection = 'next' | 'previous';
type SkillPagerPhase = 'enter' | 'exit';

const SKILL_PAGE_SWAP_MS = 130;

export function SkillPageShell({
  intro,
  variant,
  children,
}: {
  intro: string;
  variant: SkillContentVariant;
  children: ReactNode;
}) {
  return (
    <>
      <p
        className={cx(
          'max-w-3xl leading-relaxed text-white/90',
          variant === 'desktop'
            ? 'text-[1.18rem] lg:text-[1.25rem]'
            : 'text-base font-medium',
        )}
      >
        {intro}
      </p>
      <div className={variant === 'desktop' ? 'mt-7' : 'mt-5'}>{children}</div>
    </>
  );
}

export function SkillGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-6">{children}</div>
  );
}

export function SkillPager({ children }: { children: ReactNode }) {
  const pages = getSkillPages(children);
  const [requestedIndex, setRequestedIndex] = useState(0);
  const [direction, setDirection] = useState<SkillPagerDirection>('next');
  const [phase, setPhase] = useState<SkillPagerPhase>('enter');
  const swapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pageCount = pages.length;
  const activeIndex = Math.min(requestedIndex, Math.max(pageCount - 1, 0));
  const activePage = pages[activeIndex] ?? pages[0];

  useEffect(() => {
    return () => {
      if (swapTimeoutRef.current) {
        clearTimeout(swapTimeoutRef.current);
      }
    };
  }, []);

  if (!activePage) {
    return null;
  }

  if (pageCount === 1) {
    return <>{activePage.props.children}</>;
  }

  const changePage = (
    nextIndex: number,
    nextDirection: SkillPagerDirection,
  ) => {
    if (nextIndex === activeIndex) {
      return;
    }

    if (swapTimeoutRef.current) {
      clearTimeout(swapTimeoutRef.current);
    }

    setDirection(nextDirection);
    setPhase('exit');
    swapTimeoutRef.current = setTimeout(() => {
      setRequestedIndex(nextIndex);
      setPhase('enter');
    }, SKILL_PAGE_SWAP_MS);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 flex-wrap gap-2">
          {pages.map((page, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={page.props.label}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() =>
                  changePage(index, index > activeIndex ? 'next' : 'previous')
                }
                className={cx(
                  'font-label rounded-sm border px-3 py-1.5 text-[11px] font-bold tracking-widest uppercase transition-[background-color,filter] duration-200',
                  isActive
                    ? 'border-white/15 bg-white/[0.095] text-white'
                    : 'text-on-surface-variant/80 border-white/[0.07] bg-white/[0.025] hover:brightness-110',
                )}
              >
                {page.props.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={SKILL_PAGER_COPY.previousLabel}
            onClick={() =>
              changePage((activeIndex + pageCount - 1) % pageCount, 'previous')
            }
            className="text-on-surface-variant/80 grid h-8 w-8 place-items-center rounded-sm border border-white/[0.07] bg-white/[0.025] text-base transition-[background-color,filter] duration-200 hover:brightness-110"
          >
            <span aria-hidden="true">{'<'}</span>
          </button>
          <span className="font-label text-on-surface-variant/65 min-w-10 text-center text-[10px] font-bold tracking-widest uppercase">
            {activeIndex + 1}/{pageCount}
          </span>
          <button
            type="button"
            aria-label={SKILL_PAGER_COPY.nextLabel}
            onClick={() => changePage((activeIndex + 1) % pageCount, 'next')}
            className="text-on-surface-variant/80 grid h-8 w-8 place-items-center rounded-sm border border-white/[0.07] bg-white/[0.025] text-base transition-[background-color,filter] duration-200 hover:brightness-110"
          >
            <span aria-hidden="true">{'>'}</span>
          </button>
        </div>
      </div>

      {activePage.props.summary && (
        <p className="text-on-surface-variant/72 mb-3 text-xs leading-relaxed">
          {activePage.props.summary}
        </p>
      )}

      <div
        key={activePage.props.label}
        className="skill-page-panel"
        data-skill-page-direction={direction}
        data-skill-page-phase={phase}
      >
        {activePage.props.children}
      </div>
    </div>
  );
}

export function SkillPage({ children }: SkillPagerPageProps) {
  return <>{children}</>;
}

export function StackSkillCard({
  skill,
  title,
  className,
}: {
  skill: SkillProfile;
  title: string;
  className?: string;
}) {
  return (
    <SkillCard
      type="chips"
      title={title}
      eyebrow="Stack"
      chips={skill.tools}
      className={className}
    />
  );
}

export function CapabilityCard({
  capability,
  eyebrow = 'Capability',
  type = 'default',
  className,
  children,
  ...imageProps
}: {
  capability?: SkillCapability;
  eyebrow?: string;
  type?: SkillCardType;
  className?: string;
  children?: ReactNode;
} & SkillCardImageProps) {
  if (!capability) {
    return null;
  }

  return (
    <SkillCard
      type={type}
      title={capability.title}
      eyebrow={eyebrow}
      description={capability.description}
      className={className}
      {...imageProps}
    >
      {children}
    </SkillCard>
  );
}

export function ProofPointCard({
  proofPoint,
  eyebrow = 'Proof point',
  type = 'default',
  className,
  children,
  ...imageProps
}: {
  proofPoint?: SkillProofPoint;
  eyebrow?: string;
  type?: SkillCardType;
  className?: string;
  children?: ReactNode;
} & SkillCardImageProps) {
  if (!proofPoint) {
    return null;
  }

  return (
    <SkillCard
      type={type}
      title={proofPoint.title}
      eyebrow={eyebrow}
      description={proofPoint.description}
      href={proofPoint.url}
      meta={
        proofPoint.showGithubIcon ? (
          <GithubIcon className="h-4 w-4" />
        ) : undefined
      }
      className={className}
      {...imageProps}
    >
      {children}
    </SkillCard>
  );
}

export function getCapability(skill: SkillProfile, title: string) {
  return skill.capabilities.find((capability) => capability.title === title);
}

export function getProofPoint(skill: SkillProfile, title: string) {
  return skill.proofPoints.find((proofPoint) => proofPoint.title === title);
}

export function SkillGraphic({
  variant,
}: {
  variant:
    | 'product'
    | 'automation'
    | 'architecture'
    | 'tooling'
    | 'shipping'
    | 'strategy';
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 220"
      className="h-full w-full text-[var(--skill-accent)]"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect width="320" height="220" rx="12" fill="rgba(255,255,255,0.02)" />
      <GraphicPattern variant={variant} />
    </svg>
  );
}

function GraphicPattern({
  variant,
}: {
  variant:
    | 'product'
    | 'automation'
    | 'architecture'
    | 'tooling'
    | 'shipping'
    | 'strategy';
}) {
  if (variant === 'automation') {
    return (
      <>
        <path d="M64 110h192" stroke="currentColor" strokeOpacity="0.34" />
        <circle cx="80" cy="110" r="24" fill="currentColor" opacity="0.16" />
        <circle cx="160" cy="110" r="30" fill="currentColor" opacity="0.26" />
        <circle cx="240" cy="110" r="24" fill="currentColor" opacity="0.16" />
        <path d="M146 96h28v28h-28z" fill="currentColor" opacity="0.82" />
      </>
    );
  }

  if (variant === 'architecture') {
    return (
      <>
        <path
          d="m160 50 74 42v84l-74 42-74-42V92z"
          fill="currentColor"
          opacity="0.10"
        />
        <path
          d="m160 50 74 42-74 42-74-42zm0 84v84m-74-126v84m148-84v84"
          stroke="currentColor"
          strokeOpacity="0.62"
        />
      </>
    );
  }

  if (variant === 'tooling') {
    return (
      <>
        <rect
          x="54"
          y="52"
          width="212"
          height="116"
          rx="10"
          fill="currentColor"
          opacity="0.10"
        />
        <path d="M82 86h58M82 112h104M82 138h76" stroke="currentColor" />
        <rect
          x="204"
          y="82"
          width="34"
          height="34"
          rx="5"
          fill="currentColor"
        />
      </>
    );
  }

  if (variant === 'shipping') {
    return (
      <>
        <path
          d="M160 44 234 84v58c0 48-31 80-74 92-43-12-74-44-74-92V84z"
          fill="currentColor"
          opacity="0.12"
        />
        <path
          d="m124 132 24 24 52-60"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.76"
        />
      </>
    );
  }

  if (variant === 'strategy') {
    return (
      <>
        <path
          d="M58 158 116 112l46 34 92-88"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.76"
        />
        <circle cx="116" cy="112" r="16" fill="currentColor" opacity="0.20" />
        <circle cx="162" cy="146" r="16" fill="currentColor" opacity="0.20" />
        <circle cx="254" cy="58" r="18" fill="currentColor" opacity="0.30" />
      </>
    );
  }

  return (
    <>
      <path
        d="M44 72h232M44 112h232M44 152h232M84 44v132M160 44v132M236 44v132"
        stroke="currentColor"
        strokeOpacity="0.22"
      />
      <rect
        x="116"
        y="70"
        width="88"
        height="76"
        rx="10"
        fill="currentColor"
        opacity="0.18"
      />
      <rect
        x="142"
        y="92"
        width="36"
        height="36"
        rx="6"
        fill="currentColor"
        opacity="0.70"
      />
    </>
  );
}

function getSkillPages(children: ReactNode) {
  return Children.toArray(children).filter(
    (child): child is ReactElement<SkillPagerPageProps> =>
      isValidElement<SkillPagerPageProps>(child) && child.type === SkillPage,
  );
}
