import { InputNumberProps } from 'antd';
import {
  ContextCotrollerProps,
  FormContextController,
  InputNumber,
} from 'components';

interface IInputNumberControlProps extends ContextCotrollerProps<number> {
  inputProps?: InputNumberProps;
}

export const InputNumberControl = ({
  inputProps,
  disabled,
  ...props
}: IInputNumberControlProps) => {
  return (
    <FormContextController {...props} disabled={disabled}>
      {(_, __, ___, field) => (
        <InputNumber {...field} {...inputProps} disabled={disabled} />
      )}
    </FormContextController>
  );
};
