import { ReactNode } from 'react';

export default function MarginWidthWrapper({
  children,
  mlSize,
}: {
  children: ReactNode;
  mlSize: string;
}) {
  return (
    <div
      className={`${mlSize} flex min-h-screen flex-col sm:border-r sm:border-zinc-700`}
    >
      {children}
    </div>
  );
}
