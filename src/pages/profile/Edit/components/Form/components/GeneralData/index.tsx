import { useTranslation } from 'react-i18next';
import { Col, Row } from 'antd';
import { InputControl } from 'components';

export const GeneralData = () => {
  const { t } = useTranslation('profile', { keyPrefix: 'form' });

  return (
    <Row gutter={8}>
      <Col lg={6}>
        <InputControl
          name="name"
          label={t('labels.name')}
          inputProps={{ placeholder: t('placeholders.name') }}
          required
        />
        <InputControl
          name="email"
          label={t('labels.email')}
          inputProps={{ placeholder: t('placeholders.email') }}
          required
          disabled
        />
        <InputControl
          name="phoneNumber"
          label={t('labels.phoneNumber')}
          inputProps={{ placeholder: t('placeholders.phoneNumber') }}
        />
        <InputControl
          name="telegramUsername"
          label={t('labels.telegramUsername')}
          inputProps={{ placeholder: t('placeholders.telegramUsername') }}
        />
      </Col>
    </Row>
  );
};
