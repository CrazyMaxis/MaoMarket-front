import { Flex, Image } from 'antd';
import dayjs from 'dayjs';
import { INews } from 'models/INews';
import styles from './index.module.scss';

interface IPostInfoProps {
  post: INews;
}

export const PostInfo = ({ post }: IPostInfoProps) => {
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
    </Flex>
  );
};
