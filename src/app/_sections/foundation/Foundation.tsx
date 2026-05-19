import { FOUNDATION_CONTENT } from '@/utils/constants';

export function Foundation() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Left Column — Intro + Code Block */}
          <div className="lg:col-span-1">
            <h2 className="font-headline mb-6 text-3xl font-black tracking-tight text-white">
              {FOUNDATION_CONTENT.heading[0]}
              <br />
              {FOUNDATION_CONTENT.heading[1]}
            </h2>
            <p className="text-on-surface-variant mb-8">
              {FOUNDATION_CONTENT.intro}
            </p>

            {/* Terminal Block */}
            <div className="ghost-border bg-surface-container-highest rounded-xl p-6">
              <pre className="text-tertiary font-mono text-[13px] leading-relaxed">
                {FOUNDATION_CONTENT.codeSnippet.split('\n').map((line, i) => (
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
            {FOUNDATION_CONTENT.skills.map(({ icon, title, description }) => (
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
