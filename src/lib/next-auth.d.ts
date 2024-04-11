/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

import { IUser } from '@/types/auth';

declare module 'next-auth' {
  interface Session {
    access_token: string;
    refresh_token: string;
    user: {
      access_token: string;
      refresh_token: string;
      status: string;
      role: string;
      username: string;
      user: {
        role: string;
        username: string;
      };
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string;
    refresh_token: string;
    user: {
      access_token: string;
      refresh_token: string;
      status: string;
      role: string;
      username: string;
      user: {
        role: string;
        username: string;
      };
    };
  }
}
