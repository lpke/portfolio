type ToolProps = {
  label: string;
  icon: React.ReactNode;
};

/** Single tool item displayed in the horizontal scrolling ToolsBar */
export function Tool({ label, icon }: ToolProps) {
  return (
    <div
      className="flex shrink-0 items-center gap-2 px-4 select-none"
      draggable={false}
    >
      <span className="text-primary text-base">{icon}</span>
      <span className="text-on-surface-variant font-mono text-sm whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}
