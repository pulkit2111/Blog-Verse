import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';
import { getAccessToken, getType } from '../utils/common-utils';

const API_URL = 'http://localhost:3001';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,// Increased timeout for robustness
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // Enable sending cookies with requests
});

const processResponse = (response) => {
  if (response?.status === 200) {
    return { isSuccess: true, data: response.data };
  } else {
    return { status: response?.status, msg: response.msg, code: response?.code };
  }
};

const processError = (error) => {
  if (error.response) {
    console.log('error in response!', error.response.status);
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.responsefailure,
      code: error.response.status
    };
  } else if (error.request) {
    console.log('error in request!');
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.requestFailure,
      code: ''
    };
  } else {
    console.log('error in network!');
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.networkError,
      code: ''
    };
  }
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      if (!token.startsWith('Bearer ')) {
        config.headers['Authorization'] = `Bearer ${token}`;
      } else {
        config.headers['Authorization'] = token;
      }
    }
    if(config.TYPE.params){
      config.params = config.TYPE.params;
    }else if(config.TYPE.query){
        config.url= config.url + '/' + config.TYPE.query;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => processResponse(response),
  async(error)=>{
    const originalRequest=error.config;
    if(error.response.status === 403 && !originalRequest._retry){
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      const accessToken = await axios.post('http://localhost:3001/refresh-token', {refreshToken});
      if(accessToken){
        localStorage.setItem('accessToken', accessToken.data.newAccessToken);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken.data.newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${accessToken.data.newAccessToken}`;
        return axiosInstance(originalRequest);
      }
    }
    return processError(error);  
  }
);

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = (body, showUploadProgress, showDownloadProgress) =>
    axiosInstance({
      method: value.method,
      url: value.url,
      data: value.method==='DELETE'?{}:body,
      responseType: value.responseType,
      TYPE: getType(value,body),
      withCredentials: true
    });
}

export { API };
