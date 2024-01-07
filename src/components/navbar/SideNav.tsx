'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import React, { useState } from 'react';

import { SideNavItem } from '@/types/navbar';
import { useSideNavbar } from '@/hooks/useSideNavbar';
import { SIDENAV_ITEMS } from '@/components/navbar/ConstantsNav';

const SideNav = () => {
  const customRoleNav = useSideNavbar();
  const lastItem = customRoleNav.find((item) => item.title === 'ออกจากระบบ');
  const otherItems = customRoleNav.filter(
    (item) => item.title !== 'ออกจากระบบ'
  );

  return (
    <div className='fixed hidden h-screen flex-1 border-r border-zinc-200 bg-white md:flex md:w-72'>
      <div className='flex w-full flex-col space-y-6'>
        <Link
          href='/'
          className='flex h-[60px] w-full flex-row items-center justify-center space-x-3 border-b border-zinc-200 md:justify-start md:px-6'
        >
          <span className='h-7 w-7 rounded-lg bg-zinc-300' />
          <span className='hidden text-xl font-bold md:flex'>Metaplan</span>
        </Link>
        <div className='flex h-full flex-col justify-between md:px-6'>
          {/* Render other items */}
          <div className='space-y-4'>
            {otherItems.map((item, idx) => (
              <MenuItem key={idx} item={item} />
            ))}
          </div>

          {/* Render the last item at the end */}
          <div className='py-20'>
            {lastItem && (
              <div className='flex flex-col '>
                <MenuItem item={lastItem} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className=''>
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={` hover:bg-light-blue flex w-full flex-row items-center justify-between rounded-lg p-2 ${
              pathname.includes(item.path) ? 'bg-light-blue' : ''
            }`}
          >
            <div className='flex flex-row items-center justify-center space-x-4'>
              {item.icon}
              <span className='flex text-xl font-medium'>{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? 'rotate-180' : ''} flex`}>
              <Icon icon='lucide:chevron-down' width='24' height='24' />
            </div>
          </button>

          {subMenuOpen && (
            <div className='my-2 ml-12 flex flex-col space-y-4'>
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${
                      subItem.path === pathname ? 'font-medium' : ''
                    }`}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          // href={item.submenu ? '#' : item.path}

          className={`hover:bg-light-blue flex flex-row items-center space-x-4 rounded-lg p-2  ${
            item.path === pathname ? 'bg-light-blue text-default-blue' : ''
          }`}
        >
          {item.icon}
          <span className='flex text-xl font-medium'>{item.title}</span>
        </Link>
      )}
    </div>
  );
};
