import { forwardRef } from 'react';
import { Input as AntdInput } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import { TextAreaRef } from 'antd/es/input/TextArea';
import classNames from 'classnames';
import styles from './index.module.scss';

export const TextArea = forwardRef<TextAreaRef, TextAreaProps>(
  function TeatArea({ className, maxLength, showCount = true, ...props }, ref) {
    return (
      <AntdInput.TextArea
        ref={ref}
        className={classNames(styles.textArea, className)}
        maxLength={maxLength}
        showCount={!!maxLength && showCount}
        {...props}
      />
    );
  },
);
