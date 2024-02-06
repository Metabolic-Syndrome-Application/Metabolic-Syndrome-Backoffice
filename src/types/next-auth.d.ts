/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

import { IUser } from '@/types/login';

declare module 'next-auth' {
  interface Session {
    user: {
      access_token: string;
      status: string;
      user: {
        role: string;
        username: string;
      };
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      access_token: string;
      status: string;
      user: {
        role: string;
        username: string;
      };
    };
  }
}
