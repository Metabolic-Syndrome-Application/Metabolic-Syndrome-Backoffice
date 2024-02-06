//view button link
import { LucideIcon } from 'lucide-react';
import * as React from 'react';
import { IconType } from 'react-icons';
import { IoMdEye } from 'react-icons/io';

import { cn } from '@/lib/utils';

import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/links/UnstyledLink';

type IconLinkProps = {
  icon?: IconType | LucideIcon;
  classNames?: {
    icon?: string;
  };
  children?: React.ReactNode;
} & Omit<UnstyledLinkProps, 'children'>;

const ViewButton = React.forwardRef<HTMLAnchorElement, IconLinkProps>(
  ({ className, icon: Icon = IoMdEye, classNames, children, ...rest }, ref) => {
    return (
      <UnstyledLink
        ref={ref}
        type='button'
        className={cn(
          'text-default-gray inline-flex items-center justify-center font-medium',
          'hover:text-default-blue',
          'focus-visible:ring-dark-blue focus:outline-none focus-visible:ring',
          'transition-colors duration-75',

          //#endregion  //*======== Variants ===========
          'disabled:cursor-not-allowed',
          className
        )}
        {...rest}
      >
        {Icon && <Icon size='1em' className={cn(classNames?.icon)} />}
        {children}
      </UnstyledLink>
    );
  }
);

export default ViewButton;
