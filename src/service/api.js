import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';
import { getAccessToken } from '../utils/common-utils';

const API_URL = 'http://localhost:3001';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,// Increased timeout for robustness
  headers: { 'Content-Type': 'application/json' },
});

const processResponse = (response) => {
  if (response?.status === 200) {
    return { isSuccess: true, data: response.data };
  } else {
    return { isFailure: true, status: response?.status, msg: response.msg, code: response?.code };
  }
};

const processError = (error) => {
  if (error.response) {
    console.log('error in response!', error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.responsefailure,
      code: error.response.status
    };
  } else if (error.request) {
    console.log('error in request!', error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.requestFailure,
      code: ''
    };
  } else {
    console.log('error in network!', error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.networkError,
      code: ''
    };
  }
};

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => processResponse(response),
  (error) => Promise.reject(processError(error))
);

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = (body, showUploadProgress, showDownloadProgress) =>
    axiosInstance({
      method: value.method,
      url: value.url,
      data: body,
      responseType: value.responseType,
      headers:{
        Authorization: getAccessToken()
      },
      onUploadProgress: (progressEvent) => {
        if (showUploadProgress) {
          let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          showUploadProgress(percentageCompleted);
        }
      },
      onDownloadProgress: (progressEvent) => {
        if (showDownloadProgress) {
          let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          showDownloadProgress(percentageCompleted);
        }
      }
    });
}

export { API };
