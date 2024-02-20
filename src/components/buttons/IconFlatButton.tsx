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
      className={cn(
        'flex max-w-full min-w-[140px] items-center justify-center gap-1.5 whitespace-nowrap rounded-xl',
        'px-3 py-2 text-sm font-medium  md:text-base',
        'bg-default-blue text-white',
        'hover:bg-dark-blue',
        'active:ring-light-blue active:bg-dark-blue cursor-pointer focus:outline-none active:ring-2',
        'disabled:opacity-36 disabled:bg-[#8998E6] disabled:text-white'
      )}
      {...props}
    >
      {Icon && (
        <span
          className={cn(
            'flex h-4 w-4 items-center justify-center md:h-5 md:w-5',
            iconClassName
          )}
        >
          <Icon />
        </span>
      )}

      {title}
    </button>
  );
};
