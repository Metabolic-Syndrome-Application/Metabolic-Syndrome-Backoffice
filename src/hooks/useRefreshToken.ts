'use client';

//import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';

import axios from '@/lib/axios';
import { API_PATH } from '@/config/api';

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await axios.post(
      API_PATH.POST_REFRESH,
      {
        //refresh: session?.user.refresh_token,
      },

      {
        withCredentials: true,
      }
    );

    console.log('refresh', res);

    console.log({ newAccessToken: res.data.access_token });

    if (session) session.user.access_token = res.data.access_token;
    else signIn();
  };

  return refreshToken;
};
