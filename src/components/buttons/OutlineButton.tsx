//Outline Icon Button : show category/type (food,exercise,health)
import React from 'react';
import { ImSpinner2 } from 'react-icons/im';

import { cn } from '@/lib/utils';
import { IconType } from 'react-icons';
import { LucideIcon } from 'lucide-react';

const ButtonVariant = ['blue', 'gray', 'yellow', 'green', 'orange'] as const;
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

const OutlineButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
          'font-sm inline-flex w-fit items-center rounded-2xl',
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
              'border-light-blue border text-blue-500',
              'hover:bg-light-blue ',
              'active:border-light-blue active:border',
              'disabled:border-light-gray disabled:text-stone-900 disabled:opacity-30',
            ],
            variant === 'gray' && [
              'border-light-gray text-default-gray border',
              'hover:bg-light-gray ',
              'active:border-default-gray active:border',
            ],
            variant === 'yellow' && [
              'border-light-yellow text-default-yellow border',
              'hover:bg-light-yellow',
              'active:border-light-yellow active:border',
              'disabled:border-light-gray disabled:text-stone-900 disabled:opacity-40',
            ],
            variant === 'green' && [
              'border-light-green text-default-green border',
              'hover:bg-light-green',
              'active:border-light-green active:border',
              'disabled:border-light-gray disabled:text-stone-800 disabled:opacity-40',
            ],
            variant === 'orange' && [
              'text-default-orange border border-[#FFC6AD]',
              'hover:bg-[#FFC6AD]',
              'active:border active:border-[#FFB098]',
              'disabled:border-light-gray disabled:text-stone-800 disabled:opacity-40',
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
            className={cn('h-4 w-4 md:h-[18px] md:w-[18px]', classNames?.icon)}
          />
        )}

        <span className='px-1'>{children}</span>
      </button>
    );
  }
);

export default OutlineButton;
