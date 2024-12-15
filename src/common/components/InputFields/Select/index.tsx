import { forwardRef } from 'react';
import { Select as AntdSelect, SelectProps } from 'antd';
import classNames from 'classnames';
import { BaseSelectRef } from 'rc-select/lib/BaseSelect';
import styles from './index.module.scss';

export const Select = forwardRef<BaseSelectRef, SelectProps>(function Select(
  { className, ...props },
  ref,
) {
  return (
    <AntdSelect
      ref={ref}
      className={classNames(styles.root, className)}
      {...props}
    />
  );
});
