import { useSession } from 'next-auth/react';

import { SIDENAV_ITEMS } from '@/components/layout/navbar/ConstantsNav';

export const useSideNavbar = () => {
  const { data: session, status } = useSession();

  //get user role
  const userRole = session?.user?.role;

  const customRoleNav = SIDENAV_ITEMS.filter((item) => {
    if (status !== 'authenticated') {
      return item.path === '/auth/signIn';
    }

    switch (userRole) {
      case 'admin':
        return (
          item.path === '/' ||
          item.path === '/dashboard' ||
          item.role === 'admin' ||
          item.role === 'allRole'
        );
      case 'doctor':
        return (
          item.path === '/' ||
          item.path === '/dashboard' ||
          item.role === 'doctor' ||
          item.path.startsWith('/patient') ||
          item.path === '/plan' ||
          item.path === '/challenge' ||
          item.role === 'allRole'
        );
      case 'staff':
        return (
          item.path === '/' ||
          item.path === '/dashboard' ||
          item.role === 'staff' ||
          // item.role === 'doctor,staff' ||
          item.path.startsWith('/patient') ||
          item.path === '/plan' ||
          item.path === '/challenge' ||
          item.role === 'allRole'
        );
      default:
        return item.path === '/'; // Default case, show the home page for authenticated users
    }
  });
  return customRoleNav;
};
