import * as React from 'react';

import { cn } from '@/lib/utils';
import { ImSpinner2 } from 'react-icons/im';

const ActionButtonVariant = ['submit', 'cancel', 'delete'] as const;
const ButtonSize = ['base', 'sm'] as const;

type ActionButtonProps = {
  isLoading?: boolean;
  variant?: (typeof ActionButtonVariant)[number];
  size?: (typeof ButtonSize)[number];
} & React.ComponentPropsWithRef<'button'>;

const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      variant = 'submit', //default is 'submit'
      size = 'base',

      ...rest
    },
    ref
  ) => {
    const disabled = isLoading || buttonDisabled;

    return (
      <button
        ref={ref}
        type={'button'}
        disabled={disabled}
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
            'disabled:opacity-36 disabled: disabled:bg-[#8998E6] disabled:text-white',
          ],
          variant === 'cancel' && [
            'w-fit min-w-[90px]',
            'text-default-gray bg-gray-100',
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
          'disabled:cursor-not-allowed disabled:no-underline disabled:brightness-105',
          className
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={cn(
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
              {
                'text-white': ['submit'].includes(variant),
              }
            )}
          >
            <ImSpinner2 className='animate-spin' />
          </div>
        )}
        {children}
      </button>
    );
  }
);

export default ActionButton;
