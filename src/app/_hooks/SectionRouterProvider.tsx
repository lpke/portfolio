'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { useSectionRouter } from '@/hooks/useSectionRouter';

interface SectionRouterContext {
  activeId: string;
  navigateTo: (sectionId: string) => void;
}

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
    // Subscribe to activeId changes from the IntersectionObserver
    const listener = (id: string) => setActiveId(id);
    activeListeners.current.add(listener);

    // Seed with the current value
    setActiveId(activeIdRef.current);

    return () => {
      activeListeners.current.delete(listener);
    };
  }, [activeListeners, activeIdRef]);

  return (
    <Ctx.Provider value={{ activeId, navigateTo }}>
      {children}
    </Ctx.Provider>
  );
}
