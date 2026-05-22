import { isValidElement, useSyncExternalStore } from 'react';
import {
  SKILL_CARD_DEFAULT_PROP_CONFIG,
  SKILL_CARD_PROP_KEYS,
} from './defaults';
import type {
  SkillCardBaseProps,
  SkillCardDefaultConfig,
  SkillCardResponsiveConfig,
  SkillCardResponsiveDirection,
  SkillCardResponsiveMergeMode,
  SkillCardResponsiveProp,
  SkillCardResponsiveProps,
  SkillCardResponsiveValues,
  SkillCardTailwindBreakpoint,
} from './types';

type SkillCardBreakpointConfig = {
  key: string;
  order: number;
};

type SkillCardResponsiveEntry<T> = {
  breakpoint: SkillCardBreakpointConfig;
  index: number;
  value: T;
};

type SkillCardResponsiveSource<T> = {
  values: SkillCardResponsiveValues<T>;
  direction: SkillCardResponsiveDirection;
};

type SkillCardNormalizedResponsiveConfig<T> = {
  source: SkillCardResponsiveSource<T>;
  merge: SkillCardResponsiveMergeMode;
};

type SkillCardResolvedValue<T> =
  | { hasValue: true; value: T | undefined }
  | { hasValue: false; value?: never };

const SKILL_CARD_TAILWIND_BREAKPOINTS = {
  /** Tailwind `sm` breakpoint: 640px / 40rem. */
  sm: { key: 'sm', order: 640 },
  /** Tailwind `md` breakpoint: 768px / 48rem. */
  md: { key: 'md', order: 768 },
  /** Tailwind `lg` breakpoint: 1024px / 64rem. */
  lg: { key: 'lg', order: 1024 },
  /** Tailwind `xl` breakpoint: 1280px / 80rem. */
  xl: { key: 'xl', order: 1280 },
  /** Tailwind `2xl` breakpoint: 1536px / 96rem. */
  '2xl': { key: '2xl', order: 1536 },
} as const satisfies Record<
  SkillCardTailwindBreakpoint,
  SkillCardBreakpointConfig
>;

const SKILL_CARD_BASE_BREAKPOINT_KEYS = new Set(['base', 'default']);
const SKILL_CARD_CUSTOM_BREAKPOINT_PATTERN = /^(\d+(?:\.\d+)?)(px|rem|em)?$/;
const SKILL_CARD_RESPONSIVE_DIRECTIONS = new Set<SkillCardResponsiveDirection>([
  'up',
  'down',
]);
const SKILL_CARD_RESPONSIVE_MERGE_MODES = new Set<SkillCardResponsiveMergeMode>(
  ['replace', 'merge', 'overlay'],
);

const skillCardViewportSubscribers = new Set<() => void>();
let skillCardViewportAnimationFrame: number | null = null;

export function useResolvedSkillCardProps(
  props: SkillCardResponsiveProps,
): SkillCardBaseProps {
  const viewportWidth = useSyncExternalStore(
    subscribeSkillCardViewport,
    getSkillCardViewportSnapshot,
    getSkillCardServerSnapshot,
  );

  return resolveSkillCardProps(props, viewportWidth);
}

function resolveSkillCardProps(
  props: SkillCardResponsiveProps,
  viewportWidth: number | null,
) {
  const resolvedProps: Partial<Record<keyof SkillCardBaseProps, unknown>> = {};

  SKILL_CARD_PROP_KEYS.forEach((propKey) => {
    resolvedProps[propKey] = resolveSkillCardProp(
      SKILL_CARD_DEFAULT_PROP_CONFIG[
        propKey
      ] as SkillCardDefaultConfig<unknown>,
      (props as Partial<Record<keyof SkillCardBaseProps, unknown>>)[propKey],
      viewportWidth,
    );
  });

  return resolvedProps as SkillCardBaseProps;
}

