import { urlAPI } from 'api/api';
import axios from 'axios';

export const $api = axios.create({
  withCredentials: true,
  baseURL: urlAPI,
});

export default class NewsService {
  static async getNews(params: any) {
    return $api.get('Post', { params });
  }

  static async getNewsInfo(newsId: string) {
    return $api.get(`Post/${newsId}`);
  }

  static async createPost(data: FormData) {
    return $api.post('Post', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  static async updatePost(postId: string, data: FormData) {
    return $api.put(`Post/${postId}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  static async deletePost(postId: string) {
    return $api.delete(`Post/${postId}`);
  }

  static async reactPost(postId: string, action: 'Like' | 'Dislike') {
    return $api.post(`Post/${postId}/react`, { action });
  }
}
