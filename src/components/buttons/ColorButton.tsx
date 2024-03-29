//Button Color Status (ex. pending,success,rejected)
import React from 'react';
import { ImSpinner2 } from 'react-icons/im';

import { cn } from '@/lib/utils';

const ButtonVariant = ['blue', 'gray', 'yellow', 'green', 'red'] as const;
const ButtonSize = ['sm', 'base'] as const;

type ButtonProps = {
  isLoading?: boolean;
  isDarkBg?: boolean;
  variant?: (typeof ButtonVariant)[number];
  size?: (typeof ButtonSize)[number];
} & React.ComponentPropsWithRef<'button'>;

const ColorButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      variant = 'primary',
      size = 'base',
      ...rest
    },
    ref
  ) => {
    const disabled = isLoading || buttonDisabled;

    return (
      <button
        ref={ref}
        type='button'
        disabled={disabled}
        className={cn(
          'inline-flex items-center rounded-2xl font-medium',
          'focus:outline-none focus-visible:ring',
          'shadow-sm',
          'transition-colors duration-75',
          //#region  //*=========== Size ===========
          [
            size === 'base' && ['px-3 py-1.5', 'text-sm md:text-base'],
            size === 'sm' && ['px-2 py-1', 'text-xs md:text-sm'],
          ],
          //#endregion  //*======== Size ===========
          //#region  //*=========== Variants ===========
          [
            variant === 'blue' && [
              'bg-light-blue text-dark-blue',
              'hover:bg-blue-300 ',
              'active:border-light-blue active:border',
              'disabled:bg-[#C9E1FD] disabled:text-gray-900 disabled:opacity-30',
            ],
            variant === 'gray' && [
              'bg-light-gray text-default-gray',
              'hover:bg-gray-300 ',
              'active:border-default-gray active:border',
            ],
            variant === 'yellow' && [
              'bg-light-yellow text-dark-yellow',
              'hover:bg-default-yellow',
              'active:border-light-yellow active:border',
              'disabled:bg-dark-yellow disabled:text-stone-900 disabled:opacity-40',
            ],
            variant === 'green' && [
              'bg-light-green text-dark-green',
              'hover:bg-default-green',
              'active:border-light-green active:border',
              'disabled:bg-green-800 disabled:text-stone-800 disabled:opacity-40',
            ],
            variant === 'red' && [
              'bg-light-red text-dark-red',
              'hover:bg-default-red',
              'active:border-light-red active:border',
              'disabled:text-stone-00 disabled:bg-red-300 disabled:opacity-40',
            ],
          ],
          //#endregion  //*======== Variants ===========
          'disabled:cursor-not-allowed',
          isLoading &&
            'relative text-transparent transition-none hover:text-transparent disabled:cursor-wait',
          className
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={cn(
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
              {
                'text-white': ['blue', 'yellow'].includes(variant),
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

export default ColorButton;
