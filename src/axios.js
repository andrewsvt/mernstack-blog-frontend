import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 1000,
  headers: {},
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('userToken');
  return config;
});

export default instance;
