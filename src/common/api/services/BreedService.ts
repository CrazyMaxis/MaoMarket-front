import { urlAPI } from 'api/api';
import axios from 'axios';

export const $api = axios.create({
  withCredentials: true,
  baseURL: urlAPI,
});

export default class BreedService {
  static async getBreeds() {
    return $api.get('Breeds');
  }
}
