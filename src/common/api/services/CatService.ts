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
}
