import { IBM_Plex_Sans_Thai } from '@next/font/google';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import * as React from 'react';

import '@/styles/globals.css';
import '@/styles/colors.css';

import NextAuthProviders from '@/components/login/NextAuthProviders';
import SignInButton from '@/components/login/SignInButton';
import HeaderMobile from '@/components/navbar/HeaderMobile';
import HeaderNav from '@/components/navbar/HeaderNav';
import MarginWidthWrapper from '@/components/navbar/MarginWidthWrapper';
import PageWrapper from '@/components/navbar/PageWrapper';
import SideNav from '@/components/navbar/SideNav';

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { siteConfig } from '@/constant/config';

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
    icon: '/assets/icons/logo.svg',
    shortcut: '/assets/icons/logo.svg',
    apple: '/assets/icons/logo.svg',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/og.jpg`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og.jpg`],
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
  const session = await getServerSession(authOptions);

  return (
    <html
      lang='en'
      className={`${IBMPlexSansThai.variable}`}
      //suppressHydrationWarning={true}
    >
      <body className='bg-[#FAFCFB]'>
        <div className=''>
          <NextAuthProviders>
            <SideNav />
            {/* <TestNav2 /> */}
            <main className='flex-1'>
              <MarginWidthWrapper>
                <HeaderNav />
                <HeaderMobile />
                <PageWrapper>
                  {/* <SignInButton /> */}
                  {children}
                </PageWrapper>
              </MarginWidthWrapper>
            </main>

            {/* <TestNav /> */}
            {/* <div>
              <SignInButton />
              {children}
            </div> */}
          </NextAuthProviders>
        </div>
      </body>
    </html>
  );
}
