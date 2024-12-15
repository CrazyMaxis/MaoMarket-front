import { ReactNode } from 'react';
import { CheckboxProps } from 'antd';
import classNames from 'classnames';
import {
  Checkbox,
  ContextCotrollerProps,
  FormContextController,
} from 'components';
import styles from './index.module.scss';

type CheckboxControlProps = ContextCotrollerProps<boolean> & {
  checkboxProps?: Omit<CheckboxProps, 'children'>;
  children?: ReactNode;
};

export const CheckboxControl = ({
  checkboxProps,
  layout = 'horizontal',
  children,
  disabled,
  className,
  ...props
}: CheckboxControlProps) => {
  return (
    <FormContextController<boolean>
      {...props}
      layout={layout}
      disabled={disabled}
      className={classNames(styles.root, className)}
    >
      {(value, setValue) => {
        return (
          <Checkbox
            checked={value}
            onClick={() => setValue(!value)}
            {...checkboxProps}
            disabled={disabled}
          >
            {children}
          </Checkbox>
        );
      }}
    </FormContextController>
  );
};
