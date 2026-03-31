'use client';

import { useState } from 'react';
import type { SkillCardData } from '../data/skills';
import { getSkillIcon, ExpandIcon } from './SkillIcons';
import { SkillDetailModal } from './SkillDetailModal';

type SkillCardProps = {
  skill: SkillCardData;
};

/**
 * Card component for the "What I Do" section.
 *
 * - Displays an icon, title, and summary.
 * - If `hasModal` is true, the card is interactive: hover reveals
 *   "View Details →" text and an expand icon, and clicking opens
 *   the detail modal.
 */
export function SkillCard({ skill }: SkillCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isClickable = skill.hasModal;

  return (
    <>
      <div
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onClick={() => isClickable && setIsModalOpen(true)}
        onKeyDown={(e) => {
          if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            setIsModalOpen(true);
          }
        }}
        className={`ghost-border group relative flex h-full flex-col rounded-lg bg-surface-container p-6 transition-all duration-300 ${
          isClickable
            ? 'cursor-pointer hover:-translate-y-1 hover:bg-surface-container-high hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]'
            : ''
        }`}
      >
        {/* Icon */}
        <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {getSkillIcon(skill.iconKey)}
        </div>

        {/* Expand icon — top-right, visible on hover */}
        {isClickable && (
          <span className="absolute top-5 right-5 text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <ExpandIcon />
          </span>
        )}

        {/* Title */}
        <h3 className="font-headline mb-2 text-lg font-bold text-white">
          {skill.title}
        </h3>

        {/* Summary */}
        <p className="mb-4 flex-1 text-sm leading-relaxed text-on-surface-variant">
          {skill.summary}
        </p>

        {/* Hover CTA */}
        {isClickable && (
          <span className="mt-auto font-label text-xs font-bold uppercase tracking-widest text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            View Details →
          </span>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <SkillDetailModal
          skill={skill}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
