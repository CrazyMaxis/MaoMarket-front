import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'antd';
import CatService from 'api/services/CatService';
import { IShortCat } from 'models/ICat';
import { getUser } from 'reduxApp/authentification';
import { SelectControl } from 'components';
import { useAppSelector } from 'hooks/customReduxHooks';

interface IParentsInfoProps {
  isEdit: boolean;
}

export const ParentsInfo = ({ isEdit }: IParentsInfoProps) => {
  const { t } = useTranslation('cat', { keyPrefix: 'form' });
  const [cats, setCats] = useState<IShortCat[]>([]);
  const user = useAppSelector((state) => getUser(state));
  const userId = user ? user.id : '';
  const { watch } = useFormContext();

  const isCattery = watch('isCattery');

  const fetchUserCats = async () => {
    const response1 = await CatService.getUserCats(userId);

    const uniqueCatsMap: { [key: string]: IShortCat } = {};

    response1.data.forEach((cat: IShortCat) => {
      uniqueCatsMap[cat.id] = cat;
    });

    if (isCattery) {
      const response2 = await CatService.getCatteryCats({ pageSize: 99999 });
      response2.data.items.forEach((cat: IShortCat) => {
        uniqueCatsMap[cat.id] = cat;
      });
    }

    const combinedCats = Object.values(uniqueCatsMap);

    setCats(combinedCats);
  };

  useEffect(() => {
    fetchUserCats();
  }, [userId]);

  const motherOptions = cats
    .filter((cat) => cat.gender === 'Female')
    .map((cat) => ({ label: cat.name, value: cat.id }));

  const fatherOptions = cats
    .filter((cat) => cat.gender === 'Male')
    .map((cat) => ({ label: cat.name, value: cat.id }));

  return (
    <Row gutter={8}>
      <Col span={6}>
        <SelectControl
          name="motherId"
          label={t('labels.mother')}
          selectProps={{
            placeholder: t('placeholders.mother'),
            options: motherOptions,
            loading: !userId,
          }}
          disabled={isEdit}
        />
      </Col>
      <Col span={6}>
        <SelectControl
          name="fatherId"
          label={t('labels.father')}
          selectProps={{
            placeholder: t('placeholders.father'),
            options: fatherOptions,
            loading: !userId,
          }}
          disabled={isEdit}
        />
      </Col>
    </Row>
  );
};
