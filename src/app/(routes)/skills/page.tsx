import { Layout } from '@/sections/Layout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skills',
  description:
    'Product engineering, AI automation, code architecture, developer tooling, shipping, testing, and technical strategy skills.',
};

export default function SkillsPage() {
  return <Layout scrollToId="skills" />;
}
