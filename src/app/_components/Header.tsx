import Link from 'next/link';
import { SITE } from '@/utils/constants';

export function Header() {
  return (
    <header className="glass-nav ambient-shadow fixed top-0 z-50 w-full">
      <nav className="mx-auto flex max-w-7xl items-center justify-center px-8 py-4">
        {/* Logo area */}
        <Link
          href="/"
          className="font-headline text-2xl font-black tracking-tighter text-white"
        >
          {SITE.name}
        </Link>
      </nav>
    </header>
  );
}

