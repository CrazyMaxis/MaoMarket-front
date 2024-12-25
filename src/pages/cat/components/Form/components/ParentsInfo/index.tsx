import { useEffect, useState } from 'react';
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

  const fetchUserCats = async () => {
    const response = await CatService.getUserCats(userId);
    setCats(response.data);
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
