import { urlAPI } from 'api/api';
import axios from 'axios';
import { CommentScheme } from 'schemes/comment';

export const $api = axios.create({
  withCredentials: true,
  baseURL: urlAPI,
});

export default class CommentService {
  static async getComments(postId: string) {
    return $api.get(`Comment/${postId}`);
  }

  static async createComment(data: CommentScheme) {
    return $api.post('Comment', data);
  }

  static async updateComment(commentId: string, data: CommentScheme) {
    return $api.put(`Comment/${commentId}`, data);
  }

  static async deleteComment(commentId: string) {
    return $api.delete(`Comment/${commentId}`);
  }
}
