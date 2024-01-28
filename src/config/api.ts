export const BACKEND_URL = 'http://localhost:8000';

export const API_PATH = {
  POST_LOGIN: '/api/auth/login',
  GET_PROFILE_ALL: '/api/user/profile/all',
  GET_PROFILE_ME: '/api/user/profile',
  PUT_PROFILE_ME: '/api/user/profile',

  //not use
  DELETE_LOGOUT: '/v1/session',
  POST_RENEW_APP_TOKEN: '/v1/session/refresh',
  POST_RENEW_TMN_TOKEN: '/v1/session/tmn/refresh',
  GET_USER_INFO: '/v1/user',
  GET_FUND_IN_ORDER_QUERY: '/v1/deposit/status',
  POST_CREATE_FUND_IN_TX: '/v1/deposit',
  POST_CREATE_WITHDRAW: '/v1/withdraw',
  POST_WITHDRAW_APPROVE: '/v1/withdraw/approve',
  ASSETS: '/v1/assets',
  GET_CONFIG: '/v1/config',
  UPDATE_WATCHLIST: '/v1/assets/watchlist',
  GET_ACCOUNT: '/v1/account',
  POST_ORDER: '/v1/order',
  GET_ORDER: (id: string) => `/v1/order/${id}`,
  GET_ORDERS: '/v1/orders',
  GET_KLINES: '/v1/klines',
  GET_TRANSACTION_HISTORY: '/v1/transactions',
  GET_REQUEST_OTP: '/v1/otp',
  POST_VERIFY_OTP: '/v1/otp/verify',
  GET_CONSENT: '/v1/consent',
  POST_CONSENT: '/v1/consent',
  UPDATE_CONSENT: '/v1/consent',
};
