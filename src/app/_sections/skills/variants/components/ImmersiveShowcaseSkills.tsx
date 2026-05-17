'use client';

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { getSkillIcon } from '../../components/SkillIcons';
import { VARIANT_SKILLS, type SkillVariantData } from '../data';
import {
  ArrowIcon,
  SkillsVariantHeading,
  SkillIconBadge,
  StackChips,
  VariantShell,
  cx,
  getSkillStyle,
} from '../shared';

type RailStyle = 'glass' | 'line' | 'solid' | 'minimal' | 'tabbed';
type DetailStyle = 'narrative' | 'dense' | 'technical' | 'editorial' | 'ledger';

type ImmersiveConfig = {
  id: string;
  name: string;
  eyebrow: string;
  railSide: 'left' | 'right';
  railStyle: RailStyle;
  detailStyle: DetailStyle;
  showArrows: boolean;
  blueprint: boolean;
  compactRail: boolean;
  panelClassName: string;
  contentAlignClassName: string;
  titleClassName: string;
  descriptionClassName: string;
  railWidthClassName: string;
  contentMaxClassName: string;
  competencyLimit: number;
  activeIconMinimal?: boolean;
  hideContentEyebrow?: boolean;
  hideContentTitle?: boolean;
  hideContentIcon?: boolean;
  hideRailMeta?: boolean;
  inactivePlusIndicator?: boolean;
  unframedRail?: boolean;
};

