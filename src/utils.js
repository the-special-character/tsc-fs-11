import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  timeoutErrorMessage: 'Server is busy try after some time...',
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  config => {
    const data = localStorage.getItem('user');

    if (data) {
      const json = JSON.parse(data);
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${json.accessToken}`;
    }

    return config;
  },
  error =>
    // Do something with request error
    Promise.reject(error),
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response => response.data,
  error => {
    const message = error?.response?.data;

    if (message) {
      return Promise.reject(new Error(message));
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
