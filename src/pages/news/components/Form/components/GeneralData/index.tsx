import { useTranslation } from 'react-i18next';
import { Col, Row } from 'antd';
import { InputControl, TextAreaControl } from 'components';

export const GeneralData = () => {
  const { t } = useTranslation('news', { keyPrefix: 'form' });

  return (
    <Row gutter={8}>
      <Col span={6}>
        <InputControl
          name="title"
          label={t('labels.title')}
          inputProps={{ placeholder: t('placeholders.title') }}
          required
        />
      </Col>
      <Col span={24}>
        <TextAreaControl
          name="body"
          label={t('labels.body')}
          textAreaProps={{
            placeholder: t('placeholders.body'),
          }}
          required
        />
      </Col>
    </Row>
  );
};
