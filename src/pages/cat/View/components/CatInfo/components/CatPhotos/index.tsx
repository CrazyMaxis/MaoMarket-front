import { Flex, Image } from 'antd';
import { ICat } from 'models/ICat';

interface ICatPhotosProps {
  cat: ICat;
}

export const CatPhotos = ({ cat }: ICatPhotosProps) => {
  return (
    <Image.PreviewGroup>
      <Flex gap={24}>
        {cat.photos.map((photo) => (
          <Image width={250} key={photo.id} src={photo.url} />
        ))}
      </Flex>
    </Image.PreviewGroup>
  );
};
