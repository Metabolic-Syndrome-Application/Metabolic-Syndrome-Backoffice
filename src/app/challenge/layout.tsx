import React, { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const ChallengeLayout: FC<Props> = ({ children }) => {
  const background = () => (
    <div className='bg-pink-300'>

    </div>
  );

  return (
    <div className='relative h-full w-full '>
      {background()}
      {children}
    </div>
  );
};

export default ChallengeLayout;