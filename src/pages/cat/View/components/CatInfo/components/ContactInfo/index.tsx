import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ICat } from 'models/ICat';
import { CollapseInfoBlock } from 'components';

interface IContactInfoProps {
  cat: ICat;
}

export const ContactInfo = ({ cat }: IContactInfoProps) => {
  const { t } = useTranslation('cat', {
    keyPrefix: 'view.contactInfo',
  });

  return (
    <>
      {cat.isCattery ? (
        <CollapseInfoBlock
          infoItems={[
            {
              title: t('fromCattery'),
              isOnlyTitle: true,
            },
            {
              title: t('address'),
              value: t('addressInfo'),
            },
            {
              title: t('email'),
              value: t('emailInfo'),
            },
            {
              title: t('phone'),
              value: t('phoneInfo'),
            },
          ]}
        />
      ) : (
        <CollapseInfoBlock
          infoItems={[
            {
              title: t('name'),
              value: cat.user.name,
            },
            {
              title: t('telegram'),
              value: cat.user.telegramUsername && (
                <Link
                  to={`https://t.me/${cat.user.telegramUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {cat.user.telegramUsername}
                </Link>
              ),
            },
            {
              title: t('email'),
              value: cat.user.email,
            },
            {
              title: t('phone'),
              value: cat.user.phoneNumber,
            },
          ]}
        />
      )}
    </>
  );
};
