import React, { useState } from 'react';
import { IconType } from 'react-icons';
import { FiPlusCircle } from 'react-icons/fi';

import BaseModal from '@/components/modal/BaseModal';

export type ModalButtonProps = {
  icon?: IconType;
  name: string;
  onClick: () => void;
  open: boolean;
  onClose: (shouldNotShowAgain: boolean) => unknown;
  //onConfirm: (shouldNotShowAgain: boolean) => unknown;
};

export const ModalButton: React.FC<ModalButtonProps> = ({
  icon: Icon,
  name,
  onClick,
  open,

  ...props
}) => {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <BaseModal open={open}>
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

      <button onClick={() => onClose(checked)}>close</button>
    </BaseModal>
  );
};
