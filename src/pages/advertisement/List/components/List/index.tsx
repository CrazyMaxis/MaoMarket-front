import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Flex } from 'antd';
import AdvertisementService from 'api/services/AdvertisementService';
import { PAGE_SIZE } from 'constants/basic';
import { Pagination } from 'components';
import useDataLoader from 'hooks/useDataLoader';

export const List = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { loadData, isLoading, res } = useDataLoader(
    AdvertisementService.getAdvertisements,
  );

  const loadCats = useCallback(() => {
    const page = searchParams.get('page') || '1';
    loadData({
      ...Object.fromEntries(searchParams),
      pageSize: PAGE_SIZE,
      page,
    });
  }, [searchParams]);

  useEffect(() => {
    loadCats();
  }, [loadCats]);

  const onPageChange = (page: number) => {
    setSearchParams((prev) => {
      const updatedParams = new URLSearchParams(prev);
      updatedParams.set('page', String(page));
      return updatedParams;
    });
  };

  return (
    <Flex vertical gap={24}>
      <Pagination
        total={res?.data.totalCount}
        pageSize={PAGE_SIZE}
        current={parseInt(searchParams.get('page') || '1')}
        onChange={onPageChange}
      />
    </Flex>
  );
};
