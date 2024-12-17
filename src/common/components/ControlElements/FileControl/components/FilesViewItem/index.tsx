import { useFieldArray, useFormContext } from 'react-hook-form';
import { Flex } from 'antd';
import { Feather } from 'components';
import styles from './index.module.scss';

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

  return (
    <Flex>
      {files.map((file: File, idx: number) => (
        <Flex gap={6} key={idx}>
          <span>{file.name}</span>
          <Feather
            type="closeIcon"
            onClick={() => remove(idx)}
            className={styles.closeIcon}
          />
        </Flex>
      ))}
    </Flex>
  );
};

export default FilesViewItem;
