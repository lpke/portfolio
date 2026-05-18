import { SectionLink } from '@/components/SectionLink';
import { ToolsBar } from './components/ToolsBar';
import { RequestResumeButton } from './components/RequestResumeButton';

export function Hero() {
  return (
    <section
      id="home"
      className="hero-waves relative flex min-h-200 items-center overflow-hidden px-5 md:px-8 md:pt-24"
    >
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
            scrollTargetId="contact-card-first"
            className="signature-gradient font-headline text-on-primary rounded-full px-8 py-4 font-bold transition-all hover:shadow-[0_0_20px_rgba(123,208,255,0.4)]"
          >
            Contact Me
          </SectionLink>
          <RequestResumeButton />
        </div>
      </div>

      {/* Background Decorative Glow — static radial gradient instead of
         an expensive CSS blur filter that tanks mobile GPU performance.
         Center is offset left+down so the visible portion forms a nice
         crescent clipped by the section boundary. */}
      <div
        className="pointer-events-none absolute -bottom-20 -left-20 h-[28rem] w-[28rem] rounded-full"
        style={{
          background:
            'radial-gradient(circle at 35% 65%, rgba(60,221,199,0.07) 0%, rgba(60,221,199,0.03) 40%, transparent 70%)',
        }}
      />
    </section>
  );
}
