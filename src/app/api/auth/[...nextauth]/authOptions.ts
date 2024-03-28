/* eslint-disable unused-imports/no-unused-vars */
//import { NextAuthOptions } from 'next-auth';
import { parse } from 'cookie';
import { cookies } from 'next/headers';
import type { NextAuthOptions } from 'next-auth/index';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signIn } from 'next-auth/react';

import axios from '@/lib/axios';
import { isRefreshTokenExpired } from '@/lib/jwt';

import { API_PATH } from '@/config/api';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;
        const { username, password } = credentials;
        try {
          const res = await axios.post(API_PATH.POST_LOGIN, {
            username,
            password,
          });
          if (res.status === 200) {
            const user = res.data;
            // Retrieve and parse the set-cookie header to get refresh_token
            const apiCookies = res.headers['set-cookie'];
            //console.log('aaaaaa');
            if (apiCookies && apiCookies.length > 0) {
              apiCookies.forEach((cookie) => {
                const parsedCookie = parse(cookie);
                const refreshToken = parsedCookie['refresh_token']; // Replace with your actual cookie name
                //console.log('cookie');
                if (refreshToken) {
                  // Update the token with the retrieved refresh_token
                  user.refresh_token = refreshToken;
                  cookies().set({
                    name: 'refresh_token',
                    value: refreshToken,
                    httpOnly: true,
                    maxAge: parseInt(parsedCookie['Max-Age']),
                    path: parsedCookie.path,
                    //sameSite: parsedCookie.samesite,
                    expires: new Date(parsedCookie.expires),
                    secure: true,
                  });
                }
              });
            }

            //console.log('Set-Cookie header:', apiCookies);

            return user;
          } else {
            return null; // Or handle the error in another way
          }
        } catch (error: any) {
          //console.log(error);

          return null; // Handle Axios error
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      console.log('jwt', { token, user });
      //Check user is available? ->  update token if user is returned
      if (user) return { ...token, ...user };

      //return final token
      return token;
    },

    async session({ token, session, user }) {
      if (token) {
        session.user = token as any;
        session.user.role = token.user.role;
        console.log('session', session);

        // Check if refresh token is expired
        if (isRefreshTokenExpired(session.user.refresh_token)) {
          await signIn();
        }
      }

      return session;
    },
  },

  pages: {
    signIn: '/auth/signIn',
  },

  secret: process.env.NEXTAUTH_SECRET,
};
