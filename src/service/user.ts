// import { API_PATH } from '@/config/api';
// import { refreshTokenCookie } from '@/helpers/cookie';
// import { appApi } from '.';
// import { UserProfileResponse } from './user';

// export interface LoginParams {
//   authCode: string;
// }

// export interface LoginResponse extends UserProfileResponse {
//   access_token: string;
//   refresh_token: string;
//   tmn_access_token: string;
//   tmn_refresh_token: string;
// }

// export const authApis = appApi.injectEndpoints({
//   endpoints: (builder) => ({
//     login: builder.mutation<LoginResponse, LoginParams>({
//       query: ({ authCode }) => ({
//         url: API_PATH.POST_LOGIN,
//         method: 'POST',
//         body: {
//           code: authCode,
//         },
//       }),
//     }),
//     logout: builder.mutation<void, void>({
//       query: () => ({
//         url: API_PATH.DELETE_LOGOUT,
//         method: 'DELETE',
//       }),
//     }),
//     refreshToken: builder.query<void, void>({
//       query: () => ({
//         url: API_PATH.POST_RENEW_APP_TOKEN,
//         method: 'POST',
//         body: {
//           token: refreshTokenCookie.get(),
//         },
//       }),
//     }),
//   }),
// });

// const { useLogoutMutation, useLoginMutation } = authApis;
// export { useLogoutMutation, useLoginMutation };
