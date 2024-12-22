export interface INews {
  id: string;
  title: string;
  body: string;
  image: string;
  hashtags: string[];
  likes: number;
  dislikes: number;
  createdAt: string;
}

export interface INewsList {
  id: string;
  title: string;
  body: string;
  image: string;
}
