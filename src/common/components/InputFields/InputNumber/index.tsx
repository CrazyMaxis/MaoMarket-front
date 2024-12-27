import { forwardRef } from 'react';
import { InputNumber as AntdInputNumber, InputNumberProps } from 'antd';
import classNames from 'classnames';
import styles from './index.module.scss';

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  function InputNumber({ className, ...props }, ref) {
    return (
      <AntdInputNumber
        ref={ref}
        className={classNames(styles.root, className)}
        {...props}
      />
    );
  },
);
