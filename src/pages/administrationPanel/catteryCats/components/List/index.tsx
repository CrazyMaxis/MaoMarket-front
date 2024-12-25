import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Flex } from 'antd';
import CatService from 'api/services/CatService';
import { PAGE_SIZE } from 'constants/basic';
import { IShortCat } from 'models/ICat';
import { CatItemInfo } from 'pages/profile/View/components/ProfileInfo/components/CatsInfo/components/CatItemInfo';
import { Pagination } from 'components';
import useDataLoader from 'hooks/useDataLoader';

export const List = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { loadData, isLoading, res } = useDataLoader(CatService.getCatteryCats);

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
      <Flex gap={24} wrap>
        {res?.data.items &&
          res?.data.items.length > 0 &&
          res?.data.items.map((cat: IShortCat) => (
            <CatItemInfo data={cat} key={cat.id} />
          ))}
      </Flex>

      <Pagination
        total={res?.data.totalCount}
        pageSize={PAGE_SIZE}
        current={parseInt(searchParams.get('page') || '1')}
        onChange={onPageChange}
      />
    </Flex>
  );
};
