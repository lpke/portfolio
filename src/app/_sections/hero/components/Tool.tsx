type ToolProps = {
  label: string;
  icon: React.ReactNode;
};

/** Single tool item displayed in the horizontal scrolling ToolsBar */
export function Tool({ label, icon }: ToolProps) {
  return (
    <div className="flex shrink-0 select-none items-center gap-2 px-4" draggable={false}>
      <span className="text-primary text-base">{icon}</span>
      <span className="font-mono text-on-surface-variant whitespace-nowrap text-sm">
        {label}
      </span>
    </div>
  );
}
