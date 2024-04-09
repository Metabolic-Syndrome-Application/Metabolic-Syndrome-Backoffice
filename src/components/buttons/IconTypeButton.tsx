//Icon Graph Type Health Button : show category/type (bmi/pressure/,,)
import { LucideIcon } from 'lucide-react';
import React from 'react';
import { IconType } from 'react-icons';
import { ImSpinner2 } from 'react-icons/im';

import { cn } from '@/lib/utils';

const ButtonVariant = [
  'blue',
  'gray',
  'yellow',
  'green',
  'orange',
  'black',
  'red',
] as const;
const ButtonSize = ['sm', 'base'] as const;

type ButtonProps = {
  isLoading?: boolean;
  isDarkBg?: boolean;
  variant?: (typeof ButtonVariant)[number] | string;
  icon?: IconType | LucideIcon;
  classNames?: {
    icon?: string;
  };
  size?: (typeof ButtonSize)[number];
} & React.ComponentPropsWithRef<'button'>;

const IconTypeButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      variant = 'blue',
      icon: Icon,
      classNames,
      size = 'sm',
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
          'inline-flex items-center overflow-hidden rounded-lg',
          'text-sm md:text-base',
          'px-1.5 py-2 md:px-3',
          'w-fit shadow-sm md:min-h-[80px] md:w-full md:min-w-[180px]',
          'focus:outline-none focus-visible:ring active:ring',
          'transition-colors duration-75',
          //#region  //*=========== Size ===========
          [
            size === 'base' && ['px-3 py-1.5', 'text-base md:text-lg'],
            size === 'sm' && ['px-2 py-1', 'text-sm md:text-base'],
          ],
          //#endregion  //*======== Size ===========
          //#region  //*=========== Variants ===========
          [
            variant === 'blue' && [
              'border-light-blue text-default-blue border',
              'hover:bg-soft-blue ',
              'active:border-light-blue active:border',
              'disabled:border-light-gray disabled:text-stone-900 disabled:opacity-30',
            ],
            variant === 'gray' && [
              'border-light-gray text-default-gray border',
              'hover:bg-light-gray ',
              'active:border-default-gray active:border',
            ],
            variant === 'yellow' && [
              'border-light-yellow text-dark-yellow border',
              'hover:bg-soft-yellow',
              'active:border-light-yellow active:border',
              'disabled:border-light-gray disabled:text-stone-900 disabled:opacity-40',
            ],
            variant === 'green' && [
              'border-light-green text-default-green border',
              'hover:bg-soft-green',
              'active:border-light-green active:border',
              'disabled:border-light-gray disabled:text-stone-800 disabled:opacity-40',
            ],
            variant === 'orange' && [
              'text-default-orange border border-[#FFC6AD]',
              'hover:bg-[#FFC6AD]',
              'active:border active:border-[#FFB098]',
              'disabled:border-light-gray disabled:text-stone-800 disabled:opacity-40',
            ],
            variant === 'red' && [
              'text-default-red border-default-red border',
              'hover:bg-soft-red',
              'border-light-red active:border',
              'disabled:border-light-gray disabled:text-stone-800 disabled:opacity-40',
            ],
            variant === 'black' && [
              'border-light-gray border text-black',
              'hover:bg-light-gray ',
              'active:border-default-gray active:border',
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
        {Icon && (
          <Icon
            size='1em'
            className={cn(
              'object-contain] flex h-6 w-6 rounded-full p-1.5 text-center md:h-10 md:w-10',
              classNames?.icon
            )}
          />
        )}
        <div className='ml-3 flex'>
          <span className='text-wrap pl-1 text-start text-sm font-medium md:text-base'>
            {children}
          </span>
        </div>
      </button>
    );
  }
);

export default IconTypeButton;
