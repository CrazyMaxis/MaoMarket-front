import { TextAreaProps } from 'antd/es/input';
import {
  ContextCotrollerProps,
  FormContextController,
  TextArea,
} from 'components';

interface ITextAreaControlProps extends ContextCotrollerProps<string> {
  textAreaProps?: TextAreaProps;
}

export const TextAreaControl = ({
  textAreaProps,
  disabled,
  ...props
}: ITextAreaControlProps) => {
  return (
    <FormContextController {...props} disabled={disabled}>
      {(_, __, ___, field) => (
        <TextArea {...field} {...textAreaProps} disabled={disabled} />
      )}
    </FormContextController>
  );
};
