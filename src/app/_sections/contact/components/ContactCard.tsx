'use client';

import Image from 'next/image';
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

  const handleCopy = useCallback(() => {
    if (!copyContent) return;
    navigator.clipboard.writeText(copyContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [copyContent]);

  const content = (
    <>
      <div className="text-primary flex h-11 w-11 shrink-0 items-center justify-center">
        <Image
          src={iconSrc}
          alt=""
          width={20}
          height={20}
          className="h-5.5 w-5.5 drop-shadow-[0_3px_5px_rgba(0,0,0,0.35)]"
        />
      </div>
      <div className="min-w-0 flex-1 text-left">
        <p className="font-label text-on-surface-variant/70 text-xs tracking-widest uppercase">
          {label}
        </p>
        <p className="font-headline truncate text-base font-bold text-white">
          {value}
        </p>
      </div>
    </>
  );

  return (
    <div
      className="group/contact-card bg-surface-container-low/80 relative overflow-hidden rounded-md shadow-[0_14px_32px_rgba(0,0,0,0.18)] ring-1 ring-white/10 ring-inset transition-shadow duration-200 hover:shadow-[0_18px_40px_rgba(0,0,0,0.22)] hover:ring-white/20"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-white/[0.08] opacity-0 transition-opacity duration-200 group-hover/contact-card:opacity-100"
      />
      {href ? (
        <a
          href={href}
          target={href.startsWith('mailto') ? undefined : '_blank'}
          rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
          className={`focus-visible:ring-primary/35 relative flex min-w-0 items-center gap-4 px-5 py-4 outline-none focus-visible:ring-2 ${
            copyContent ? 'pr-28' : ''
          }`}
        >
          {content}
        </a>
      ) : (
        <div
          className={`relative flex min-w-0 items-center gap-4 px-5 py-4 ${
            copyContent ? 'pr-28' : ''
          }`}
        >
          {content}
        </div>
      )}

      {copyContent && (
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? `${label} copied` : `Copy ${label}`}
          className="text-on-surface-variant hover:text-primary hover:bg-primary/8 focus-visible:text-primary focus-visible:bg-primary/10 focus-visible:ring-primary/35 absolute top-0 right-0 bottom-0 flex w-24 cursor-pointer items-center justify-center text-sm font-semibold transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
        >
          <span
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-0 w-px bg-white/5 opacity-0 transition-opacity duration-200 group-hover/contact-card:opacity-100"
          />
          <span
            className={`absolute inset-0 flex items-center justify-center gap-1 transition-opacity duration-200 ${
              copied
                ? 'opacity-0'
                : 'opacity-0 group-hover/contact-card:opacity-100'
            }`}
          >
            <CopyIcon className="h-3.5 w-3.5" />
            Copy
          </span>
          <span
            aria-live="polite"
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
              copied ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Copied
          </span>
        </button>
      )}
    </div>
  );
}
