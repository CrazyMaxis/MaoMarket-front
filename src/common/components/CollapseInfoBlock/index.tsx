import { ReactNode } from 'react';
import { Flex } from 'antd';
import { CollapseInfoItem } from './components/CollapseInfoItem';

export type InfoItem = {
  title: ReactNode;
  value?: ReactNode;
  isOnlyTitle?: boolean;
};

interface ICollapseInfoBlock {
  infoItems: InfoItem[];
}

export const CollapseInfoBlock = ({ infoItems }: ICollapseInfoBlock) => {
  return (
    <Flex gap={24} vertical>
      {infoItems
        .filter((item) => !!item.value || item.isOnlyTitle)
        .map(({ title, value, isOnlyTitle }, idx) => (
          <CollapseInfoItem
            title={isOnlyTitle ? title : `${title}:`}
            value={value}
            key={idx}
          />
        ))}
    </Flex>
  );
};
