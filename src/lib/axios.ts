import axios from 'axios';

import { BACKEND_URL } from '@/config/api';

export default axios.create({
  baseURL: BACKEND_URL,
  headers: { 'Content-Type': 'application/json' },
});

//check session is login?
export const axiosAuth = axios.create({
  baseURL: BACKEND_URL,
  headers: { 'Content-Type': 'application/json' },
  //withCredentials: true,
});
