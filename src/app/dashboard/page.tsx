'use client';

import Head from 'next/head';

import Hero from '@/app/threeD/components/Hero';

export default function DashboardPage() {
  return (
    <main>
      <Head>
        <title>Dashboard</title>
      </Head>
      <section>
        <div className='w-full'>
          <Hero />
          {/* <HomeHero /> */}
          {/* <HomeGallery /> */}
        </div>
      </section>
    </main>
  );
}
