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

    // backendTokens: {
    //   accessToken: string;
    //   refreshToken: string;
    //   expiresIn: number;
    // };
  }
}
