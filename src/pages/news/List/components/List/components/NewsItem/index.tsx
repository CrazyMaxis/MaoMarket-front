import { useNavigate } from 'react-router-dom';
import { Flex, Image } from 'antd';
import { INewsList } from 'models/INews';
import styles from './index.module.scss';

interface INewsItemProps {
  news: INewsList;
}

export const NewsItem = ({ news }: INewsItemProps) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/news/${news.id}`);
  };

  return (
    <Flex gap={24} className={styles.container} onClick={onClick}>
      <Image src={news.image} preview={false} width={300} />
      <Flex vertical gap={32}>
        <div className={styles.title}>{news.title}</div>
        <div>{news.body}</div>
      </Flex>
    </Flex>
  );
};
