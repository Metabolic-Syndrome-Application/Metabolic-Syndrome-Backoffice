export const BACKEND_URL = 'http://localhost:8000';

export const API_PATH = {
  //Auth : wait add admin form
  POST_REGISTER: '/api/auth/register',
  POST_REGISTER_OTHER: '/api/auth/register/other',
  POST_LOGIN: '/api/auth/login',
  POST_REFRESH: '/api/auth/refresh',

  //User
  GET_PROFILE_ALL: '/api/user/profile/all',
  PUT_PROFILE_OTHER: (role: string, id: string) =>
    `/api/user/profile/${role}/${id}`,
  DELETE_USER: (role: string, id: string) => `/api/user/profile/${role}/${id}`,

  GET_PROFILE_ME: '/api/user/profile',
  PUT_PROFILE_ME: '/api/user/profile',

  //Plan
  CREATE_PLAN: '/api/plan/create',
  PUT_PLAN: (id: string) => `/api/plan/${id}`,
  GET_PLAN: (id: string) => `/api/plan/${id}`,
  GET_PLAN_ALL: '/api/plan/all',
  DELETE_PLAN: (id: string) => `/api/plan/${id}`,
};
