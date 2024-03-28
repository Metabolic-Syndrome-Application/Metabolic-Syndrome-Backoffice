'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { axiosAuth } from '@/lib/axios';
import { useRefreshToken } from '@/hooks/useRefreshToken';

const useAxiosAuth = () => {
  const { data: session } = useSession();
  const refreshToken = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers[
            'Authorization'
          ] = `Bearer ${session?.user?.access_token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosAuth.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (
          error?.response?.status === 401 ||
          (error?.response.status === 403 && !prevRequest?.sent)
        ) {
          prevRequest.sent = true;
          await refreshToken();
          prevRequest.headers[
            'Authorization'
          ] = `Bearer ${session?.user.access_token}`;
          // console.log('access_token Token2:', session?.user.access_token);
          // console.log('Refresh Token2:', session?.user.refresh_token);

          return axiosAuth(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      axiosAuth.interceptors.response.eject(responseIntercept);
    };
  }, [session, refreshToken]);

  return axiosAuth;
};

export default useAxiosAuth;
