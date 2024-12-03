import { Inter } from 'next/font/google';

import type { Metadata } from 'next';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const firstJobDate = new Date('2018-07-15');

export function generateMetadata(): Metadata {
  const today = new Date();
  const diff = +today - +firstJobDate;
  // Years of experience = diff / year in ms
  const yoe = Math.floor(diff / (60 * 60 * 24 * 360 * 1000));

  return {
    title: 'Hector J. Vasquez - Software Engineer',
    description:
      'Hector J. Vasquez is a Software Engineer from Mexico, ' +
      `having ${yoe}+ years of experience working remotely for US companies`,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
