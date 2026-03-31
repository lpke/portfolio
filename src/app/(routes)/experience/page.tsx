import { Layout } from '@/sections/Layout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'A chronological mapping of my technical journey — architectural precision, scalable systems, and engineering leadership.',
};

export default function ExperiencePage() {
  return <Layout scrollToId="experience" />;
}
