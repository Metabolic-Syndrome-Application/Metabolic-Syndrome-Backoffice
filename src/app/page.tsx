import { IBM_Plex_Sans_Thai } from "next/font/google";
import Head from 'next/head';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import * as React from 'react';

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

// const inter = Inter({
//   subsets: ['latin'],
//   variable: '--font--inter',
//   weight: '100'
// });
const IBMPlexSansThai = IBM_Plex_Sans_Thai({
  weight: ['100', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-ibm',
});

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default async function HomePage() {

  // const { data: session } = useSession()
  // const router = useRouter()

  // if (session) {
  //   router.replace('/dashboard')
  //   return null
  // }
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
