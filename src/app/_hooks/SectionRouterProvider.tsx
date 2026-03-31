'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { useSectionRouter } from '@/hooks/useSectionRouter';

type SectionRouterContext = {
  activeId: string;
  navigateTo: (sectionId: string) => void;
};

const Ctx = createContext<SectionRouterContext>({
  activeId: 'home',
  navigateTo: () => {},
});

export function useSectionNav() {
  return useContext(Ctx);
}

export function SectionRouterProvider({ children }: { children: ReactNode }) {
  const { navigateTo, activeListeners, activeIdRef } = useSectionRouter();
  const [activeId, setActiveId] = useState('home');

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
