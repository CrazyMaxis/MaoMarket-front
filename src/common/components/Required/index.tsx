import { ReactNode } from 'react';
import styles from './index.module.scss';

interface IRequiredProps {
  children: ReactNode;
}

export const Required = ({ children }: IRequiredProps) => (
  <>
    {children}
    <span className={styles.asterisk}>*</span>
  </>
);
