import type { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
};

/** Surface-container card with ghost border and optional hover effect */
export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`ghost-border bg-surface-container rounded-lg p-8 ${
        hover
          ? 'hover:bg-surface-container-high transition-all duration-300 hover:-translate-y-1'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
