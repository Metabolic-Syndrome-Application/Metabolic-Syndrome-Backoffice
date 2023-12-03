import { Icon } from '@iconify/react';

import { SideNavItem } from '@/components/navbar/types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'หน้าหลัก',
    path: '/',
    icon: <Icon icon='lucide:home' width='24' height='24' />,
  },
  {
    title: 'จัดการข้อมูลผู้ใช้',
    path: '/manage-users',
    icon: <Icon icon='lucide:folder' width='24' height='24' />,
  },
  {
    title: 'ข้อมูลหมอ',
    path: '/doctors',
    icon: <Icon icon='lucide:mail' width='24' height='24' />,
  },
  {
    title: 'ข้อมูลคนไข้',
    path: '/patients',
    icon: <Icon icon='lucide:settings' width='24' height='24' />,
    submenu: true,
    subMenuItems: [
      { title: 'All', path: '/manage-users' },
      { title: 'Web Design', path: '/projects/web-design' },
      { title: 'Graphic Design', path: '/projects/graphic-design' },
    ],
  },
  {
    title: 'Help',
    path: '/help',
    icon: <Icon icon='lucide:help-circle' width='24' height='24' />,
  },
];
