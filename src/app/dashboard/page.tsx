'use client';

import Head from 'next/head';

import Hero from '@/app/threeD/components/Hero';

export default function DashboardPage() {
  return (
    <main>
      <Head>
        <title>Hi</title>
      </Head>
      <section className='p-4'>
        <div className='w-full'>
          <Hero></Hero>
          {/* <HomeHero /> */}
          {/* <HomeGallery /> */}
        </div>
      </section>
    </main>
  );
}
