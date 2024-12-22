import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Flex } from 'antd';
import NewsService from 'api/services/NewsService';
import { PAGE_SIZE } from 'constants/basic';
import { INewsList } from 'models/INews';
import { Pagination } from 'components';
import useDataLoader from 'hooks/useDataLoader';
import { NewsItem } from './components/NewsItem';

export const List = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { loadData, isLoading, res, error } = useDataLoader(
    NewsService.getNews,
  );

  const loadNews = useCallback(() => {
    const page = searchParams.get('page') || '1';
    loadData({
      ...Object.fromEntries(searchParams),
      pageSize: PAGE_SIZE,
      page,
    });
  }, [searchParams]);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  const onPageChange = (page: number) => {
    setSearchParams((prev) => {
      const updatedParams = new URLSearchParams(prev);
      updatedParams.set('page', String(page));
      return updatedParams;
    });
  };

  return (
    <Flex vertical gap={24} align="center">
      {res?.data.items.map((news: INewsList) => (
        <NewsItem news={news} key={news.id} />
      ))}
      <Pagination
        current={Number(searchParams.get('page') || '1')}
        total={res?.data.totalCount}
        pageSize={PAGE_SIZE}
        onChange={onPageChange}
      />
    </Flex>
  );
};
