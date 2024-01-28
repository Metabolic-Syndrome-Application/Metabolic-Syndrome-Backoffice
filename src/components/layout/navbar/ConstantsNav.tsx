import { Icon } from '@iconify/react';

import { SideNavItem } from '@/types/navbar';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'หน้าหลัก',
    path: '/',
    icon: <Icon icon='material-symbols:dashboard' width='26' height='26' />,
    role: 'allRole',
  },
  {
    title: 'จัดการข้อมูลผู้ใช้',
    path: '/admin',
    icon: (
      <Icon icon='material-symbols:manage-accounts' width='26' height='26' />
    ),
    role: 'admin',
  },
  {
    title: 'ข้อมูลหมอ',
    path: '/doctor',
    icon: <Icon icon='healthicons:doctor-male' width='27' height='27' />,
    role: 'doctor',
  },
  {
    title: 'ข้อมูลพยาบาล',
    path: '/staff',
    icon: <Icon icon='fa-solid:user-nurse' width='26' height='26' />,
    role: 'staff',
  },
  {
    title: 'ข้อมูลคนไข้',
    path: '/patient',
    icon: <Icon icon='bxs:user' width='26' height='26' />,
    role: 'doctor,staff',
    gap: true,
  },

  {
    title: 'แผนสุขภาพ',
    path: '/plan',
    icon: <Icon icon='icon-park-solid:plan' width='24' height='24' />,
    submenu: true,
    subMenuItems: [
      { title: 'All', path: '/manage-users' },
      { title: 'Web Design', path: '/projects/web-design' },
      { title: 'Graphic Design', path: '/projects/graphic-design' },
    ],
    role: 'doctor',
  },
  {
    title: 'client',
    path: '/client',
    icon: <Icon icon='octicon:goal-16' width='26' height='26' />,
  },
  {
    title: 'เข้าสู่ระบบ',
    path: '/auth/signIn',
    icon: <Icon icon='basil:login-solid' width='26' height='26' />,
  },
  {
    title: 'ออกจากระบบ',
    path: '/api/auth/signout',
    icon: <Icon icon='basil:logout-solid' width='26' height='26' />,
    role: 'allRole',
  },
];
