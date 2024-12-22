import { useFieldArray, useFormContext } from 'react-hook-form';
import { Flex, Image } from 'antd';
import { Feather } from 'components';

interface IFileItemProps {
  name: string;
}

const FilesViewItem = ({ name }: IFileItemProps) => {
  const { control, watch } = useFormContext();
  const { remove } = useFieldArray({
    control,
    name: name,
  });
  const files = watch(name);

  console.log(files);

  return (
    <Image.PreviewGroup>
      {files.map((img: File, idx: number) => (
        <Flex gap={4} align="start" key={idx}>
          <Image src={URL.createObjectURL(img)} width={250} />
          <Feather type="closeIcon" onClick={() => remove(idx)} />
        </Flex>
      ))}
    </Image.PreviewGroup>
  );
};

export default FilesViewItem;
