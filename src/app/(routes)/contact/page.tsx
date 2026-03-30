import type { Metadata } from 'next';
import { HomeSections } from '@/components/HomeSections';
import { ScrollToSection } from '@/components/ScrollToSection';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch — currently open to freelance opportunities and technical consultations.',
};

export default function ContactPage() {
  return (
    <main>
      <HomeSections />
      <ScrollToSection sectionId="contact" />
    </main>
  );
}
