import { ReactNode } from 'react';
import { Checkbox as AntdCheckbox, CheckboxProps, Flex } from 'antd';
import classNames from 'classnames';
import styles from './index.module.scss';

export interface ICheckboxProps extends CheckboxProps {
  label?: ReactNode;
}

export const Checkbox = ({ label, ...props }: ICheckboxProps) => {
  return (
    <Flex gap={8} align="center" className={styles.root}>
      <AntdCheckbox {...props} />
      <div
        className={classNames(styles.label, {
          [styles.disabledLabel]: props.disabled,
        })}
      >
        {label}
      </div>
    </Flex>
  );
};
