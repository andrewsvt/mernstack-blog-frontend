import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
  headers: {},
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('userToken');
  return config;
});

export default instance;
