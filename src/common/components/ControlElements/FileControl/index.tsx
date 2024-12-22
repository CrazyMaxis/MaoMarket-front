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
  isSingle?: boolean;
}

export const FileControl = ({
  name = 'file',
  fileUploaderProps,
  isSingle = false,
  ...props
}: IFileControlProps) => {
  return (
    <FormContextController name={name} {...props}>
      {(value, setValue) => (
        <Flex wrap gap={16}>
          <Uploader
            {...fileUploaderProps}
            onUpload={(files) => {
              const existingFiles = Array.isArray(value) ? value : [];

              const newFiles = isSingle
                ? [files[0]]
                : [...existingFiles, ...Object.values(files)];

              setValue(newFiles);
            }}
          />
          {value && value.length > 0 && <FilesViewItem name={name} />}
        </Flex>
      )}
    </FormContextController>
  );
};
