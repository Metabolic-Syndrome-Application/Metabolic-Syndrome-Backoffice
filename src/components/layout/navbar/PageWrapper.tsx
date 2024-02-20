import { ReactNode } from 'react';

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className='flex flex-grow flex-col space-y-2 bg-[#F9F9F9] px-4 pb-4 pt-2'>
      {children}
    </div>
  );
}
