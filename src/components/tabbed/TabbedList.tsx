import { Tab } from '@headlessui/react';
import React from 'react';

import { cn } from '@/lib/utils';
import { useTabbed } from '@/hooks/useTabbed';

import { TabbedListProps } from '@/types/tab';

export const SubTabbedList = ({
  tabs,
  listClassName,
  panelClassName,
}: TabbedListProps) => {
  const { tab, handleChange } = useTabbed();

  return (
    <div className={cn('w-full p-2', panelClassName)}>
      <Tab.Group selectedIndex={tab} onChange={handleChange}>
        <Tab.List
          className={cn(
            'flex w-full max-w-xl gap-2 rounded-xl bg-gray-50 p-1',
            listClassName
          )}
        >
          {tabs.map((data, _index) => (
            <Tab
              key={data.id}
              className={({ selected }) =>
                cn(
                  'text-md w-full rounded-lg py-2.5 font-medium leading-5',
                  'border-indigo-500 ring-white/60  focus:border-b-2 focus:outline-none',
                  selected
                    ? 'text-default-blue bg-light-blue shadow'
                    : 'text-default-gray hover:bg-[#F3F3F3] hover:text-[#585454]'
                )
              }
            >
              <div className='flex w-full items-center justify-start'>
                {data.icon && <div className='flex p-1.5'>{data.icon}</div>}
                <div className='ml-2'>{data.name}</div>
              </div>
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {tabs.map((data, _index) => (
            <Tab.Panel key={data.id} className={cn('flex rounded-xl')}>
              {data.component}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
