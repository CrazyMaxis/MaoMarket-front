import { SelectProps } from 'antd';
import {
  ContextCotrollerProps,
  FormContextController,
  Select,
} from 'components';

interface ISelectControlProps extends ContextCotrollerProps<string> {
  selectProps?: SelectProps;
}

export const SelectControl = ({
  selectProps,
  disabled,
  ...props
}: ISelectControlProps) => {
  return (
    <FormContextController {...props} disabled={disabled}>
      {(_, __, ___, field) => (
        <Select {...field} {...selectProps} disabled={disabled} />
      )}
    </FormContextController>
  );
};
