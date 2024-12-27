import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Flex } from 'antd';
import AdvertisementService from 'api/services/AdvertisementService';
import { PAGE_SIZE } from 'constants/basic';
import { IAdvertisement } from 'models/IAdvertisement';
import { Pagination } from 'components';
import useDataLoader from 'hooks/useDataLoader';
import { AdvertisementItem } from './components/AdvertisementItem';

export const List = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { loadData, isLoading, res } = useDataLoader(
    AdvertisementService.getAdvertisements,
  );
  const loadAdvertisements = useCallback(() => {
    const page = searchParams.get('page') || '1';
    loadData({
      ...Object.fromEntries(searchParams),
      pageSize: PAGE_SIZE,
      page,
    });
  }, [searchParams]);

  useEffect(() => {
    loadAdvertisements();
  }, [loadAdvertisements]);

  const onPageChange = (page: number) => {
    setSearchParams((prev) => {
      const updatedParams = new URLSearchParams(prev);
      updatedParams.set('page', String(page));
      return updatedParams;
    });
  };

  const handleDelete = (id: string) => {
    AdvertisementService.deleteAdvertisement(id).then(() => {
      const currentPage = parseInt(searchParams.get('page') || '1');
      const currentPageItems = res?.data.items.length || 0;

      if (currentPage > 1 && currentPageItems === 1) {
        onPageChange(currentPage - 1);
      } else {
        loadAdvertisements();
      }
    });
  };

  return (
    <Flex vertical gap={24} align="center">
      {res?.data.items &&
        res.data.items.length > 0 &&
        res.data.items.map((adv: IAdvertisement) => (
          <AdvertisementItem
            data={adv}
            key={adv.id}
            handleDelete={handleDelete}
          />
        ))}
      <Pagination
        total={res?.data.totalCount}
        pageSize={PAGE_SIZE}
        current={parseInt(searchParams.get('page') || '1')}
        onChange={onPageChange}
      />
    </Flex>
  );
};
