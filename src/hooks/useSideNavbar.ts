import { useSession } from 'next-auth/react';

import { SIDENAV_ITEMS } from '@/components/navbar/ConstantsNav';

export const useSideNavbar = () => {
  const { data: session, status } = useSession();

  // Assuming user role is stored in session.user.role
  const userRole = session?.user?.role;

  const customRoleNav = SIDENAV_ITEMS.filter((item) => {
    if (status !== 'authenticated') {
      return item.path === '/auth/signIn' || item.path === '/';
    }

    switch (userRole) {
      case 'admin':
        return (
          item.path === '/' || item.role === 'admin' || item.role === 'allRole'
        );
      case 'doctor':
        return (
          item.path === '/' ||
          item.role === 'doctor' ||
          item.path.startsWith('/patient') ||
          item.path === '/plan' ||
          item.role === 'allRole'
        );
      case 'staff':
        return (
          item.path === '/' ||
          item.role === 'staff' ||
          item.role === 'doctor,staff' ||
          // item.path.startsWith('/patient') ||
          item.path === '/plan' ||
          item.role === 'allRole'
        );
      default:
        return item.path === '/'; // Default case, show the home page for authenticated users
    }
  });
  return customRoleNav;
};
