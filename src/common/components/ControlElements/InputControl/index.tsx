import { InputProps } from 'antd';
import {
  ContextCotrollerProps,
  Feather,
  FormContextController,
  Input,
} from 'components';
import styles from './index.module.scss';

interface IInputControlProps extends ContextCotrollerProps<string> {
  inputProps?: InputProps;
  password?: boolean;
  includeSearchIcon?: boolean;
}

export const InputControl = ({
  inputProps,
  password,
  includeSearchIcon,
  disabled,
  ...props
}: IInputControlProps) => {
  return (
    <FormContextController {...props} disabled={disabled}>
      {(_, __, ___, field) => (
        <Input
          suffix={
            includeSearchIcon && (
              <Feather type="searchIcon" className={styles.searchIcon} />
            )
          }
          {...field}
          {...inputProps}
          password={password}
          disabled={disabled}
        />
      )}
    </FormContextController>
  );
};
