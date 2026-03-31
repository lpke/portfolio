'use client';

import { useState, useCallback } from 'react';

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      role="graphics-symbol"
      viewBox="1.37 0 13.25 16"
      fill="currentColor"
      className={className}
    >
      <path d="M3.25 1.375c-1.036 0-1.875.84-1.875 1.875v6c0 1.036.84 1.875 1.875 1.875h1.625v1.625c0 1.036.84 1.875 1.875 1.875h6c1.036 0 1.875-.84 1.875-1.875v-6c0-1.036-.84-1.875-1.875-1.875h-1.625V3.25c0-1.036-.84-1.875-1.875-1.875zM2.625 3.25c0-.345.28-.625.625-.625h6c.345 0 .625.28.625.625v1.625H6.75c-1.036 0-1.875.84-1.875 1.875v3.125H3.25a.625.625 0 0 1-.625-.625zm3.5 3.5c0-.345.28-.625.625-.625h6c.345 0 .625.28.625.625v6c0 .345-.28.625-.625.625h-6a.625.625 0 0 1-.625-.625z" />
    </svg>
  );
}

type ContactCardProps = {
  iconSrc: string;
  label: string;
  value: string;
  href: string | null;
  copyContent?: string | null;
};

export function ContactCard({
  iconSrc,
  label,
  value,
  href,
  copyContent,
}: ContactCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(
    (e: React.MouseEvent) => {
      if (!copyContent) return;
      e.preventDefault();
      e.stopPropagation();
      navigator.clipboard.writeText(copyContent).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      });
    },
    [copyContent],
  );

  const Wrapper = href ? 'a' : 'div';
  const linkProps = href
    ? {
        href,
        target: href.startsWith('mailto') ? undefined : ('_blank' as const),
        rel: href.startsWith('mailto')
          ? undefined
          : ('noopener noreferrer' as const),
      }
    : {};

  return (
    <Wrapper
      {...linkProps}
      className="group bg-surface-container-low hover:bg-surface-container flex items-center gap-6 rounded-lg p-4 transition-colors duration-300"
    >
      <div className="bg-surface-container text-primary relative flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 group-hover:bg-white/5">
        {copyContent ? (
          <>
            {/* Default icon — hidden on hover */}
            <img
              src={iconSrc}
              alt={label}
              className="h-5 w-5 transition-opacity duration-300 group-hover:opacity-0"
            />
            {/* Copy button — shown on hover */}
            <button
              type="button"
              onClick={handleCopy}
              aria-label={copied ? 'Copied!' : `Copy ${label}`}
              className="absolute inset-0 flex cursor-pointer items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              {copied ? (
                <span className="text-primary text-xs font-bold">✓</span>
              ) : (
                <CopyIcon className="text-primary h-4 w-4 transition-transform duration-300 group-hover:scale-125" />
              )}
            </button>
          </>
        ) : (
          <img src={iconSrc} alt={label} className="h-5 w-5" />
        )}
      </div>
      <div className="text-left">
        <p className="font-label text-on-surface-variant/50 text-[10px] tracking-widest uppercase">
          {label}
        </p>
        <p className="font-headline font-bold text-white">{value}</p>
      </div>
    </Wrapper>
  );
}
