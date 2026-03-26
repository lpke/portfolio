import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { ContactSection } from './_sections/ContactSection';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch — currently open to freelance opportunities and technical consultations.',
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 pt-32 pb-24 md:px-8">
      <PageHero
        title={
          <>
            Let&apos;s <span className="text-primary">Connect</span>
          </>
        }
        subtitle="Currently open to freelance opportunities and technical consultations. Usually responds within 24 hours."
      />
      <ContactSection />
    </main>
  );
}