function resolveSkillCardProp<T>(
  defaultConfig: SkillCardDefaultConfig<T> | undefined,
  propValue: unknown,
  viewportWidth: number | null,
): T | undefined {
  const defaultSource = normalizeSkillCardDefaultConfig(defaultConfig);

  if (propValue === undefined) {
    return getResolvedSkillCardValue(
      resolveSkillCardResponsiveSource(defaultSource, viewportWidth),
    );
  }

  const responsiveConfig = getSkillCardResponsiveConfig<T>(
    propValue as SkillCardResponsiveProp<T>,
  );

  if (!responsiveConfig) {
    return propValue as T;
  }

  if (responsiveConfig.merge === 'replace' || !defaultSource) {
    return getResolvedSkillCardValue(
      resolveSkillCardResponsiveSource(responsiveConfig.source, viewportWidth),
    );
  }

  if (
    responsiveConfig.merge === 'merge' &&
    responsiveConfig.source.direction === defaultSource.direction
  ) {
    return getResolvedSkillCardValue(
      resolveSkillCardResponsiveSource(
        {
          direction: responsiveConfig.source.direction,
          values: {
            ...defaultSource.values,
            ...responsiveConfig.source.values,
          },
        },
        viewportWidth,
      ),
    );
  }

  const providedValue = resolveSkillCardResponsiveSource(
    responsiveConfig.source,
    viewportWidth,
  );

  if (providedValue.hasValue) {
    return providedValue.value;
  }

  return getResolvedSkillCardValue(
    resolveSkillCardResponsiveSource(defaultSource, viewportWidth),
  );
}

function normalizeSkillCardDefaultConfig<T>(
  defaultConfig: SkillCardDefaultConfig<T> | undefined,
): SkillCardResponsiveSource<T> | null {
  if (!defaultConfig) {
    return null;
  }

  return {
    direction: defaultConfig.direction ?? 'up',
    values: normalizeSkillCardResponsiveValues(defaultConfig.values),
  };
}

function getSkillCardResponsiveConfig<T>(
  value: SkillCardResponsiveProp<T>,
): SkillCardNormalizedResponsiveConfig<T> | null {
  if (isSkillCardResponsiveConfig(value)) {
    return {
      source: {
        direction: value.direction ?? 'up',
        values: normalizeSkillCardResponsiveValues(value.values),
      },
      merge: value.merge ?? 'overlay',
    };
  }

  if (isSkillCardResponsiveValue(value)) {
    return {
      source: {
        direction: 'up',
        values: normalizeSkillCardResponsiveValues(value),
      },
      merge: 'overlay',
    };
  }

  return null;
}

function resolveSkillCardResponsiveSource<T>(
  source: SkillCardResponsiveSource<T> | null,
  viewportWidth: number | null,
): SkillCardResolvedValue<T> {
  if (!source) {
    return { hasValue: false };
  }

  const baseValue = getSkillCardBaseValue(source.values);

  if (viewportWidth === null) {
    return baseValue;
  }

  if (source.direction === 'down') {
    const matchedEntry = getSkillCardResponsiveEntries(source.values).find(
      ({ breakpoint }) => viewportWidth <= breakpoint.order,
    );

    return matchedEntry
      ? { hasValue: true, value: matchedEntry.value }
      : baseValue;
  }

  return getSkillCardResponsiveEntries(source.values).reduce<
    SkillCardResolvedValue<T>
  >(
    (resolvedValue, entry) =>
      viewportWidth >= entry.breakpoint.order
        ? { hasValue: true, value: entry.value }
        : resolvedValue,
    baseValue,
  );
}

function getSkillCardBaseValue<T>(
  responsiveValue: SkillCardResponsiveValues<T>,
): SkillCardResolvedValue<T> {
  return Object.hasOwn(responsiveValue, 'base')
    ? { hasValue: true, value: responsiveValue.base }
    : { hasValue: false };
}

function getResolvedSkillCardValue<T>(
  resolvedValue: SkillCardResolvedValue<T>,
) {
  return resolvedValue.hasValue ? resolvedValue.value : undefined;
}

function normalizeSkillCardResponsiveValues<T>(
  responsiveValue: SkillCardResponsiveValues<T>,
): SkillCardResponsiveValues<T> {
  const normalizedValue = {
    ...responsiveValue,
  } as SkillCardResponsiveValues<T>;

  if (
    !Object.hasOwn(normalizedValue, 'base') &&
    Object.hasOwn(normalizedValue, 'default')
  ) {
    normalizedValue.base = normalizedValue.default;
  }

  delete normalizedValue.default;

  return normalizedValue;
}

function getSkillCardResponsiveEntries<T>(
  responsiveValue: SkillCardResponsiveValues<T>,
) {
  return Object.entries(responsiveValue)
    .map(([key, value], index): SkillCardResponsiveEntry<T> | null => {
      const breakpoint = getSkillCardBreakpoint(key);

      if (!breakpoint) {
        return null;
      }

      return { breakpoint, index, value: value as T };
    })
    .filter((entry): entry is SkillCardResponsiveEntry<T> => Boolean(entry))
    .sort(
      (firstEntry, secondEntry) =>
        compareSkillCardBreakpoints(
          firstEntry.breakpoint,
          secondEntry.breakpoint,
        ) || firstEntry.index - secondEntry.index,
    );
}

