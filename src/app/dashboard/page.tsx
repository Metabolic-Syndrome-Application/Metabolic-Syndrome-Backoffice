'use client';

import Head from 'next/head';

import DashboardSection from '@/app/dashboard/components/DashboardSection';

export default function DashboardPage() {
  return (
    <main>
      <Head>
        <title>Dashboard</title>
      </Head>

      <div className='w-full'>
        <DashboardSection />
      </div>
    </main>
  );
}
