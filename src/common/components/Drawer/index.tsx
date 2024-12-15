import { Drawer as AntdDrawer } from 'antd';
import { DrawerProps } from 'antd/lib';
import classNames from 'classnames';
import styles from './index.module.scss';

export const Drawer = ({ width = 600, ...props }: DrawerProps) => {
  return (
    <AntdDrawer
      rootClassName={classNames(styles.root, props.rootClassName)}
      width={width}
      {...props}
    />
  );
};
