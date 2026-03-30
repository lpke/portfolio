'use client';

import { SectionRouterProvider } from '@/hooks/SectionRouterProvider';

// To be used for any global app state/context
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SectionRouterProvider>
      {children}
    </SectionRouterProvider>
  );
}
