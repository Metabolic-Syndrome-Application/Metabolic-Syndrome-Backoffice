
"use client"

import Head from "next/head";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Hero from "@/app/threeD/components/Hero";

export default function DashboardPage() {

  const { data: session } = useSession()
  const router = useRouter()


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