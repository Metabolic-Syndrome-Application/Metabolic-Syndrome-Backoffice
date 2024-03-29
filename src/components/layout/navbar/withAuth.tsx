//31 Dec 2023 not use
//mock sessionStatus, test in middleware protect route
'use client';

import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';

import { sessionStatus } from '@/types/session';

export default function withAuth(Component: any) {
  return function WithAuth(props: any) {
    const session = sessionStatus;
    useEffect(() => {
      const session = sessionStatus;
      if (!session) {
        redirect('/');
      }
    }, []);

    if (!session) {
      return null;
    }

    return <Component {...props}></Component>;
  };
}
