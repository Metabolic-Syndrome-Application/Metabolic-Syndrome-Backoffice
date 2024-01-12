import React from 'react';
import { FiPlusCircle } from 'react-icons/fi';

import { cn } from '@/lib/utils';

import { IconFlatButtonProps } from '@/types/button';

export const IconFlatButton: React.FC<IconFlatButtonProps> = ({
  title,
  icon: Icon = FiPlusCircle, // Default icon is FiPlusCircle
  iconClassName = '',
  ...props
}) => {
  return (
    <button
      type='button'
      className='bg-default-blue hover:bg-dark-blue active:bg-bg-dark-blue flex max-w-[150px] cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl px-2 py-2 text-sm font-medium text-white md:px-4 md:text-base'
      {...props}
    >
      <Icon className={cn('h-4 w-4 md:h-5 md:w-5', iconClassName)} />
      {title}
    </button>
  );
};
