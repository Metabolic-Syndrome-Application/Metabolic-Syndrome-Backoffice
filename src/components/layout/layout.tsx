'use client';
import HeaderMobile from '@/components/layout/navbar/HeaderMobile';
import HeaderNav from '@/components/layout/navbar/HeaderNav';
import MarginWidthWrapper from '@/components/layout/navbar/MarginWidthWrapper';
import PageWrapper from '@/components/layout/navbar/PageWrapper';
import SideNav from '@/components/layout/navbar/SideNav';
import { ReactNode, useState } from 'react';

const NavbarLayout = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className='flex'>
      <SideNav open={open} setOpen={setOpen} />

      <main className='flex-1'>
        <MarginWidthWrapper mlSize={open ? 'md:ml-72' : 'md:ml-24'}>
          <HeaderNav />
          <HeaderMobile />
          <PageWrapper>{children}</PageWrapper>
        </MarginWidthWrapper>
      </main>
    </div>
  );
};

export default NavbarLayout;
