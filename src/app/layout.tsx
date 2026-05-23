import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import Providers from './Providers';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SITE_METADATA } from '@/utils/constants';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-headline',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: {
    default: SITE_METADATA.defaultTitle,
    template: SITE_METADATA.titleTemplate,
  },
  description: SITE_METADATA.description,
  robots: SITE_METADATA.robots,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="bg-surface font-body text-on-surface">
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
