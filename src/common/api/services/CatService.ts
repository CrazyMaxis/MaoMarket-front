import { urlAPI } from 'api/api';
import axios from 'axios';

export const $api = axios.create({
  withCredentials: true,
  baseURL: urlAPI,
});

export default class CatService {
  static async getUserCats(userId: string) {
    return $api.get(`Cat/user/${userId}`);
  }

  static async getCatInfo(catId: string) {
    return $api.get(`Cat/${catId}`);
  }

  static async getCatPedigree(catId: string) {
    return $api.get(`Cat/${catId}/pedigree`);
  }

  static async createCat(data: FormData) {
    return $api.post('Cat', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  static async editCat(catId: string, data: FormData) {
    return $api.put(`Cat/${catId}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  static async deleteCat(catId: string) {
    return $api.delete(`Cat/${catId}`);
  }
}
