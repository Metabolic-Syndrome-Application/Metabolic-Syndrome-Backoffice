/* eslint-disable unused-imports/no-unused-vars */
//import { NextAuthOptions } from 'next-auth';
import type { NextAuthOptions } from 'next-auth/index';
//import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import axios from '@/lib/axios';

// async function refreshToken(token: JWT): Promise<JWT> {
//   const res = await fetch(BACKEND_URL + '/auth/refresh', {
//     method: 'POST',
//     headers: {
//       authorization: `Refresh ${token.backendTokens.refreshToken}`,
//     },
//   });
//   console.log('refreshed');

//   const response = await res.json();

//   return {
//     ...token,
//     backendTokens: response,
//   };
// }

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'jsmith',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        //If username & password of user is not correct => 2 options (null / throw error)
        if (!credentials?.username || !credentials?.password) return null;
        const { username, password } = credentials;
        // const res = await fetch(BACKEND_URL + '/api/auth/login', {
        //   method: 'POST',
        //   body: JSON.stringify({
        //     username,
        //     password,
        //   }),
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // });

        const res = await axios.post('/api/auth/login', {
          username: credentials?.username,
          password: credentials?.password,
        });

        if (res.status == 401) {
          console.log(res.statusText);

          return null;
        }
        // const user = await res.json();

        // console.log('user test', user);
        // return user;
        const user = res.data;
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      console.log({ token, user });
      //Check user is available? ->  update token if user is returned
      if (user) return { ...token, ...user };
      //return final token
      return token;
    },

    async session({ token, session }) {
      session.user = token.user;
      // session.backendTokens = token.backendTokens;

      return session;
    },

    // async session({ session, token }) {
    //   //  update session from token
    //   if (token) {
    //     session.user = token.user;
    //   }
    //   return session;
    // },
  },
};
