import { urlAPI } from 'api/api';
import axios from 'axios';
import { AdvertisementScheme } from 'schemes/advertisement';

export const $api = axios.create({
  withCredentials: true,
  baseURL: urlAPI,
});

export default class AdvertisementService {
  static async getAdvertisements(params: unknown) {
    return $api.get('Advertisement', { params });
  }

  static async getAdvertisement(id: string) {
    return $api.get(`Advertisement/${id}`);
  }

  static async createAdvertisement(data: AdvertisementScheme) {
    return $api.post('Advertisement', data);
  }

  static async editAdvertisement(id: string, data: AdvertisementScheme) {
    return $api.put(`Advertisement/${id}`, data);
  }

  static async deleteAdvertisement(id: string) {
    return $api.delete(`Advertisement/${id}`);
  }
}
