'use client';

import { useEffect } from 'react';

/**
 * Scrolls the page to the given section ID on mount.
 * Used by the route pages (e.g. /experience) so that landing
 * on the URL goes straight to the correct section.
 */
export function ScrollToSection({ sectionId }: { sectionId: string }) {
  useEffect(() => {
    const el = document.getElementById(sectionId);
    if (el) {
      // Instant scroll on initial load — smooth would be jarring for a
      // fresh page load since the user hasn't scrolled yet.
      el.scrollIntoView({ behavior: 'instant' });
    }
  }, [sectionId]);

  return null;
}
