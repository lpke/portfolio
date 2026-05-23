import { Layout } from '@/sections/Layout';
import { PAGE_METADATA, SECTION_IDS } from '@/utils/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: PAGE_METADATA.contact.title,
  description: PAGE_METADATA.contact.description,
};

export default function ContactPage() {
  return <Layout scrollToId={SECTION_IDS.contact} />;
}
