import { Tab } from '@headlessui/react';
import React from 'react';

import { cn } from '@/lib/utils';
import { useTabbed } from '@/hooks/useTabbed';

import { TabbedListProps } from '@/types/tab';

export const TabbedList = ({
  tabs,
  listClassName,
  panelClassName,
  allPanelClassName,
  btnClassName,
}: TabbedListProps) => {
  const { tab, handleChange } = useTabbed();

  return (
    <div className={cn('w-full p-1 md:p-2', allPanelClassName)}>
      <Tab.Group selectedIndex={tab} onChange={handleChange}>
        <Tab.List
          className={cn('flex w-full  gap-2 bg-white p-1', listClassName)}
        >
          {tabs.map((data, _index) => (
            <Tab
              key={data.id}
              className={({ selected }) =>
                cn(
                  'text-md rounded-lg px-2 py-2.5 font-medium leading-5 md:px-4 lg:min-w-[200px]',
                  'border-indigo-500 ring-white/60 focus:border-b-2 focus:outline-none',
                  selected
                    ? 'text-default-blue bg-light-blue shadow'
                    : 'text-default-gray hover:bg-[#F3F3F3] hover:text-[#585454]'
                )
              }
            >
              <div
                className={cn(
                  'flex w-full items-center space-x-1 text-center',
                  btnClassName
                )}
              >
                {data.icon && (
                  <div className='flex p-1.5 text-center'>{data.icon}</div>
                )}
                <div className='font-medium'>{data.name}</div>
              </div>
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {tabs.map((data, _index) => (
            <Tab.Panel
              key={data.id}
              className={(cn('flex rounded-xl'), panelClassName)}
            >
              {data.component}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
