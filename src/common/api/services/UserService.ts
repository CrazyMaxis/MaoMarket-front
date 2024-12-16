import { urlAPI } from 'api/api';
import axios from 'axios';

export const $api = axios.create({
  withCredentials: true,
  baseURL: urlAPI,
});

export default class UserService {
  static async requestVerification() {
    return $api.post('User/request-verification');
  }

  static async updateProfile(userId: string, name: string) {
    return $api.put(`User/${userId}/update-name`, name, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
