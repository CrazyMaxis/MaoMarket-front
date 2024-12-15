import { forwardRef } from 'react';
import { DatePicker as AntdDatePicker, DatePickerProps } from 'antd';
import classNames from 'classnames';
import { PickerRef } from 'rc-picker/lib/interface';
import { Feather } from '../Feather';
import styles from './index.module.scss';

export const DatePicker = forwardRef<PickerRef, DatePickerProps>(
  function DatePicker(
    {
      className,
      suffixIcon = <Feather type="calendarIcon" className={styles.icon} />,
      ...props
    }: DatePickerProps,
    ref,
  ) {
    return (
      <AntdDatePicker
        ref={ref}
        className={classNames(styles.root, className)}
        suffixIcon={suffixIcon}
        {...props}
      />
    );
  },
);
