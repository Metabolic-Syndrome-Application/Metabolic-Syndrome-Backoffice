/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

// declare module 'next-auth' {
//   interface Session {
//     user: IUser;
//   }
// }

// declare module 'next-auth/jwt' {
//   interface JWT {
//     id: string;
//     username: string;
//     role: string;
//     accessToken: string;
//     accessExpires: number;
//     refreshToken: string;
//     refreshExpires: number;
//   }
// }
import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

import { IUser } from '@/types/user';

declare module 'next-auth' {
  interface Session {
    user: {
      username: string;
      role: string;
    };
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      username: string;
      role: string;
    };
    accessToken: string;
    refreshToken: string;
    expiresIn: number;

    // backendTokens: {
    //   accessToken: string;
    //   refreshToken: string;
    //   expiresIn: number;
    // };
  }
}
