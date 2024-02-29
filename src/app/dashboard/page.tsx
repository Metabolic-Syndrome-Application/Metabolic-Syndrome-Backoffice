
"use client"

import HomeGallery from "@/components/home/HomeGallery";
import HomeHero from "@/components/home/HomeHero";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/navigation";

export default function DashboardPage() {

  const { data: session } = useSession()
  const router = useRouter()


  return (
    <main>
      <Head>
        <title>Hi</title>
      </Head>
      <section className=''>
        <div className='w-full'>


          <HomeHero />
          <HomeGallery />

        </div>
      </section>
    </main>
  );
}