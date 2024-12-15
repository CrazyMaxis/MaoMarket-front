import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Content } from 'antd/es/layout/layout';
import { CommonLayout } from 'components';
import Page from './components/Page';
import { PATH, PATH_AUTHORIZATION } from './path';
import styles from './index.module.scss';

const Home = lazy(() => import('pages/home'));
const Authorization = lazy(() => import('pages/authorization'));
const Login = lazy(() => import('pages/authorization/Login'));
const Register = lazy(() => import('pages/authorization/Register'));
const Verify = lazy(() => import('pages/authorization/Verify'));

export const Router = () => (
  <RouterProvider
    router={createBrowserRouter(
      [
        {
          element: <CommonLayout />,
          path: PATH.HOME,
          errorElement: (
            <Content className={styles.content}>
              <h2>Not Found</h2>
            </Content>
          ),
          children: [
            {
              path: PATH.HOME,
              element: <Page />,
              children: [{ element: <Home />, index: true }],
            },
            {
              path: PATH.AUTHARIZATION,
              element: <Authorization />,
              children: [
                {
                  path: PATH_AUTHORIZATION.LOGIN,
                  element: <Login />,
                  index: true,
                },
                {
                  path: PATH_AUTHORIZATION.REGISTER,
                  element: <Register />,
                },
                {
                  path: PATH_AUTHORIZATION.VERIFY,
                  element: <Verify />,
                },
              ],
            },
          ],
        },
      ],
      { basename: '/' },
    )}
  />
);
