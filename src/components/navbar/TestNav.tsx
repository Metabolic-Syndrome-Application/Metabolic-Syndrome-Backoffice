'use client';
// HeaderNav.tsx (or your navigation component)
import { useSession } from 'next-auth/react';

import AdminNavbar from '@/components/navbar/AdminNavbar';
import DefaultNavBar from '@/components/navbar/DefaultNavbar';

const TestNav = () => {
  const { data: session } = useSession();

  // Assuming user role is stored in session.user.role
  const userRole = session?.user?.role;

  // Render different navigation bars based on roles
  const renderNavBar = () => {
    if (userRole === 'admin') {
      return <AdminNavbar></AdminNavbar>;
      // } else if (userRole === 'doctor') {
      //   return <DoctorNavBar />;
    } else {
      return <DefaultNavBar />;
    }
  };

  return <>{renderNavBar()}</>;
};

export default TestNav;
