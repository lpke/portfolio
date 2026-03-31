import { Layout } from '@/sections/Layout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What I Do',
  description:
    'Areas of specialisation — frontend architecture, DX tooling, testing, performance, and more.',
};

export default function WhatIDoPage() {
  return <Layout scrollToId="what-i-do" />;
}
