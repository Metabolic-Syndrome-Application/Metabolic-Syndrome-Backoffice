"use client"
import React from 'react';

import LoginSection from '@/components/login/LoginSection';

type Props = {
  error: any;
  searchParams?: Record<'callbackUrl' | 'error', string>;
};

const SignInPage = (props: Props) => {

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
