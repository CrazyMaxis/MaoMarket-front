import { useTranslation } from 'react-i18next';
import { Flex, Image } from 'antd';
import { INews } from 'models/INews';
import styles from './index.module.scss';

interface IPostInfoProps {
  post: INews;
}

export const PostInfo = ({ post }: IPostInfoProps) => {
  const { t } = useTranslation('news', { keyPrefix: 'view' });

  return (
    <Flex vertical gap={32} className={styles.container}>
      <div className={styles.title}>{post.title}</div>
      <Image src={post.image} width={400} />
      <div className={styles.body}>{post.body}</div>
    </Flex>
  );
};
