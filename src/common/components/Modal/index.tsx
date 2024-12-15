import { ReactNode } from 'react';
import { Flex, Modal as AntdModal, ModalProps as AntdModalProps } from 'antd';
import classNames from 'classnames';
import styles from './index.module.scss';

export interface IModalProps extends AntdModalProps {
  footerButtons?: ReactNode;
  icon?: ReactNode;
}

export const Modal = ({
  centered = true,
  closable = false,
  closeIcon = null,
  maskClosable = false,
  title,
  children,
  className,
  footerButtons,
  icon,
  ...props
}: IModalProps) => {
  return (
    <AntdModal
      {...props}
      centered={centered}
      closable={closable}
      closeIcon={closeIcon}
      maskClosable={maskClosable}
      destroyOnClose
      footer={footerButtons}
      className={classNames(styles.modal, className)}
    >
      <Flex gap={18} align="flex-start" className={styles.content}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <Flex gap={8} vertical>
          <div className={styles.title}>{title}</div>
          <div>{children}</div>
        </Flex>
      </Flex>
    </AntdModal>
  );
};
