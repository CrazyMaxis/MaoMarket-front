import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { ICat } from 'models/ICat';
import { CollapseInfoBlock } from 'components';

interface IGeneralDataProps {
  cat: ICat;
}

export const GeneralData = ({ cat }: IGeneralDataProps) => {
  const { t } = useTranslation('cat', {
    keyPrefix: 'view.generalData',
  });
  const { t: tCommon } = useTranslation('common');

  return (
    <CollapseInfoBlock
      infoItems={[
        {
          title: t('name'),
          value: cat?.name,
        },
        {
          title: t('gender'),
          value: tCommon(`gender.${cat?.gender}`),
        },
        {
          title: t('breed'),
          value: cat?.breed,
        },
        {
          title: t('isCattery'),
          value: t(`${cat?.isCattery}`),
        },
        {
          title: t('birthDate'),
          value: dayjs(cat?.birthDate).format('DD.MM.YYYY'),
        },
        {
          title: t('description'),
          value: cat?.description,
        },
      ]}
    />
  );
};
