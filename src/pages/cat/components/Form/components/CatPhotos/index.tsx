import { useTranslation } from 'react-i18next';
import { Col, Flex, Row } from 'antd';
import { FileControl, ImageControl } from 'components';

interface ICatPhotosProps {
  isEdit: boolean;
}

export const CatPhotos = ({ isEdit }: ICatPhotosProps) => {
  const { t } = useTranslation('cat', { keyPrefix: 'form' });

  return (
    <Row gutter={8}>
      {!isEdit ? (
        <Col span={24}>
          <FileControl
            name="photos"
            label={t('labels.photos')}
            fileUploaderProps={{
              placeholder: t('placeholders.photos'),
              multi: true,
            }}
          />
        </Col>
      ) : (
        <>
          <Col span={24}>
            <Flex gap={16} wrap>
              <FileControl
                name="newPhotos"
                label={t('labels.photos')}
                fileUploaderProps={{
                  placeholder: t('placeholders.photos'),
                  multi: true,
                }}
              />
            </Flex>
          </Col>
          <Col span={24}>
            <b>{t('oldPhotos')}</b>
            <ImageControl name="photos" />
          </Col>
        </>
      )}
    </Row>
  );
};
