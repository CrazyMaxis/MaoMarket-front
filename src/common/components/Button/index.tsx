import { Button as AntdButton, ButtonProps as AntdButtonProps } from 'antd';
import classNames from 'classnames';
import styles from './index.module.scss';

const Button = ({
  type = 'primary',
  size = 'middle',
  className,
  ...props
}: AntdButtonProps) => {
  return (
    <AntdButton
      type={type}
      size={size}
      className={classNames(styles.button, styles[`${type}`], className)}
      {...props}
    >
      {!!props.children && props.children}
    </AntdButton>
  );
};

export { Button };
