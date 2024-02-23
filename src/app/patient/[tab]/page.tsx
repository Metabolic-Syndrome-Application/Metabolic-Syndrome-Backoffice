//not used
'use client';

import { Tab } from '@headlessui/react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

import { cn } from '@/lib/utils';

const TestPage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  const tabs = ['information', 'healthRecord', 'note'];

  //const router = useRouter();
  // const pathname = usePathname();
  //console.log('path', pathname);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const searchParams = useParams();

  //check click tab
  // const [x, setX] = useState('');

  // useEffect(() => {
  //   setX(window.location.href);
  // }, [pathname]);

  const _selectedTab = (searchParams.tab as string) ?? 'profile';
  //console.log(_selectedTab);

  // const _selectedTab = (router.query.tab as string) ?? 'profile';
  const selectedIndex = tabs.indexOf(_selectedTab) ?? 0;
  //console.log(selectedIndex);

  // if (!router.isReady) {
  //   return null;
  // }
  const handleTabChange = (index: number) => {
    const tab = tabs[index];
    router.replace(`/patient/${tab}`, undefined);
  };

  return (
    <div className='p-4'>
      <h1>ข้อมูลคนไข้</h1>

      <Tab.Group
        selectedIndex={selectedIndex}
        // onChange={(index) => {
        //   const tab = tabs.at(index);

        //   router.replace(`/patient/${tab}`, undefined, { shallow: true });
        // }}
        onChange={handleTabChange}
      >
        <Tab.List className='tabs tabs-boxed'>
          {tabs.map((tab, index) => (
            <Tab
              key={tab}
              as={Link}
              href={`/patient/${tab}`}
              // use classNames to toggle the tab-active state easily
              className={cn({
                'tab m-2 capitalize': true,
                'tab-active': selectedIndex === index,
              })}
              shallow
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className='bg-base-200 text-base-content my-4 rounded-md p-2'>
          <Tab.Panel>ข้อมูลคนไข้</Tab.Panel>
          <Tab.Panel>ข้อมูลสุขภาพ</Tab.Panel>
          <Tab.Panel>บันทึกสุขภาพ</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      {/* <pre>Current Location : {x}</pre> */}
    </div>
  );
};
export default TestPage;
