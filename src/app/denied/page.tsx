import { Metadata } from 'next';
import * as React from 'react';
import { PiWarningFill } from 'react-icons/pi';

export const metadata: Metadata = {
  title: 'Denied',
};

export default function Denied() {
  return (
    <main>
      <section className='bg-white'>
        <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
          <PiWarningFill
            size={60}
            className='drop-shadow-glow animate-flicker text-orange-500'
          />
          <h1 className='mt-8 text-4xl md:text-6xl'>Access Denied</h1>
          <a href='/'>Back to home</a>
        </div>
      </section>
    </main>
  );
}
