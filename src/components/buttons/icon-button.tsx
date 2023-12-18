import React from 'react';
import { IconType } from 'react-icons';
import { FiPlusCircle } from 'react-icons/fi';

export type IconButtonProps = {
  icon?: IconType;
  name: string;
  onClick: () => void;
};

export const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  name,
  onClick,
  ...props
}) => {
  return (
    <div className=' '>
      <button
        type='button'
        onClick={onClick}
        className='bg-default-blue hover:bg-dark-blue flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white md:text-base'
        {...props}
      >
        <FiPlusCircle className='h-4 w-4 md:h-5 md:w-5' />
        {name}
      </button>
    </div>
  );
};
