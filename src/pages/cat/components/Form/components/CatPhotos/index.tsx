import { useTranslation } from 'react-i18next';
import { Col, Row } from 'antd';
import { FileControl } from 'components';

export const CatPhotos = () => {
  const { t } = useTranslation('cat', { keyPrefix: 'form' });

  return (
    <Row gutter={8}>
      <Col span={6}>
        <FileControl
          name="photos"
          label={t('labels.photos')}
          fileUploaderProps={{
            placeholder: t('placeholders.photos'),
            multi: true,
          }}
        />
      </Col>
    </Row>
  );
};
