'use client';

import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { RxDoubleArrowLeft } from 'react-icons/rx';

import { useSideNavbar } from '@/hooks/useSideNavbar';

import { SideNavItem } from '@/types/navbar';

type SideNavProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const SideNav = ({ open, setOpen }: SideNavProps) => {

  const customRoleNav = useSideNavbar();
  const lastItem = customRoleNav.find((item) => item.title === 'ออกจากระบบ');
  const otherItems = customRoleNav.filter(
    (item) => item.title !== 'ออกจากระบบ'
  );
  // const [open, setOpen] = useState(true);

  return (
    <div
      className={`${open ? 'md:flex md:w-72' : 'md:flex md:w-24'
        } md: fixed z-40 hidden h-screen flex-1 border-r border-zinc-200 bg-white`}
    >
      <RxDoubleArrowLeft
        className={`hover:bg-light-gray text-default-gray absolute -right-3 top-11
           w-8 cursor-pointer rounded-full border-[1.5px] bg-white ${!open && 'rotate-180'
          }`}
        onClick={() => setOpen(!open)}
        aria-hidden='true'
      />

      <div className='flex h-full w-full flex-col space-y-6'>
        {/* Render Logo and Title */}
        <Link
          href='/'
          className='flex h-[60px] w-full flex-row items-center justify-center space-x-3 border-b border-zinc-200 md:justify-start md:px-6'
        >
          <div className='flex h-7 w-7 rounded-lg'>
            <Image
              src='/assets/icons/logo.svg'
              width={350}
              height={350}
              alt='Hero'
              placeholder='blur'
              blurDataURL='/assets/icons/logo.svg'
            />
          </div>
          <span className={`${!open ? 'hidden' : 'text-xl font-bold md:flex'}`}>
            Metaplan
          </span>
        </Link>

        {/* Render Menu Items */}
        <div className='flex h-full flex-col justify-between md:px-6'>
          <div className='space-y-4 md:space-y-6 2xl:space-y-10'>
            {otherItems.map((item, idx) => (
              <MenuItem key={idx} item={item} open={open} />
            ))}
          </div>
          {/* logout  */}
          <div className='py-20'>
            {lastItem && (
              <div className='flex flex-col '>
                <MenuItem item={lastItem} open={open} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;

const MenuItem = ({ item, open }: { item: SideNavItem; open: boolean }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className=''>
      {item.submenu && open ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={` hover:bg-light-blue flex w-full flex-row items-center justify-between rounded-lg p-2 ${pathname.includes(item.path) ? 'bg-light-blue' : ''
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
            <div className='my-4 ml-12 flex flex-col space-y-6'>
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${subItem.path === pathname ? 'font-medium' : ''
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
          className={`hover:bg-light-blue flex flex-row items-center space-x-4 rounded-lg p-2 ${item.path === pathname ? 'bg-light-blue text-default-blue' : ''
            }`}
        >
          {item.icon}
          {/* Show only icon when sidebar is collapsed */}
          <span className={`${!open ? 'hidden' : 'flex'} text-xl font-medium`}>
            {item.title}
          </span>
        </Link>
      )}
    </div>
  );
};
