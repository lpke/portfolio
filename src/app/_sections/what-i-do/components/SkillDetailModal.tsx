'use client';

import { useEffect, useCallback, useRef } from 'react';
import type { SkillCardData } from '../data/skills';
import { getSkillIcon } from './SkillIcons';
import { TechTag } from '@/components/TechTag';

type SkillDetailModalProps = {
  skill: SkillCardData;
  onClose: () => void;
};

/**
 * Modal overlay for skill card details.
 * - Desktop: centred floating modal
 * - Mobile: slides up from the bottom with rounded top corners
 */
export function SkillDetailModal({ skill, onClose }: SkillDetailModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modal = skill.modal;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!modal) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm md:items-center"
      style={{ animation: 'fadeIn 0.15s ease-out' }}
    >
      <div
        className="bg-surface-container relative flex max-h-[90vh] w-full flex-col overflow-hidden rounded-t-2xl border border-white/10 shadow-2xl md:max-w-2xl md:rounded-2xl"
        style={{ animation: 'slideUp 0.25s ease-out' }}
      >
        {/* Header */}
        <div className="flex items-start gap-4 border-b border-white/5 px-6 pt-6 pb-5 md:px-8">
          <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
            {getSkillIcon(skill.iconKey)}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-headline text-2xl font-bold text-white">
              {skill.title}
            </h2>
            <p className="text-tertiary mt-1 text-sm">{modal.tagline}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-on-surface-variant/50 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close modal"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-6 md:px-8">
          {/* Competencies */}
          <h3 className="font-label text-on-surface-variant/50 mb-4 text-[10px] font-bold tracking-widest uppercase">
            Core Competencies
          </h3>
          <div className="mb-8 space-y-4">
            {modal.competencies.map((c) => (
              <div key={c.label} className="flex gap-3">
                <span className="bg-tertiary mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                <div>
                  <p className="text-sm font-bold text-white">{c.label}</p>
                  <p className="text-on-surface-variant mt-0.5 text-sm leading-relaxed">
                    {c.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Highlights */}
          <div className="bg-surface-container-low mb-8 grid grid-cols-3 gap-4 rounded-lg border border-white/5 p-5">
            {modal.highlights.map((h) => (
              <div key={h.label} className="text-center">
                <p className="font-headline text-primary text-xl font-bold">
                  {h.value}
                </p>
                <p className="font-label text-on-surface-variant/50 mt-1 text-[10px] font-bold tracking-widest uppercase">
                  {h.label}
                </p>
              </div>
            ))}
          </div>

          {/* Tags */}
          <h3 className="font-label text-on-surface-variant/50 mb-3 text-[10px] font-bold tracking-widest uppercase">
            Integrated Ecosystem
          </h3>
          <div className="flex flex-wrap gap-2">
            {modal.tags.map((tag) => (
              <TechTag key={tag} variant="tool">
                {tag}
              </TechTag>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-white/5 px-6 py-4 md:px-8">
          <button
            type="button"
            onClick={onClose}
            className="font-headline text-on-surface-variant/60 text-sm font-bold transition-colors hover:text-white"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
