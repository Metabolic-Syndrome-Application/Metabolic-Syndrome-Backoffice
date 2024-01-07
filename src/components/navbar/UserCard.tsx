import { IUser } from '@/types/user';

type Props = {
  user: IUser;
  pagetype: string;
};

export default function Card({ user, pagetype }: Props) {
  //console.log(user)

  const greeting = user?.user.username ? (
    <div className='flex flex-col items-center rounded-lg bg-white p-6 text-5xl font-bold text-black'>
      Hello {user?.user.username}!
    </div>
  ) : null;

  // const emailDisplay = user?.email ? (
  //     <div className="flex flex-col items-center p-6 bg-white rounded-lg font-bold text-5xl text-black">
  //         {user?.email}
  //     </div>
  // ) : null

  return (
    <section className='flex flex-col gap-4'>
      {greeting}
      {/* {emailDisplay} */}

      <p className='text-center text-2xl'>{pagetype} Page!</p>
      <p className='text-center text-2xl'>Role: {user?.user.role}</p>
    </section>
  );
}
