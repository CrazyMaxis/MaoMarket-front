import axios, { AxiosResponse } from 'axios';
import { logout } from 'reduxApp/authentification';
import { store } from 'reduxApp/store';
import { $apiAuth } from './services/AuthService';

export const urlAPI = `/api/`;

let refreshPromise: Promise<AxiosResponse<any, any>> | undefined;

export const $api = axios.create({
  withCredentials: true,
  baseURL: urlAPI,
});

$api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const promise = refreshPromise
          ? refreshPromise
          : $apiAuth.get(`Auth/refresh`);
        refreshPromise = promise;
        const response = await promise;

        if (response.status !== 200) {
          throw new Error('Failed to refresh token');
        }

        refreshPromise = undefined;

        return $api.request(originalRequest);
      } catch (e) {
        store.dispatch(logout());
      }
    } else if (
      error.response.status === 502 &&
      error.config &&
      error.config.isLongPolling
    ) {
      return $api.request(originalRequest);
    }
    throw error;
  },
);
