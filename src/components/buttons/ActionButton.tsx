import * as React from 'react';

import { cn } from '@/lib/utils';

const ActionButtonVariant = ['submit', 'cancel', 'delete'] as const;
const ButtonSize = ['base', 'sm'] as const;

type ActionButtonProps = {
  variant?: (typeof ActionButtonVariant)[number];
  size?: (typeof ButtonSize)[number];
} & React.ComponentPropsWithRef<'button'>;

const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
  (
    {
      children,
      className,
      variant = 'submit', //default is 'submit'
      size = 'base',
      disabled: buttonDisabled,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type='button'
        disabled={buttonDisabled}
        className={cn(
          'w-fit min-w-[90px]',
          'button inline-flex items-center justify-center rounded-xl font-medium',
          'focus:outline-none focus-visible:ring focus-visible:ring-pink-500',
          'transition duration-100',
          //#region  //*=========== Size ===========
          [
            size === 'base' && ['px-4 py-2.5', 'text-base md:text-lg'],
            size === 'sm' && ['px-4 py-2', 'text-sm md:text-base'],
          ],
          //#region  //*=========== Variant ===========
          variant === 'submit' && [
            'bg-default-blue text-white',
            'hover:bg-dark-blue',
            'active:bg-dark-blue active:ring-light-blue focus:outline-none active:ring-2',
            'disabled:opacity-36 disabled:bg-[#8998E6] disabled:text-white',
          ],
          variant === 'cancel' && [
            'w-fit min-w-[90px]',
            'bg-light-gray text-default-gray',
            'hover:bg-gray-300 ',
            'active:ring-light-gray focus:outline-none active:bg-gray-300 active:ring-2',
            'disabled:text-gray-300',
          ],
          variant === 'delete' && [
            'bg-default-red text-white',
            'hover:bg-red-500 ',
            'active:ring-light-red focus:outline-none active:bg-red-600 active:ring-2',
            'disabled:bg-red-200',
          ],
          //#endregion  //*======== Variant ===========
          'disabled:cursor-not-allowed disabled:brightness-105 disabled:hover:underline',
          className
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

export default ActionButton;
