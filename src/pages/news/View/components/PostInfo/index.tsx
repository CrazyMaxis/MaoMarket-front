import { useState } from 'react';
import { Flex, Image } from 'antd';
import NewsService from 'api/services/NewsService';
import dayjs from 'dayjs';
import { INews } from 'models/INews';
import { Button, Feather } from 'components';
import styles from './index.module.scss';

interface IPostInfoProps {
  post: INews;
}

export const PostInfo = ({ post }: IPostInfoProps) => {
  const [likes, setLikes] = useState(post.likes || 0);
  const [dislikes, setDislikes] = useState(post.dislikes || 0);

  const onLike = async () => {
    await NewsService.reactPost(post.id, 'Like');
    setLikes((prev) => prev + 1);
  };

  const onDislike = async () => {
    await NewsService.reactPost(post.id, 'Dislike');
    setDislikes((prev) => prev + 1);
  };

  dayjs.locale('ru');
  const date = dayjs(post.createdAt);
  const formattedDate = date.format('DD MMMM YYYY, HH:mm:ss');

  return (
    <Flex vertical gap={32} className={styles.container}>
      <Flex gap={24} align="center" justify="space-between">
        <div className={styles.title}>{post.title}</div>
        <div>{formattedDate}</div>
      </Flex>
      <Image src={post.image} width={400} />
      <div className={styles.body}>{post.body}</div>
      <Flex gap={16} justify="flex-end">
        <Button icon={<Feather type="like" />} onClick={onLike}>
          {likes}
        </Button>
        <Button icon={<Feather type="dislike" />} onClick={onDislike}>
          {dislikes}
        </Button>
      </Flex>
    </Flex>
  );
};
