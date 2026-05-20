'use client';

import {
  useEffect,
  useState,
  useSyncExternalStore,
  type ComponentType,
} from 'react';
import { LAYOUT_CONFIG } from '@/utils/constants';

type SkillVariantProps = {
  withShell?: boolean;
};

type SkillVariant = 'mobile' | 'desktop';
type ViewportVariant = SkillVariant | null;
type SkillVariantComponent = ComponentType<SkillVariantProps>;
type LoadedSkillVariant = {
  variant: SkillVariant;
  Component: SkillVariantComponent;
};

const { mediaQueries } = LAYOUT_CONFIG;

const variantLoaders: Record<
  SkillVariant,
  () => Promise<SkillVariantComponent>
> = {
  mobile: () =>
    import('./AccordionIndexSkills').then((mod) => mod.MobileSkills),
  desktop: () =>
    import('./ImmersiveShowcaseSkills').then((mod) => mod.DesktopSkills),
};

const variantCache: Partial<
  Record<SkillVariant, Promise<SkillVariantComponent>>
> = {};

function loadSkillVariant(variant: SkillVariant) {
  const cached = variantCache[variant];

  if (cached) {
    return cached;
  }

  const next = variantLoaders[variant]();
  variantCache[variant] = next;

  return next;
}

function subscribeViewport(onStoreChange: () => void) {
  const query = window.matchMedia(mediaQueries.desktopSkills);
  query.addEventListener('change', onStoreChange);

  return () => {
    query.removeEventListener('change', onStoreChange);
  };
}

function getViewportSnapshot(): ViewportVariant {
  return window.matchMedia(mediaQueries.desktopSkills).matches
    ? 'desktop'
    : 'mobile';
}

function getServerSnapshot(): ViewportVariant {
  return null;
}

function useViewportVariant() {
  return useSyncExternalStore(
    subscribeViewport,
    getViewportSnapshot,
    getServerSnapshot,
  );
}

function SkillsVariantFallback() {
  return (
    <div
      aria-hidden
      className="ghost-border bg-skill-stage min-h-[42rem] lg:min-h-screen"
    />
  );
}

export function ResponsiveSkills() {
  const variant = useViewportVariant();
  const [loaded, setLoaded] = useState<LoadedSkillVariant | null>(null);

  useEffect(() => {
    if (variant === null) {
      return;
    }

    let active = true;

    void loadSkillVariant(variant).then((Component) => {
      if (active) {
        setLoaded({ variant, Component });
      }
    });

    return () => {
      active = false;
    };
  }, [variant]);

  if (variant === null || loaded?.variant !== variant) {
    return <SkillsVariantFallback />;
  }

  const { Component } = loaded;

  return <Component withShell={false} />;
}
