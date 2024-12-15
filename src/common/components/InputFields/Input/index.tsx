import { forwardRef, useMemo } from 'react';
import { Input as AntdInput, InputProps, InputRef } from 'antd';
import classNames from 'classnames';
import styles from './index.module.scss';

interface IInputProps extends InputProps {
  password?: boolean;
}

export const Input = forwardRef<InputRef, IInputProps>(function Input(
  { password, className, maxLength, showCount, ...props }: IInputProps,
  ref,
) {
  const InputNode = useMemo(() => {
    return password ? AntdInput.Password : AntdInput;
  }, [password]);

  return (
    <InputNode
      ref={ref}
      className={classNames(styles.input, className)}
      showCount={!!maxLength && showCount}
      maxLength={maxLength}
      {...props}
    />
  );
});
