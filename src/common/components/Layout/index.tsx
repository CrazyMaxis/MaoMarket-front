import { ReactNode, Suspense } from 'react';
import { Outlet } from 'react-router';
import { ScrollRestoration } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import { Content } from 'antd/es/layout/layout';
import ModalProvider from 'contexts/ModalProvider';
import NotificationProvider from 'contexts/NotificationProvider';
import Footer from './Footer';
import Header from './Header';
import styles from './index.module.scss';

interface ICommonLayout {
  children?: ReactNode;
}

export const CommonLayout = ({ children }: ICommonLayout) => {
  return (
    <Layout className={styles.wrapper}>
      <NotificationProvider>
        <ModalProvider>
          <Header />
          <Suspense
            fallback={
              <Content
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Spin size="large" />
              </Content>
            }
          >
            {children ? children : <Outlet />}
            <ScrollRestoration />
          </Suspense>
          <Footer />
        </ModalProvider>
      </NotificationProvider>
    </Layout>
  );
};
