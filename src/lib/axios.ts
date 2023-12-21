import axios from 'axios';

export const BACKEND_URL = 'http://localhost:8000';

export default axios.create({
  baseURL: BACKEND_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const axiosAuth = axios.create({
  baseURL: BACKEND_URL,
  headers: { 'Content-Type': 'application/json' },
});
