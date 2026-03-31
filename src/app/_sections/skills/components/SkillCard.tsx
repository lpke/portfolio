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
        className={`ghost-border group bg-surface-container relative flex h-full flex-col rounded-lg p-6 transition-all duration-300 ${
          isClickable
            ? 'hover:bg-surface-container-high cursor-pointer hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]'
            : ''
        }`}
      >
        {/* Icon */}
        <div className="bg-primary/10 text-primary mb-5 flex h-10 w-10 items-center justify-center rounded-lg">
          {getSkillIcon(skill.iconKey)}
        </div>

        {/* Expand icon — top-right, visible on hover */}
        {isClickable && (
          <span className="text-primary absolute top-5 right-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <ExpandIcon />
          </span>
        )}

        {/* Title */}
        <h3 className="font-headline mb-2 text-lg font-bold text-white">
          {skill.title}
        </h3>

        {/* Summary */}
        <p className="text-on-surface-variant mb-4 flex-1 text-sm leading-relaxed">
          {skill.summary}
        </p>

        {/* Hover CTA */}
        {isClickable && (
          <span className="font-label text-primary mt-auto text-xs font-bold tracking-widest uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            View Details →
          </span>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <SkillDetailModal skill={skill} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
