import { urlAPI } from 'api/api';
import axios from 'axios';
import { BreedScheme } from 'schemes/breed';

export const $api = axios.create({
  withCredentials: true,
  baseURL: urlAPI,
});

export default class BreedService {
  static async getBreeds() {
    return $api.get('Breeds');
  }

  static async createBreed(data: BreedScheme) {
    return $api.post('Breeds', data);
  }

  static async editBreed(id: string, data: BreedScheme) {
    return $api.put(`Breeds/${id}`, data);
  }

  static async deleteBreed(id: string) {
    return $api.delete(`Breeds/${id}`);
  }
}
