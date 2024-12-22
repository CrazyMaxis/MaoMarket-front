import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Col, Flex, Image, Row } from 'antd';
import { FileControl } from 'components';

interface IPostImageProps {
  isEdit: boolean;
}

export const PostImage = ({ isEdit }: IPostImageProps) => {
  const { t } = useTranslation('news', { keyPrefix: 'form' });

  const { getValues } = useFormContext();

  const image = getValues('image');

  return (
    <Row gutter={8}>
      {!isEdit ? (
        <Col span={24}>
          <FileControl
            name="image"
            label={t('labels.image')}
            isSingle
            fileUploaderProps={{
              placeholder: t('placeholders.image'),
            }}
          />
        </Col>
      ) : (
        <>
          <Col span={24}>
            <Flex gap={16}>
              <FileControl
                name="newImage"
                label={t('labels.image')}
                isSingle
                fileUploaderProps={{
                  placeholder: t('placeholders.image'),
                }}
              />
            </Flex>
          </Col>
          <Col span={24}>
            <Flex vertical>
              <b>{t('oldImage')}</b>
              <Image src={image} width={300} />
            </Flex>
          </Col>
        </>
      )}
    </Row>
  );
};
