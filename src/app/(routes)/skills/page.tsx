import { Layout } from '@/sections/Layout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skills',
  description:
    'Frontend architecture, UI engineering, DX tooling, testing, experimentation, performance, and CMS delivery skills.',
};

export default function SkillsPage() {
  return <Layout scrollToId="skills" />;
}
