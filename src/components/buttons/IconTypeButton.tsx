//Icon Graph Type Health Button : show category/type (bmi/pressure/,,)
import { LucideIcon } from 'lucide-react';
import React from 'react';
import { IconType } from 'react-icons';
import { ImSpinner2 } from 'react-icons/im';

import { cn } from '@/lib/utils';

const ButtonVariant = ['blue', 'gray', 'yellow', 'green', 'orange', 'black', 'red'] as const;
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
          'font-sm inline-flex items-center rounded-lg overflow-hidden',
          'focus:outline-none focus-visible:ring',
          'w-fit md:min-w-[180px] min-h-fit md:min-h-[80px] md:w-full shadow-sm',
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
              'border-light-blue border text-default-blue',
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
              'text-default-red border border-default-red',
              'hover:bg-soft-red',
              'border-light-red active:border',
              'disabled:border-light-gray disabled:text-stone-800 disabled:opacity-40',
            ],
            variant === 'black' && [
              'border-light-gray text-black border',
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
            className={cn('w-10 h-10 flex rounded-full text-center p-1.5 object-contain]', classNames?.icon)}
          />

        )
        }
        <div className="flex ml-3">
          <span className='text-start text-wrap pl-1 text-base font-medium'>{children}</span>
        </div>
      </button >
    );
  }
);

export default IconTypeButton;
