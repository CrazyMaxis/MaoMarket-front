import { ReactNode } from 'react';
import { Tooltip as AntdTooltip } from 'antd';
import { TooltipPropsWithTitle } from 'antd/es/tooltip';
import styles from './index.module.scss';

interface ITooltip extends TooltipPropsWithTitle {
  children: ReactNode;
}

export const Tooltip = ({ children, ...props }: ITooltip) => {
  return (
    <AntdTooltip overlayClassName={styles.overlay} {...props}>
      <div>{children}</div>
    </AntdTooltip>
  );
};
