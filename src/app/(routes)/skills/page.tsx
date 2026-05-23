import { Layout } from '@/sections/Layout';
import { PAGE_METADATA, SECTION_IDS } from '@/utils/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: PAGE_METADATA.skills.title,
  description: PAGE_METADATA.skills.description,
};

export default function SkillsPage() {
  return <Layout scrollToId={SECTION_IDS.skills} />;
}
