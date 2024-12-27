import { useTranslation } from 'react-i18next';
import { Flex } from 'antd';
import classNames from 'classnames';
import { IShortCat } from 'models/ICat';
import styles from './index.module.scss';

interface ICatItemInfoProps {
  data: IShortCat;
  isSelected?: boolean;
  onSelect: (id: string) => void;
}

export const CatItemInfo = ({
  data,
  isSelected,
  onSelect,
}: ICatItemInfoProps) => {
  const { t } = useTranslation('common');

  const onClick = () => {
    onSelect(data.id);
  };

  return (
    <Flex
      gap={16}
      className={classNames(styles.container, isSelected && styles.selected)}
      vertical
      onClick={onClick}
    >
      <img src={data.photoUrl} alt="" />
      <Flex justify="space-between">
        <b>{data.name}</b>
        <div>{t(`gender.${data.gender}`)}</div>
      </Flex>
    </Flex>
  );
};
