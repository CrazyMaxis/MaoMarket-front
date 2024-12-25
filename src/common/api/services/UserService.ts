import { urlAPI } from 'api/api';
import axios from 'axios';
import { ProfileScheme } from 'schemes/profile';

export const $api = axios.create({
  withCredentials: true,
  baseURL: urlAPI,
});

export default class UserService {
  static async requestVerification() {
    return $api.post('User/request-verification');
  }

  static async updateProfile(userId: string, data: ProfileScheme) {
    return $api.put(`User/${userId}/update-profile`, data);
  }

  static async getUsers(params: unknown) {
    return $api.get('User', { params });
  }

  static async getUsersWithRequests(params: unknown) {
    return $api.get('User/verification-requests', { params });
  }

  static async changeRole(userId: string, role: string) {
    return $api.post(`User/${userId}/change-role`, { newRole: role });
  }

  static async blockUser(userId: string) {
    return $api.post(`User/${userId}/block`);
  }

  static async unblockUser(userId: string) {
    return $api.post(`User/${userId}/unblock`);
  }

  static async deleteUser(userId: string) {
    return $api.delete(`User/${userId}`);
  }

  static async approveVerifyRequest(userId: string) {
    return $api.post(`User/${userId}/verify`, { isVerified: true });
  }

  static async rejectVerifyRequest(userId: string) {
    return $api.post(`User/${userId}/verify`, { isVerified: false });
  }
}