const IMMERSIVE_CONFIGS: ImmersiveConfig[] = [
  {
    id: '01',
    name: 'Immersive Rail',
    eyebrow: 'Current concept, cleaner proof',
    railSide: 'left',
    railStyle: 'glass',
    detailStyle: 'narrative',
    showArrows: true,
    blueprint: false,
    compactRail: false,
    panelClassName: 'bg-[#07101f]',
    contentAlignClassName: 'lg:pl-[26rem]',
    titleClassName: 'text-5xl sm:text-6xl lg:text-7xl',
    descriptionClassName: 'text-base sm:text-lg',
    railWidthClassName: 'lg:w-[22rem]',
    contentMaxClassName: 'max-w-4xl',
    competencyLimit: 4,
  },
  {
    id: '02',
    name: 'Quiet Overlay',
    eyebrow: 'No arrows, lower chrome',
    railSide: 'left',
    railStyle: 'minimal',
    detailStyle: 'editorial',
    showArrows: false,
    blueprint: false,
    compactRail: false,
    panelClassName: 'bg-[#0a1220]',
    contentAlignClassName: 'lg:pl-[25rem]',
    titleClassName: 'text-4xl sm:text-5xl lg:text-6xl',
    descriptionClassName: 'text-base',
    railWidthClassName: 'lg:w-[21rem]',
    contentMaxClassName: 'max-w-3xl',
    competencyLimit: 3,
  },
  {
    id: '03',
    name: 'Dense Rail',
    eyebrow: 'Compact selector, filled detail',
    railSide: 'left',
    railStyle: 'solid',
    detailStyle: 'dense',
    showArrows: true,
    blueprint: false,
    compactRail: true,
    panelClassName: 'bg-[#080f1a]',
    contentAlignClassName: 'lg:pl-[23rem]',
    titleClassName: 'text-4xl sm:text-5xl lg:text-6xl',
    descriptionClassName: 'text-base',
    railWidthClassName: 'lg:w-[19.5rem]',
    contentMaxClassName: 'max-w-5xl',
    competencyLimit: 4,
  },
  {
    id: '04',
    name: 'Studio Density',
    eyebrow: 'Variant 4 density, no stat cards',
    railSide: 'left',
    railStyle: 'glass',
    detailStyle: 'dense',
    showArrows: false,
    blueprint: false,
    compactRail: false,
    panelClassName: 'bg-[#0d1321]',
    contentAlignClassName: 'lg:pl-[27rem]',
    titleClassName: 'text-4xl sm:text-5xl',
    descriptionClassName: 'text-base',
    railWidthClassName: 'lg:w-[23rem]',
    contentMaxClassName: 'max-w-5xl',
    competencyLimit: 4,
  },
  {
    id: '05',
    name: 'Right Rail',
    eyebrow: 'Same interaction, opposite side',
    railSide: 'right',
    railStyle: 'line',
    detailStyle: 'narrative',
    showArrows: true,
    blueprint: false,
    compactRail: false,
    panelClassName: 'bg-[#07121b]',
    contentAlignClassName: 'lg:pr-[26rem]',
    titleClassName: 'text-5xl sm:text-6xl',
    descriptionClassName: 'text-base sm:text-lg',
    railWidthClassName: 'lg:w-[22rem]',
    contentMaxClassName: 'max-w-4xl',
    competencyLimit: 3,
  },
  {
    id: '06',
    name: 'Blueprint Immersive',
    eyebrow: 'Blueprint texture under content',
    railSide: 'left',
    railStyle: 'solid',
    detailStyle: 'technical',
    showArrows: true,
    blueprint: true,
    compactRail: true,
    panelClassName: 'bg-[#061823]',
    contentAlignClassName: 'lg:pl-[24rem]',
    titleClassName: 'text-4xl sm:text-5xl lg:text-6xl',
    descriptionClassName: 'text-base',
    railWidthClassName: 'lg:w-[20.5rem]',
    contentMaxClassName: 'max-w-5xl',
    competencyLimit: 4,
  },
  {
    id: '07',
    name: 'Large Type',
    eyebrow: 'Big headline, restrained proof',
    railSide: 'left',
    railStyle: 'minimal',
    detailStyle: 'editorial',
    showArrows: false,
    blueprint: false,
    compactRail: false,
    panelClassName: 'bg-[#0c1220]',
    contentAlignClassName: 'lg:pl-[24rem]',
    titleClassName: 'text-6xl sm:text-7xl lg:text-8xl',
    descriptionClassName: 'text-lg',
    railWidthClassName: 'lg:w-[20rem]',
    contentMaxClassName: 'max-w-4xl',
    competencyLimit: 3,
  },
  {
    id: '08',
    name: 'Technical Sheet',
    eyebrow: 'Proof-led technical layout',
    railSide: 'left',
    railStyle: 'tabbed',
    detailStyle: 'technical',
    showArrows: true,
    blueprint: false,
    compactRail: true,
    panelClassName: 'bg-[#071014]',
    contentAlignClassName: 'lg:pl-[25rem]',
    titleClassName: 'text-4xl sm:text-5xl',
    descriptionClassName: 'text-base',
    railWidthClassName: 'lg:w-[21rem]',
    contentMaxClassName: 'max-w-5xl',
    competencyLimit: 4,
  },
  {
    id: '09',
    name: 'Plain Professional',
    eyebrow: 'Low-contrast production candidate',
    railSide: 'left',
    railStyle: 'line',
    detailStyle: 'narrative',
    showArrows: false,
    blueprint: false,
    compactRail: true,
    panelClassName: 'bg-[#0b1322]',
    contentAlignClassName: 'lg:pl-[23rem]',
    titleClassName: 'text-4xl sm:text-5xl lg:text-6xl',
    descriptionClassName: 'text-base',
    railWidthClassName: 'lg:w-[19.5rem]',
    contentMaxClassName: 'max-w-4xl',
    competencyLimit: 3,
    activeIconMinimal: true,
    hideContentEyebrow: true,
    hideContentTitle: true,
    hideContentIcon: true,
    hideRailMeta: true,
    inactivePlusIndicator: true,
    unframedRail: true,
  },
  {
    id: '10',
    name: 'Product Brief',
    eyebrow: 'Clear sections, minimal movement',
    railSide: 'left',
    railStyle: 'glass',
    detailStyle: 'ledger',
    showArrows: true,
    blueprint: false,
    compactRail: false,
    panelClassName: 'bg-[#0a111f]',
    contentAlignClassName: 'lg:pl-[26rem]',
    titleClassName: 'text-4xl sm:text-5xl lg:text-6xl',
    descriptionClassName: 'text-base sm:text-lg',
    railWidthClassName: 'lg:w-[22rem]',
    contentMaxClassName: 'max-w-5xl',
    competencyLimit: 4,
  },
  {
    id: '11',
    name: 'Inset Notes',
    eyebrow: 'Softer rail, editorial rhythm',
    railSide: 'left',
    railStyle: 'solid',
    detailStyle: 'editorial',
    showArrows: false,
    blueprint: false,
    compactRail: false,
    panelClassName: 'bg-[#101521]',
    contentAlignClassName: 'lg:pl-[27rem]',
    titleClassName: 'text-5xl sm:text-6xl',
    descriptionClassName: 'text-base',
    railWidthClassName: 'lg:w-[23rem]',
    contentMaxClassName: 'max-w-4xl',
    competencyLimit: 3,
  },
  {
    id: '12',
    name: 'Compact Stage',
    eyebrow: 'Tighter vertical spacing',
    railSide: 'left',
    railStyle: 'minimal',
    detailStyle: 'dense',
    showArrows: true,
    blueprint: false,
    compactRail: true,
    panelClassName: 'bg-[#080e19]',
    contentAlignClassName: 'lg:pl-[22rem]',
    titleClassName: 'text-4xl sm:text-5xl',
    descriptionClassName: 'text-base',
    railWidthClassName: 'lg:w-[18.5rem]',
    contentMaxClassName: 'max-w-5xl',
    competencyLimit: 4,
  },
  {
    id: '13',
    name: 'Console Calm',
    eyebrow: 'Subtle terminal-adjacent tone',
    railSide: 'left',
    railStyle: 'tabbed',
    detailStyle: 'technical',
    showArrows: true,
    blueprint: false,
    compactRail: false,
    panelClassName: 'bg-[#061016]',
    contentAlignClassName: 'lg:pl-[26rem]',
    titleClassName: 'text-4xl sm:text-5xl',
    descriptionClassName: 'text-base',
    railWidthClassName: 'lg:w-[22rem]',
    contentMaxClassName: 'max-w-5xl',
    competencyLimit: 4,
  },
  {
    id: '14',
    name: 'Soft Focus',
    eyebrow: 'Airier side overlay',
    railSide: 'left',
    railStyle: 'glass',
    detailStyle: 'editorial',
    showArrows: false,
    blueprint: false,
    compactRail: false,
    panelClassName: 'bg-[#0d1421]',
    contentAlignClassName: 'lg:pl-[28rem]',
    titleClassName: 'text-5xl sm:text-6xl lg:text-7xl',
    descriptionClassName: 'text-lg',
    railWidthClassName: 'lg:w-[24rem]',
    contentMaxClassName: 'max-w-4xl',
    competencyLimit: 3,
  },
  {
    id: '15',
    name: 'Sharp Candidate',
    eyebrow: 'Crisp compact final candidate',
    railSide: 'left',
    railStyle: 'line',
    detailStyle: 'ledger',
    showArrows: true,
    blueprint: false,
    compactRail: true,
    panelClassName: 'bg-[#070d18]',
    contentAlignClassName: 'lg:pl-[23rem]',
    titleClassName: 'text-4xl sm:text-5xl lg:text-6xl',
    descriptionClassName: 'text-base',
    railWidthClassName: 'lg:w-[19.5rem]',
    contentMaxClassName: 'max-w-5xl',
    competencyLimit: 4,
  },
];

