const SKILLS = [
  {
    icon: '◇',
    title: 'Systems Architecture',
    description:
      'Designing modular monorepos and distributed frontend systems that handle scale with ease.',
  },
  {
    icon: '⚙',
    title: 'Build Tooling',
    description:
      'Customizing build pipelines and development environments to maximize team velocity.',
  },
  {
    icon: '◈',
    title: 'Frontend Excellence',
    description:
      'Pixel-perfect React interfaces crafted with performance and deep Type-safety.',
  },
  {
    icon: '🚀',
    title: 'CI/CD & Deployment',
    description:
      'Automated testing and delivery pipelines ensuring reliable and frequent releases.',
  },
] as const;

const CODE_SNIPPET = `const engineer = {
  philosophy: "DX First",
  stack: ["React", "TS"],
  performance: "Optimized"
};`;

export function Foundation() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Left Column — Intro + Code Block */}
          <div className="lg:col-span-1">
            <h2 className="font-headline mb-6 text-3xl font-black tracking-tight text-white">
              TECHNICAL
              <br />
              FOUNDATION
            </h2>
            <p className="text-on-surface-variant mb-8">
              My approach blends engineering rigor with creative problem solving
              to build future-proof software.
            </p>

            {/* Terminal Block */}
            <div className="ghost-border bg-surface-container-highest rounded-xl p-6">
              <pre className="text-tertiary font-mono text-[13px] leading-relaxed">
                {CODE_SNIPPET.split('\n').map((line, i) => (
                  <span key={i} className="block">
                    <span className="text-on-surface-variant/50 mr-3">
                      {i + 1}
                    </span>
                    {line}
                  </span>
                ))}
              </pre>
            </div>
          </div>

          {/* Right Column — Skill Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
            {SKILLS.map(({ icon, title, description }) => (
              <div
                key={title}
                className="group bg-surface-container hover:bg-surface-variant rounded-xl p-8 transition-colors"
              >
                <span className="text-primary mb-4 block text-2xl">{icon}</span>
                <h4 className="mb-2 text-lg font-bold text-white">{title}</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
