import React from 'react';

import LoginSection from '@/components/login/LoginSection';

type Props = {
  error: any;
  searchParams?: Record<'callbackUrl' | 'error', string>;
};

const SignInPage = (props: Props) => {
  return (
    <LoginSection
      error={props.searchParams?.error}
      callbackUrl={props.searchParams?.callbackUrl}
    />
  );
};

export default SignInPage;