const FADE_MS = 100;

export function ImmersiveShowcaseSkills({
  variantId,
  withShell = true,
}: {
  variantId: string;
  withShell?: boolean;
}) {
  const config = useMemo(
    () =>
      IMMERSIVE_CONFIGS.find((variant) => variant.id === variantId) ??
      IMMERSIVE_CONFIGS[0],
    [variantId],
  );
  const initialId = VARIANT_SKILLS[0]?.id ?? '';
  const [selectedId, setSelectedId] = useState(initialId);
  const [visibleId, setVisibleId] = useState(initialId);
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectedSkill =
    VARIANT_SKILLS.find((skill) => skill.id === selectedId) ??
    VARIANT_SKILLS[0];
  const visibleSkill =
    VARIANT_SKILLS.find((skill) => skill.id === visibleId) ?? selectedSkill;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!config || !selectedSkill || !visibleSkill) {
    return null;
  }

  const selectSkill = (nextId: string) => {
    if (!nextId || nextId === selectedId) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setSelectedId(nextId);
    setIsVisible(false);

    timeoutRef.current = setTimeout(() => {
      setVisibleId(nextId);
      setIsVisible(true);
      timeoutRef.current = null;
    }, FADE_MS);
  };

  const selectByOffset = (offset: number) => {
    const currentIndex = VARIANT_SKILLS.findIndex(
      (skill) => skill.id === selectedId,
    );
    const baseIndex = currentIndex >= 0 ? currentIndex : 0;
    const nextIndex =
      (baseIndex + offset + VARIANT_SKILLS.length) % VARIANT_SKILLS.length;
    const nextSkill = VARIANT_SKILLS[nextIndex];

    if (nextSkill) {
      selectSkill(nextSkill.id);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      selectByOffset(1);
      return;
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      selectByOffset(-1);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      selectSkill(VARIANT_SKILLS[0]?.id ?? '');
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      selectSkill(VARIANT_SKILLS[VARIANT_SKILLS.length - 1]?.id ?? '');
    }
  };

  const content = (
    <section
      className={cx(
        'ghost-border relative min-h-[42rem] overflow-hidden transition-colors duration-300',
        config.panelClassName,
      )}
      style={getSkillStyle(selectedSkill)}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.055),transparent_36%,rgba(255,255,255,0.025))]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,var(--skill-accent-soft),transparent_32%)] opacity-75" />
      {config.blueprint && <BlueprintLayer />}

      <div className="relative z-10 mx-auto min-h-[42rem] max-w-7xl px-4 py-24 sm:px-6 md:px-8 lg:py-28">
        <div className="mb-10 lg:mb-12">
          <SkillsVariantHeading />
        </div>

        <div className="relative min-h-[38rem]">
          <div
            className={cx(
              'lg:absolute lg:top-0',
              config.railSide === 'right' ? 'lg:right-0' : 'lg:left-0',
              config.railWidthClassName,
            )}
          >
            <div className="flex gap-3">
              {config.showArrows && (
                <div className="hidden w-10 shrink-0 flex-col justify-center gap-2 lg:flex">
                  <ArrowButton
                    direction="left"
                    label="Select previous skill"
                    onClick={() => selectByOffset(-1)}
                  />
                  <ArrowButton
                    direction="right"
                    label="Select next skill"
                    onClick={() => selectByOffset(1)}
                  />
                </div>
              )}

              <SkillRail
                config={config}
                selectedId={selectedId}
                onSelect={selectSkill}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          <div
            className={cx(
              'mt-5 flex flex-col gap-5 lg:mt-0 lg:min-h-[38rem]',
              config.railSide === 'right' ? 'lg:items-start' : 'lg:items-end',
              config.contentAlignClassName,
            )}
          >
            <ImmersiveContent
              skill={visibleSkill}
              config={config}
              isVisible={isVisible}
            />
          </div>
        </div>
      </div>
    </section>
  );

  if (!withShell) {
    return content;
  }

  return <VariantShell>{content}</VariantShell>;
}

