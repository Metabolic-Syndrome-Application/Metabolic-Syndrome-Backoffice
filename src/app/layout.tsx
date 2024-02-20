import { IBM_Plex_Sans_Thai } from '@next/font/google';
import { Metadata } from 'next';
import * as React from 'react';
import { Suspense } from 'react';

import '@/styles/globals.css';
import '@/styles/colors.css';

import NavbarLayout from '@/components/layout/layout';
import NextAuthProviders from '@/components/login/NextAuthProviders';

import Loading from '@/app/loading';
import { siteConfig } from '@/constant/config';
import ReduxProvider from '@/redux/Provider';

//👇 Configure our local font object

const IBMPlexSansThai = IBM_Plex_Sans_Thai({
  weight: ['100', '400', '500', '700'],
  subsets: ['thai'],
  variable: '--font-ibm',
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  // !STARTERCONF this is the default favicon, you can generate your own from https://realfavicongenerator.net/
  // ! copy to /favicon folder
  icons: {
    // icon: '/favicon/favicon.ico',
    // shortcut: '/favicon/favicon-16x16.png',
    icon: '/favicon/logo.svg',
    shortcut: '/favicon/logo.svg',
    apple: '/favicon/logo.svg',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/assets/icons/logo.svg`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/assets/icons/logo.svg`],
    // creator: '@th_clarence',
  },
  // authors: [
  //   {
  //     name: 'Theodorus Clarence',
  //     url: 'https://theodorusclarence.com',
  //   },
  // ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={`${IBMPlexSansThai.variable}`}
      suppressHydrationWarning={true}
    >
      <body>
        <div className=''>
          <NextAuthProviders>
            <Suspense fallback={<Loading />}>
              <NavbarLayout>
                {/* <SignInButton /> */}
                <ReduxProvider>{children}</ReduxProvider>
              </NavbarLayout>
            </Suspense>
          </NextAuthProviders>
        </div>
      </body>
    </html>
  );
}
