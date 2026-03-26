import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

/** Surface-container card with ghost border and optional hover effect */
export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`ghost-border rounded-lg bg-surface-container p-8 ${
        hover ? 'transition-all duration-300 hover:-translate-y-1 hover:bg-surface-container-high' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
