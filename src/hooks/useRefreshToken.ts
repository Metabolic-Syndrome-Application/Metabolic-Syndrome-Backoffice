// 'use client';

// //import axios from 'axios';
// import { signIn, signOut, useSession } from 'next-auth/react';

// import axios from '@/lib/axios';
// import { API_PATH } from '@/config/api';
// import { useEffect } from 'react';

// export const useRefreshToken = () => {
//   const { data: session } = useSession();

//   const refreshToken = async () => {
//     const res = await axios.post(
//       API_PATH.POST_REFRESH,
//       {
//         //refresh: session?.user.refresh_token,
//       },

//       {
//         withCredentials: true,
//       }
//     );

//     console.log('refresh', res);

//     console.log({ newAccessToken: res.data.access_token });
//     // Store the new access token in localStorage
//     localStorage.setItem('accessToken', res.data.access_token);
//     if (session) session.user.access_token = res.data.access_token;
//     else signIn();
//     localStorage.removeItem('accessToken');
//   };

//   return refreshToken;
// };

//fix catch localStorage
'use client';

import { signOut, useSession } from 'next-auth/react';

import axios from '@/lib/axios';

import { API_PATH } from '@/config/api';

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    try {
      const res = await axios.post(
        API_PATH.POST_REFRESH,
        {
          //refresh: session?.user.refresh_token,
        },
        {
          withCredentials: true,
        }
      );

      //console.log('refresh', res);

      console.log({ newAccessToken: res.data.access_token });
      // Store the new access token in localStorage
      localStorage.setItem('accessToken', res.data.access_token);
      if (session) session.user.access_token = res.data.access_token;
    } catch (error) {
      // Handle error when refresh token fails
      console.error('Refresh token failed:', error);
      // If refresh token fails, sign out the user and clear local storage
      signOut();
      localStorage.removeItem('accessToken');
    }
  };

  return refreshToken;
};
