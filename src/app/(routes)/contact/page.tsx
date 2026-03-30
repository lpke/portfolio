import { Layout } from '@/_sections/Layout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch — currently open to freelance opportunities and technical consultations.',
};

export default function ContactPage() {
  return <Layout scrollToId="contact" />;
}
