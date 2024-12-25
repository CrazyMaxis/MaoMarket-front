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

  static async createAdvertisement(data: AdvertisementScheme) {
    return $api.post('Advertisement', data);
  }
}
