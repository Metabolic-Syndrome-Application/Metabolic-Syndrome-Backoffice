//export const BACKEND_URL = 'http://localhost:8000';
export const BACKEND_URL = 'http://34.87.86.35:8000';

export const API_PATH = {
  //Auth : wait add admin form
  POST_REGISTER: '/api/auth/register',
  POST_REGISTER_OTHER: '/api/auth/register/other',
  POST_LOGIN: '/api/auth/login',
  POST_REFRESH: '/api/auth/refresh',
  GET_LOGOUT: '/api/auth/logout',

  //Doctor & Staff
  GET_PROFILE_ALL: '/api/user/profile/all', //patient too
  PUT_PROFILE_OTHER: (role: string, id: string) =>
    `/api/user/profile/${role}/${id}`,
  DELETE_USER: (role: string, id: string) => `/api/user/profile/${role}/${id}`,

  GET_PROFILE_ME: '/api/user/profile',
  PUT_PROFILE_ME: '/api/user/profile',

  GET_PROFILE_ALL_DOCTOR: '/api/user/profile/all/doctor',

  //Patient
  GET_PROFILE_OTHER: (id: string) => `/api/user/profile/patient/${id}`,
  GET_PROFILE_PATIENT_OTHER: (id: string) => `/api/user/profile/patient/${id}`,
  PUT_PROFILE_PATIENT_OTHER: (id: string) => `/api/user/profile/patient/${id}`,

  //Patient : OTP Generate
  POST_GEN_OTP: '/api/connect/generate-otp',
  GET_REFRESH_OTP: (id: string) => `/api/connect/refresh-otp/${id}`,

  //Patient : Record Health
  POST_RECORD_HEALTH: (id: string) => `/api/record/health/${id}`,
  GET_RECORD_HEALTH_BY_ALL: (id: string) => `/api/record/health/${id}`,
  GET_RECORD_HEALTH_BY_PATIENT: (id: string) =>
    `/api/record/health/patient/${id}`,
  GET_RECORD_HEALTH_BY_HOSPITAL: (id: string) =>
    `/api/record/health/hospital/${id}`,

  //Graph Record Health from Patient
  GET_GRAPH_HEATH: (id: string, type: string) =>
    `/api/record/health/patient/${id}/${type}`,

  //Plan
  CREATE_PLAN: '/api/plan/create',
  PUT_PLAN: (id: string) => `/api/plan/${id}`,
  GET_PLAN: (id: string) => `/api/plan/${id}`,
  GET_PLAN_ALL: '/api/plan/all',
  GET_PLAN_ALL_DEFAULT: `/api/plan/all-default`,
  DELETE_PLAN: (id: string) => `/api/plan/${id}`,

  //Quiz Challenge
  CREATE_QUIZ: '/api/challenge/quiz',
  PUT_QUIZ: (id: string) => `/api/challenge/quiz/${id}`,
  GET_QUIZ: (id: string) => `/api/challenge/quiz/${id}`,
  GET_QUIZ_ALL: '/api/challenge/quiz/all',
  DELETE_QUIZ: (id: string) => `/api/challenge/quiz/${id}`,

  //Daily Challenge
  CREATE_DAILY_CHALLENGE: '/api/challenge/daily',
  PUT_DAILY_CHALLENGE: (id: string) => `/api/challenge/daily/${id}`,
  GET_DAILY_CHALLENGE: (id: string) => `/api/challenge/daily/${id}`,
  GET_DAILY_CHALLENGE_ALL: '/api/challenge/daily/all',
  DELETE_DAILY_CHALLENGE: (id: string) => `/api/challenge/daily/${id}`,
};
