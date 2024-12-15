import { Collapse as AntdCollapse, CollapseProps } from 'antd';
import classNames from 'classnames';
import { Feather } from '../Feather';
import styles from './index.module.scss';

export const Collapse = ({
  className,
  expandIcon = ({ isActive }) => (
    <Feather size={16} type="arrowDown" rotate={isActive ? 180 : 0} />
  ),
  ...props
}: CollapseProps) => {
  return (
    <AntdCollapse
      {...props}
      className={classNames(styles.root, className)}
      expandIcon={expandIcon}
      ghost
    />
  );
};
