import { IBM_Plex_Sans_Thai } from 'next/font/google';
import Head from 'next/head';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import * as React from 'react';

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

const IBMPlexSansThai = IBM_Plex_Sans_Thai({
  weight: ['100', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-ibm',
});

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  if (session) {
    redirect('/dashboard');
  }

  return (
    <main className={`${IBMPlexSansThai.variable}`}>
      <Head>
        <title>Login Page</title>
      </Head>
      <section>
        <h1>Login Page</h1>
      </section>
    </main>
  );
}