function SkillRail({
  config,
  selectedId,
  onSelect,
  onKeyDown,
}: {
  config: ImmersiveConfig;
  selectedId: string;
  onSelect: (id: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Skill focus areas"
      onKeyDown={onKeyDown}
      className={cx('grid flex-1 gap-2', getRailContainerClass(config))}
    >
      {VARIANT_SKILLS.map((skill) => {
        const isSelected = skill.id === selectedId;

        return (
          <button
            key={skill.id}
            id={`immersive-${config.id}-tab-${skill.id}`}
            type="button"
            role="tab"
            aria-selected={isSelected}
            aria-controls={`immersive-${config.id}-panel`}
            onMouseDown={(event) => {
              if (event.button !== 0) return;
              onSelect(skill.id);
            }}
            onClick={() => onSelect(skill.id)}
            className={cx(
              'grid w-full grid-cols-[1.75rem_minmax(0,1fr)] items-start gap-2.5 rounded-lg border border-transparent px-4 py-4 text-left transition-[background-color,border-color,color,box-shadow,min-height] duration-300',
              isSelected ? 'min-h-[8.75rem]' : 'min-h-[4.25rem]',
              getRailItemClass(isSelected),
            )}
            style={getSkillStyle(skill)}
          >
            <span className="flex h-7 w-7 items-center justify-center">
              {isSelected ? (
                config.activeIconMinimal ? (
                  <span
                    className="grid h-6 w-6 place-items-center text-[var(--skill-accent)] [&>svg]:h-5 [&>svg]:w-5"
                    aria-hidden="true"
                  >
                    {getSkillIcon(skill.iconKey)}
                  </span>
                ) : (
                  <SkillIconBadge
                    skill={skill}
                    className="h-10 w-10 rounded-md"
                  />
                )
              ) : config.inactivePlusIndicator ? (
                <PlusIndicator />
              ) : null}
            </span>

            <span className="min-w-0">
              <span className="font-headline block truncate text-lg font-bold text-white">
                {skill.title}
              </span>
              {!config.hideRailMeta && (
                <span className="font-label text-on-surface-variant/70 mt-1 block truncate text-[10px] font-bold tracking-widest uppercase">
                  {skill.eyebrow}
                </span>
              )}

              <span
                className={cx(
                  'grid transition-[grid-template-rows,opacity,margin-top] duration-200',
                  isSelected
                    ? 'mt-2 grid-rows-[1fr] opacity-100'
                    : 'mt-0 grid-rows-[0fr] opacity-0',
                )}
              >
                <span className="text-on-surface-variant min-h-0 overflow-hidden text-sm leading-relaxed">
                  {skill.summary}
                </span>
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function getRailContainerClass(config: ImmersiveConfig) {
  if (config.unframedRail) {
    return '';
  }

  if (config.railStyle === 'minimal') {
    return 'rounded-lg border border-white/5 bg-black/10 p-2';
  }

  if (config.railStyle === 'line') {
    return 'rounded-lg border-l border-white/10 bg-black/5 p-2';
  }

  if (config.railStyle === 'solid') {
    return 'rounded-lg border border-white/10 bg-surface-container-low/80 p-2 shadow-[0_22px_70px_rgba(0,0,0,0.24)]';
  }

  if (config.railStyle === 'tabbed') {
    return 'rounded-lg border border-white/10 bg-black/30 p-2 font-mono';
  }

  return 'rounded-lg border border-white/10 bg-surface-container-low/60 p-2 shadow-[0_22px_70px_rgba(0,0,0,0.24)] backdrop-blur-sm';
}

function getRailItemClass(isSelected: boolean) {
  const base =
    'bg-surface-container-high/85 text-on-surface-variant hover:bg-white/[0.10] hover:text-white';

  if (!isSelected) {
    return base;
  }

  return 'border-white/20 bg-white/[0.13] text-white shadow-[0_18px_45px_rgba(0,0,0,0.24)]';
}

function ImmersiveContent({
  skill,
  config,
  isVisible,
}: {
  skill: SkillVariantData;
  config: ImmersiveConfig;
  isVisible: boolean;
}) {
  return (
    <article
      id={`immersive-${config.id}-panel`}
      role="tabpanel"
      aria-labelledby={`immersive-${config.id}-tab-${skill.id}`}
      className={cx(
        'w-full py-4 transition-opacity duration-150 ease-out lg:py-10',
        config.contentMaxClassName,
        isVisible ? 'opacity-100' : 'opacity-0',
      )}
      style={getSkillStyle(skill)}
    >
      {(!config.hideContentEyebrow ||
        !config.hideContentTitle ||
        !config.hideContentIcon) && (
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="min-w-0">
            {!config.hideContentEyebrow && (
              <p className="font-label text-xs font-bold tracking-widest text-[var(--skill-accent)] uppercase">
                {config.eyebrow}
              </p>
            )}
            {!config.hideContentTitle && (
              <h3
                className={cx(
                  'font-headline max-w-[13ch] leading-none font-black tracking-tight text-white',
                  !config.hideContentEyebrow && 'mt-4',
                  config.titleClassName,
                )}
              >
                {skill.title}
              </h3>
            )}
          </div>
          {!config.hideContentIcon && (
            <SkillIconBadge
              skill={skill}
              className="h-12 w-12 rounded-md sm:h-14 sm:w-14"
            />
          )}
        </div>
      )}

      <p
        className={cx(
          'text-on-surface-variant max-w-3xl leading-relaxed',
          (!config.hideContentEyebrow ||
            !config.hideContentTitle ||
            !config.hideContentIcon) &&
            'mt-6',
          config.descriptionClassName,
        )}
      >
        {skill.detail}
      </p>

      <div className={cx('mt-8', getDetailLayoutClass(config))}>
        <ContentSection title="Approach">
          <CompetencyGrid skill={skill} limit={config.competencyLimit} />
        </ContentSection>

        <ContentSection title="Examples">
          <ExampleGrid skill={skill} config={config} />
          <StackChips items={skill.stack} className="mt-5" />
        </ContentSection>
      </div>
    </article>
  );
}

function getDetailLayoutClass(config: ImmersiveConfig) {
  if (config.detailStyle === 'editorial') {
    return 'grid gap-9 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]';
  }

  if (config.detailStyle === 'technical' || config.detailStyle === 'ledger') {
    return 'grid gap-7 xl:grid-cols-[minmax(0,1fr)_22rem]';
  }

  if (config.detailStyle === 'dense') {
    return 'grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.8fr)]';
  }

  return 'grid gap-7 lg:grid-cols-2';
}

function ContentSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h4 className="font-label text-on-surface-variant/70 mb-4 text-xs font-bold tracking-widest uppercase">
        {title}
      </h4>
      {children}
    </section>
  );
}

function CompetencyGrid({
  skill,
  limit,
}: {
  skill: SkillVariantData;
  limit: number;
}) {
  return (
    <div className="grid gap-3">
      {skill.competencies.slice(0, limit).map((item) => (
        <div
          key={item.label}
          className="border-l border-[var(--skill-accent)] bg-white/[0.025] px-4 py-3"
        >
          <h5 className="font-headline text-sm font-bold text-white">
            {item.label}
          </h5>
          <p className="text-on-surface-variant mt-1 text-sm leading-relaxed">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}

function ExampleGrid({
  skill,
  config,
}: {
  skill: SkillVariantData;
  config: ImmersiveConfig;
}) {
  return (
    <div
      className={cx(
        'grid gap-3',
        config.detailStyle === 'narrative' && 'sm:grid-cols-2',
      )}
    >
      {skill.examples.map((example) => (
        <div key={example.title} className="bg-white/[0.025] px-4 py-3">
          <h5 className="font-headline text-sm font-bold text-white">
            {example.title}
          </h5>
          <p className="text-on-surface-variant mt-2 text-sm leading-relaxed">
            {example.detail}
          </p>
        </div>
      ))}
    </div>
  );
}

function ArrowButton({
  direction,
  label,
  onClick,
}: {
  direction: 'left' | 'right';
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.035] text-white/50 transition-colors hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
    >
      <ArrowIcon direction={direction} />
    </button>
  );
}

function PlusIndicator() {
  return (
    <span
      className="text-on-surface-variant/55 grid h-[1.125rem] w-[1.125rem] place-items-center rounded-full border border-white/10 bg-white/[0.025] text-sm leading-none"
      aria-hidden="true"
    >
      +
    </span>
  );
}

function BlueprintLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(123,208,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(123,208,255,0.18)_1px,transparent_1px)] [background-size:32px_32px] opacity-35" />
  );
}