function getSkillCardBreakpoint(
  breakpointKey: string,
): SkillCardBreakpointConfig | null {
  if (SKILL_CARD_BASE_BREAKPOINT_KEYS.has(breakpointKey)) {
    return null;
  }

  if (isSkillCardTailwindBreakpoint(breakpointKey)) {
    return SKILL_CARD_TAILWIND_BREAKPOINTS[breakpointKey];
  }

  const match = breakpointKey.match(SKILL_CARD_CUSTOM_BREAKPOINT_PATTERN);

  if (!match) {
    return null;
  }

  const [, numericValue = '0', unit = 'px'] = match;
  const parsedValue = Number(numericValue);

  return {
    key: breakpointKey,
    order: getSkillCardBreakpointOrder(parsedValue, unit),
  };
}

function getSkillCardBreakpointOrder(value: number, unit: string) {
  if (unit === 'rem' || unit === 'em') {
    return value * 16;
  }

  return value;
}

function compareSkillCardBreakpoints(
  firstBreakpoint: SkillCardBreakpointConfig,
  secondBreakpoint: SkillCardBreakpointConfig,
) {
  return firstBreakpoint.order - secondBreakpoint.order;
}

function isSkillCardTailwindBreakpoint(
  breakpointKey: string,
): breakpointKey is SkillCardTailwindBreakpoint {
  return breakpointKey in SKILL_CARD_TAILWIND_BREAKPOINTS;
}

function isSkillCardResponsiveConfig(
  value: unknown,
): value is SkillCardResponsiveConfig<unknown> {
  if (!isSkillCardObjectValue(value) || !('values' in value)) {
    return false;
  }

  const { direction, merge, values } = value as {
    direction?: unknown;
    merge?: unknown;
    values?: unknown;
  };

  return (
    isSkillCardResponsiveValue(values) &&
    (direction === undefined || isSkillCardResponsiveDirection(direction)) &&
    (merge === undefined || isSkillCardResponsiveMergeMode(merge))
  );
}

function isSkillCardResponsiveDirection(
  value: unknown,
): value is SkillCardResponsiveDirection {
  return (
    typeof value === 'string' &&
    SKILL_CARD_RESPONSIVE_DIRECTIONS.has(value as SkillCardResponsiveDirection)
  );
}

function isSkillCardResponsiveMergeMode(
  value: unknown,
): value is SkillCardResponsiveMergeMode {
  return (
    typeof value === 'string' &&
    SKILL_CARD_RESPONSIVE_MERGE_MODES.has(value as SkillCardResponsiveMergeMode)
  );
}

function isSkillCardResponsiveValue(
  value: unknown,
): value is SkillCardResponsiveValues<unknown> {
  if (!isSkillCardObjectValue(value)) {
    return false;
  }

  return Object.keys(value).some(
    (key) =>
      SKILL_CARD_BASE_BREAKPOINT_KEYS.has(key) ||
      isSkillCardTailwindBreakpoint(key) ||
      SKILL_CARD_CUSTOM_BREAKPOINT_PATTERN.test(key),
  );
}

function isSkillCardObjectValue(
  value: unknown,
): value is Record<string, unknown> {
  if (
    typeof value !== 'object' ||
    value === null ||
    Array.isArray(value) ||
    isValidElement(value)
  ) {
    return false;
  }

  return !('$$typeof' in value);
}

function subscribeSkillCardViewport(onStoreChange: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  skillCardViewportSubscribers.add(onStoreChange);

  if (skillCardViewportSubscribers.size === 1) {
    window.addEventListener('resize', handleSkillCardViewportChange);
  }

  return () => {
    skillCardViewportSubscribers.delete(onStoreChange);

    if (skillCardViewportSubscribers.size === 0) {
      window.removeEventListener('resize', handleSkillCardViewportChange);

      if (skillCardViewportAnimationFrame !== null) {
        window.cancelAnimationFrame(skillCardViewportAnimationFrame);
        skillCardViewportAnimationFrame = null;
      }
    }
  };
}

function handleSkillCardViewportChange() {
  if (skillCardViewportAnimationFrame !== null) {
    return;
  }

  skillCardViewportAnimationFrame = window.requestAnimationFrame(() => {
    skillCardViewportAnimationFrame = null;

    skillCardViewportSubscribers.forEach((subscriber) => {
      subscriber();
    });
  });
}

function getSkillCardViewportSnapshot() {
  return typeof window === 'undefined' ? null : window.innerWidth;
}

function getSkillCardServerSnapshot() {
  return null;
}
