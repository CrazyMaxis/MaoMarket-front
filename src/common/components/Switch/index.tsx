import { ReactNode } from 'react';
import { Flex, Switch as AntdSwitch, SwitchProps } from 'antd';
import classNames from 'classnames';
import styles from './index.module.scss';

interface ISwitch extends SwitchProps {
  label?: ReactNode;
}

export const Switch = ({ label, ...props }: ISwitch) => {
  return (
    <Flex gap={8} align="center" className={styles.root}>
      <AntdSwitch className={styles.switch} {...props} />
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
