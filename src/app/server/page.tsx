import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';

import UserCard from '@/components/navbar/UserCard';

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export default async function ServerPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/server');
  }

  return (
    <section className='flex flex-col gap-6'>
      <UserCard user={session?.user} pagetype="Server" />
    </section>
  );
}
