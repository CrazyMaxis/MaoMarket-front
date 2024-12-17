import { Flex } from 'antd';
import {
  ContextCotrollerProps,
  FormContextController,
} from '../FormContextController';
import FilesViewItem from './components/FilesViewItem';
import { IFileUploaderProps, Uploader } from './components/Uploader';

interface IFileControlProps
  extends Omit<ContextCotrollerProps<File[]>, 'name'> {
  name?: string;
  fileUploaderProps?: IFileUploaderProps;
}

export const FileControl = ({
  name = 'file',
  fileUploaderProps,
  ...props
}: IFileControlProps) => {
  return (
    <FormContextController name={name} {...props}>
      {(value, setValue) => (
        <Flex vertical>
          <Uploader
            {...fileUploaderProps}
            onUpload={(files) => setValue(Object.values(files))}
          />
          {value && !!value.length && <FilesViewItem name={name} />}
        </Flex>
      )}
    </FormContextController>
  );
};
