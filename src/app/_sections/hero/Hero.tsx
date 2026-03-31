import { SectionLink } from '@/components/SectionLink';
import { ToolsBar } from './components/ToolsBar';
import { RequestResumeButton } from './components/RequestResumeButton';

export function Hero() {
  return (
    <section id="home" className="hero-waves relative flex min-h-200 items-center overflow-hidden px-8 pt-24">
      <div className="mx-auto w-full max-w-7xl">
        {/* Copy */}
        <div className="relative z-10 max-w-2xl">
          <h1 className="font-headline mb-4 text-6xl leading-none font-black tracking-tighter text-white md:text-8xl">
            LUKE
            <br />
            <span className="text-primary italic">PERICH</span>
          </h1>

          <h2 className="font-headline text-on-surface-variant mb-10 text-3xl font-bold">
            Senior Software Engineer
          </h2>

          <p className="text-on-surface-variant mb-8 max-w-lg text-lg leading-relaxed opacity-70">
            Commerce graduate who turned to the nerd side. I build frontend
            apps, the systems that ship them, and the tools that help write
            them. When not coding, I&apos;m training — calisthenics and
            competitive swimming.
          </p>

          {/* Tools Bar */}
          <ToolsBar />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-start gap-4">
          <SectionLink
            to="contact"
            className="signature-gradient font-headline text-on-primary rounded-full px-8 py-4 font-bold transition-all hover:shadow-[0_0_20px_rgba(123,208,255,0.4)]"
          >
            Contact Me
          </SectionLink>
          <RequestResumeButton />
        </div>
      </div>

      {/* Background Decorative Blurs */}
      <div className="bg-primary/10 pointer-events-none absolute top-1/4 -right-20 h-96 w-96 rounded-full blur-[120px]" />
      <div className="bg-tertiary/10 pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full blur-[100px]" />
    </section>
  );
}

