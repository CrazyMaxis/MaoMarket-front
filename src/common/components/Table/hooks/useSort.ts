import { useSearchParams } from 'react-router-dom';
import { TableProps } from 'antd/lib';

interface UseSortOptions {
  sortColumns?: string[];
}

export const useSort = ({ sortColumns }: UseSortOptions) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const toggleOrder = (key: string) => {
    const sortBy = searchParams.get('sortBy');
    const sortDir = searchParams.get('sortDir');

    if (sortBy === key) {
      if (sortDir === 'ASC') {
        return { sortBy: key, sortDir: 'DESC' };
      } else {
        return {};
      }
    }
    return { sortBy: key, sortDir: 'ASC' };
  };

  const onChangeOrder = (key: string) => () => {
    const newParams = toggleOrder(key);

    const paramsObject = Object.fromEntries(
      Object.entries(newParams).filter(([, value]) => value !== undefined),
    ) as Record<string, string>;

    setSearchParams(paramsObject, { preventScrollReset: true, replace: true });
  };

  const getOrder = (key: string) =>
    searchParams.get('sortBy') === key
      ? searchParams.get('sortDir')
      : undefined;

  const getHeaderCell = (key: string) => ({
    order: getOrder(key),
    onClick: onChangeOrder(key),
  });

  const modifyColumns = (columns: TableProps['columns']) =>
    columns && sortColumns
      ? columns.map((item) =>
          sortColumns.includes(item?.key as string)
            ? {
                ...item,
                onHeaderCell: () => getHeaderCell(item?.key as string),
              }
            : item,
        )
      : columns;

  return {
    modifyColumns,
  };
};
