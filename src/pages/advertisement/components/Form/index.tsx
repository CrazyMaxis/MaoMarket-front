import { useEffect, useState } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Col, Flex, Row } from 'antd';
import CatService from 'api/services/CatService';
import { IShortCat } from 'models/ICat';
import { AdvertisementScheme } from 'schemes/advertisement';
import { getUser } from 'reduxApp/authentification';
import { InputNumberControl } from 'components';
import { useAppSelector } from 'hooks/customReduxHooks';
import { CatItemInfo } from './components/CatItemInfo';

interface IFormProps {
  methods: UseFormReturn<AdvertisementScheme>;
}

export const Form = ({ methods }: IFormProps) => {
  const { t } = useTranslation('advertisement', { keyPrefix: 'form' });
  const user = useAppSelector((state) => getUser(state));
  const [cats, setCats] = useState<IShortCat[]>([]);
  const [cat, setCat] = useState<IShortCat>();
  const [selectedCatId, setSelectedCatId] = useState<string>();
  const userId = user ? user.id : '';
  const isEdit = window.location.pathname.includes('/edit');
  const { watch } = methods;

  const catId = watch('catId');

  useEffect(() => {
    const fetchCatInfo = async () => {
      if (catId) {
        const response = await CatService.getCatInfo(catId);

        const cat: IShortCat = {
          id: response.data.id,
          name: response.data.name,
          gender: response.data.gender,
          breed: {
            id: '1',
            name: response.data.breed,
          },
          photoUrl: response.data.photos[0]?.url,
        };

        setCat(cat);
      }
    };

    fetchCatInfo();
  }, [catId]);

  const fetchUserCats = async () => {
    const response = await CatService.getCatsWithoutAdvertisements();

    setCats(response.data);
  };

  useEffect(() => {
    fetchUserCats();
  }, [userId]);

  useEffect(() => {
    if (selectedCatId) {
      methods.setValue('catId', selectedCatId);
    }
  }, [selectedCatId]);

  const handleCatSelect = (id: string) => {
    setSelectedCatId(id);
  };

  return (
    <FormProvider {...methods}>
      <Row>
        <Col span={4}>
          <InputNumberControl
            name="price"
            label={t('labels.price')}
            inputProps={{
              placeholder: t('placeholders.price'),
              min: 0,
            }}
            required
          />
        </Col>
        <Col span={24}>
          <Flex vertical gap={4}>
            {!isEdit ? (
              <>
                <b>{t('labels.cats')}</b>
                <Flex gap={24} wrap>
                  {cats &&
                    cats.length > 0 &&
                    cats.map((cat) => (
                      <CatItemInfo
                        data={cat}
                        key={cat.id}
                        isSelected={selectedCatId === cat.id}
                        onSelect={handleCatSelect}
                      />
                    ))}{' '}
                </Flex>
              </>
            ) : (
              <>
                <b>{t('labels.cat')}</b>
                <Flex>
                  {cat && <CatItemInfo data={cat} onSelect={handleCatSelect} />}
                </Flex>
              </>
            )}
          </Flex>
        </Col>
      </Row>
    </FormProvider>
  );
};
