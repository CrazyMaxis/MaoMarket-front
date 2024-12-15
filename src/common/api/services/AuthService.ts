import { urlAPI } from 'api/api';
import axios from 'axios';

export const $apiAuth = axios.create({
  withCredentials: true,
  baseURL: urlAPI,
});

export default class AuthService {
  static async login(email: string, password: string) {
    return $apiAuth.post('Auth/login', { email, password });
  }

  static async checkAuth() {
    return $apiAuth.post('Auth/refresh');
  }

  static async register(name: string, email: string, password: string) {
    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Email', email);
    formData.append('Password', password);

    return $apiAuth.post('Auth/register', formData);
  }

  static async verify(userId: string, code: string) {
    return $apiAuth.post('Auth/verify', { userId, code });
  }

  static async logout() {
    return $apiAuth.post('Auth/logout');
  }
}
