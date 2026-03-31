import { Layout } from '@/sections/Layout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Exploring the intersection of high-performance architecture and intuitive, fluid user interfaces.',
};

export default function ProjectsPage() {
  return <Layout scrollToId="projects" />;
}
