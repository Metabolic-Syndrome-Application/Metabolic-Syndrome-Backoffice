import * as React from 'react';

import { cn } from '@/lib/utils'; // Assuming `cn` is a utility function for creating class names

type HeaderArticleProps = {
  title: string;
  className?: string;
  variant?: 'h1' | 'h4';
  children?: React.ReactNode;
};

const HeaderArticle = ({
  title,
  className,
  variant = 'h1',
  children,
}: HeaderArticleProps) => {
  const variantClasses =
    variant === 'h4'
      ? 'text-base md:text-lg' // h4
      : 'text-xl md:text-2xl xl:text-3xl 2xl:text-4xl'; // h1

  return (
    <div
      className={cn(
        'flex w-full items-center justify-between rounded-2xl px-4 py-2',
        className
      )}
    >
      <div className={cn('text-balance font-medium', variantClasses)}>
        {title}
      </div>
      {children}
    </div>
  );
};

export default HeaderArticle;
