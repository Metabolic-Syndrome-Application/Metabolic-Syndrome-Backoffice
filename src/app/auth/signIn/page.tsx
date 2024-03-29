import React from 'react';

import LoginSection from '@/components/login/LoginSection';

type Props = {
  searchParams?: Record<'callbackUrl' | 'error', string>;
};

const SignInPage: React.FC<Props> = (props) => {
  return (
    <div className=''>
      <LoginSection
        error={props.searchParams?.error}
        callbackUrl={props.searchParams?.callbackUrl}
      />
    </div>
  );
};

export default SignInPage;
