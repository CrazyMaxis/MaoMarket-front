import { Flex, Image } from 'antd';
import { Feather } from 'components';
import {
  ContextCotrollerProps,
  FormContextController,
} from '../FormContextController';

interface IImage {
  id: string;
  url: string;
}

interface IImageControlProps
  extends Omit<ContextCotrollerProps<IImage[]>, 'name'> {
  name: string;
}

export const ImageControl = ({ name, ...props }: IImageControlProps) => {
  return (
    <FormContextController name={name} {...props}>
      {(value = [], setValue) => (
        <Flex gap={16} style={{ paddingTop: '8px' }}>
          <Image.PreviewGroup>
            {value.map((image: IImage, idx: number) => (
              <Flex key={image.id} gap={4} align="start">
                <Image src={image.url} width={250} />
                <Feather
                  type="closeIcon"
                  onClick={() => {
                    const updatedImages = value.filter(
                      (_, index) => index !== idx,
                    );
                    setValue(updatedImages);
                  }}
                />
              </Flex>
            ))}
          </Image.PreviewGroup>
        </Flex>
      )}
    </FormContextController>
  );
};
