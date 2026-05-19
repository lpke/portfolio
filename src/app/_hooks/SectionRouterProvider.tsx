'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { useSectionRouter } from '@/hooks/useSectionRouter';
import { DEFAULT_SECTION_ID } from '@/utils/constants';

type SectionRouterContext = {
  activeId: string;
  navigateTo: (sectionId: string, scrollTargetId?: string) => void;
};

const Ctx = createContext<SectionRouterContext>({
  activeId: DEFAULT_SECTION_ID,
  navigateTo: () => {},
});

export function useSectionNav() {
  return useContext(Ctx);
}

export function SectionRouterProvider({ children }: { children: ReactNode }) {
  const { navigateTo, activeListeners, activeIdRef } = useSectionRouter();
  const [activeId, setActiveId] = useState<string>(DEFAULT_SECTION_ID);

  useEffect(() => {
    // Copy ref value so the cleanup function sees the same Set
    const listeners = activeListeners.current;

    // Subscribe to activeId changes from the IntersectionObserver
    const listener = (id: string) => setActiveId(id);
    listeners.add(listener);

    // Seed with the current value
    setActiveId(activeIdRef.current);

    return () => {
      listeners.delete(listener);
    };
  }, [activeListeners, activeIdRef]);

  return (
    <Ctx.Provider value={{ activeId, navigateTo }}>{children}</Ctx.Provider>
  );
}
