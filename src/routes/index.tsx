import { lazy, ReactNode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Flex, Spin } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Roles } from 'enums/Roles';
import { CommonLayout } from 'components';
import { useAppSelector } from 'hooks/customReduxHooks';
import Page from './components/Page';
import { PATH, PATH_AUTHORIZATION } from './path';
import styles from './index.module.scss';

const Home = lazy(() => import('pages/home'));
const Authorization = lazy(() => import('pages/authorization'));
const Login = lazy(() => import('pages/authorization/Login'));
const Register = lazy(() => import('pages/authorization/Register'));
const Verify = lazy(() => import('pages/authorization/Verify'));

const Profile = lazy(() => import('pages/profile/View'));
const ProfileEdit = lazy(() => import('pages/profile/Edit'));

const ProtectedRouteByRole = ({
  roles,
  children,
}: {
  roles?: Roles[];
  children: ReactNode;
}) => {
  const userRole = useAppSelector((state) => state.auth.user?.role);

  if (!userRole) {
    return (
      <Flex align="center" justify="center" style={{ height: '400px' }}>
        <Spin size="large" />
      </Flex>
    );
  }
  return (
    <>{roles ? roles.includes(userRole) ? children : <h2>hui</h2> : children}</>
  );
};

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
            {
              path: PATH.PROFILE,
              element: <Page />,
              children: [
                {
                  element: <Profile />,
                  index: true,
                },
                {
                  path: 'edit',
                  element: <ProfileEdit />,
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
