'use client';

import { useEffect } from 'react';
import { LAYOUT_CONFIG } from '@/utils/constants';

const MOBILE_QUERY = LAYOUT_CONFIG.mediaQueries.belowMd;
const HEIGHT_VAR = LAYOUT_CONFIG.cssVars.heroStableHeight;

function readViewportHeight() {
  return Math.round(window.visualViewport?.height ?? window.innerHeight);
}

export function StableHeroViewport() {
  useEffect(() => {
    const root = document.documentElement;
    const mobileQuery = window.matchMedia(MOBILE_QUERY);
    let trackedWidth = window.innerWidth;
    let orientationTimer: ReturnType<typeof setTimeout> | undefined;

    const setStableHeight = () => {
      if (!mobileQuery.matches) {
        root.style.removeProperty(HEIGHT_VAR);
        trackedWidth = window.innerWidth;
        return;
      }

      trackedWidth = window.innerWidth;
      root.style.setProperty(HEIGHT_VAR, `${readViewportHeight()}px`);
    };

    const handleResize = () => {
      if (!mobileQuery.matches) {
        setStableHeight();
        return;
      }

      const nextWidth = window.innerWidth;
      if (Math.abs(nextWidth - trackedWidth) > 1) {
        setStableHeight();
      }
    };

    const handleOrientationChange = () => {
      clearTimeout(orientationTimer);
      orientationTimer = setTimeout(
        setStableHeight,
        LAYOUT_CONFIG.motion.mobileOrientationSettleMs,
      );
    };

    setStableHeight();
    mobileQuery.addEventListener('change', handleResize);
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);
    window.visualViewport?.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(orientationTimer);
      root.style.removeProperty(HEIGHT_VAR);
      mobileQuery.removeEventListener('change', handleResize);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.visualViewport?.removeEventListener('resize', handleResize);
    };
  }, []);

  return null;
}
