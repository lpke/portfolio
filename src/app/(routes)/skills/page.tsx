import { Layout } from '@/sections/Layout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skills',
  description:
    'A specialized toolkit focused on building resilient architecture and fluid user experiences.',
};

export default function SkillsPage() {
  return <Layout scrollToId="skills" />;
}
