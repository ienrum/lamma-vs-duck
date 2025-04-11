import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Providers from '@/src/app/provider/tanstack-query.provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Lamma vs Duck - Match the Animals!',
  description: 'Match the number of 🦙lamas and 🦆ducks on the board! Use arrow keys to move rows and columns.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Lamma vs Duck - Match the Animals!',
    description: 'Match the number of 🦙lamas and 🦆ducks on the board! Use arrow keys to move rows and columns.',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Lamma vs Duck Game',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lamma vs Duck - Match the Animals!',
    description: 'Match the number of 🦙lamas and 🦆ducks on the board! Use arrow keys to move rows and columns.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
