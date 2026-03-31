import { PageHero } from '@/components/PageHero';
import { ContactContent } from './components/ContactContent';

export function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-7xl px-6 pt-32 pb-24 md:px-8"
    >
      <PageHero
        title={
          <>
            Let&apos;s <span className="text-primary">Connect</span>
          </>
        }
        subtitle="Currently open to freelance opportunities and technical consultations. Usually responds within 24 hours."
      />
      <ContactContent />
    </section>
  );
}
