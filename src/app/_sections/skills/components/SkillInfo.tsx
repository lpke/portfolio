type SkillInfoProps = {
  id: string;
  title: string;
  titleMobile?: string;
  description: string;
  isSelected: boolean;
  onSelectAction: (id: string) => void;
};

function PlusIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function SkillInfo({
  id,
  title,
  titleMobile,
  description,
  isSelected,
  onSelectAction,
}: SkillInfoProps) {
  return (
    <button
      id={`skill-tab-${id}`}
      type="button"
      role="tab"
      aria-selected={isSelected}
      aria-controls="skills-showcase-panel"
      onClick={() => onSelectAction(id)}
      className={`group font-label flex min-h-12 max-w-full items-start gap-3 rounded-full px-4 py-3 text-left text-sm font-bold transition-[background-color,color,box-shadow,width,padding] duration-300 ease-out lg:rounded-lg ${
        isSelected
          ? 'bg-white/[0.13] text-white shadow-[0_18px_45px_rgba(0,0,0,0.24)] ring-1 ring-white/15 lg:min-h-[9.75rem] lg:w-full lg:px-5 lg:py-5'
          : 'text-on-surface-variant bg-surface-container-high/85 hover:bg-white/[0.10] hover:text-white lg:min-h-12 lg:w-fit lg:px-5 lg:py-3'
      }`}
    >
      <span
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
          isSelected
            ? 'bg-primary border-primary text-on-primary'
            : 'group-hover:border-primary group-hover:text-primary border-white/45 text-white'
        }`}
      >
        {isSelected ? (
          <span className="h-2.5 w-2.5 rounded-full bg-current" />
        ) : (
          <PlusIcon />
        )}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block leading-6 lg:hidden">
          {titleMobile ?? title}
        </span>
        <span className="hidden leading-6 lg:block">{title}</span>
        <span
          className={`hidden overflow-hidden text-sm leading-relaxed font-normal transition-[grid-template-rows,opacity,margin-top] duration-300 ease-out lg:grid ${
            isSelected
              ? 'mt-4 grid-rows-[1fr] opacity-100'
              : 'mt-0 grid-rows-[0fr] opacity-0'
          }`}
        >
          <span className="text-on-surface-variant block overflow-hidden">
            {description}
          </span>
        </span>
      </span>
    </button>
  );
}
