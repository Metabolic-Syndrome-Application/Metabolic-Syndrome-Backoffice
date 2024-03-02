'use client';
import { usePathname } from 'next/navigation';
import { ReactNode, useState } from 'react';

import HeaderMobile from '@/components/layout/navbar/HeaderMobile';
import HeaderNav from '@/components/layout/navbar/HeaderNav';
import MarginWidthWrapper from '@/components/layout/navbar/MarginWidthWrapper';
import PageWrapper from '@/components/layout/navbar/PageWrapper';
import SideNav from '@/components/layout/navbar/SideNav';

const NavbarLayout = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(true);
  const pathname = usePathname()

  //hide navbar & sidebar
  const isSignInPage = pathname === '/auth/signIn';

  return (
    <div className='w-full'>
      {!isSignInPage && <SideNav open={open} setOpen={setOpen} />}

      <main className='flex-1'>
        {!isSignInPage && (
          <MarginWidthWrapper mlSize={open ? 'md:ml-72' : 'md:ml-24'}>
            <HeaderNav />
            <HeaderMobile />
            <PageWrapper>{children}</PageWrapper>
          </MarginWidthWrapper>
        )}
        {isSignInPage && children}
      </main>
    </div>
  );
};

export default NavbarLayout;
