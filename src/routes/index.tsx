import { lazy, ReactNode } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useNavigate,
} from 'react-router-dom';
import { Flex, Spin } from 'antd';
import { Roles } from 'enums/Roles';
import { CommonLayout } from 'components';
import { useAppSelector } from 'hooks/customReduxHooks';
import Page from './components/Page';
import { PATH, PATH_ADMINISTRATION_PANEL, PATH_AUTHORIZATION } from './path';

const Home = lazy(() => import('pages/home'));
const Authorization = lazy(() => import('pages/authorization'));
const Login = lazy(() => import('pages/authorization/Login'));
const Register = lazy(() => import('pages/authorization/Register'));
const Verify = lazy(() => import('pages/authorization/Verify'));

const Profile = lazy(() => import('pages/profile/View'));
const ProfileEdit = lazy(() => import('pages/profile/Edit'));

const CatCreate = lazy(() => import('pages/cat/Create'));
const CatEdit = lazy(() => import('pages/cat/Edit'));
const CatView = lazy(() => import('pages/cat/View'));

const NewsList = lazy(() => import('pages/news/List'));
const NewsCreate = lazy(() => import('pages/news/Create'));
const PostEdit = lazy(() => import('pages/news/Edit'));
const PostView = lazy(() => import('pages/news/View'));

const AdministrationPanel = lazy(() => import('pages/administrationPanel'));
const AssignRoles = lazy(() => import('pages/administrationPanel/assignRoles'));
const VerifyRequests = lazy(
  () => import('pages/administrationPanel/verifyRequests'),
);

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

type ProtectedRouteByAuthProps = {
  children: ReactNode;
};

const ProtectedRouteByAuth = ({ children }: ProtectedRouteByAuthProps) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();

  if (isAuth === undefined) {
    return (
      <Flex align="center" justify="center" style={{ height: '400px' }}>
        <Spin size="large" />
      </Flex>
    );
  }

  if (!isAuth) {
    navigate(PATH.HOME);
  }

  return <>{children}</>;
};

type ProtectedRouteByNotAuthProps = {
  children: ReactNode;
};

const ProtectedRouteByNotAuth = ({
  children,
}: ProtectedRouteByNotAuthProps) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();

  if (isAuth === undefined) {
    return (
      <Flex align="center" justify="center" style={{ height: '400px' }}>
        <Spin size="large" />
      </Flex>
    );
  }

  if (isAuth) {
    navigate(PATH.HOME);
  }

  return <>{children}</>;
};

export const Router = () => (
  <RouterProvider
    router={createBrowserRouter(
      [
        {
          element: <CommonLayout />,
          path: PATH.HOME,
          errorElement: <Navigate to={PATH.HOME} />,
          children: [
            {
              path: PATH.HOME,
              element: <Page />,
              children: [{ element: <Home />, index: true }],
            },
            {
              path: PATH.AUTHARIZATION,
              element: (
                <ProtectedRouteByNotAuth>
                  <Authorization />
                </ProtectedRouteByNotAuth>
              ),
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
              element: (
                <ProtectedRouteByAuth>
                  <Page />
                </ProtectedRouteByAuth>
              ),
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
            {
              path: PATH.CAT,
              element: <Page />,
              children: [
                {
                  path: 'create',
                  element: <CatCreate />,
                },
                {
                  path: ':id',
                  element: <CatView />,
                },
                {
                  path: ':id/edit',
                  element: <CatEdit />,
                },
              ],
            },
            {
              path: PATH.NEWS,
              element: <Page />,
              children: [
                {
                  element: <NewsList />,
                  index: true,
                },
                {
                  path: 'create',
                  element: <NewsCreate />,
                },
                {
                  path: ':id',
                  element: <PostView />,
                },
                {
                  path: ':id/edit',
                  element: <PostEdit />,
                },
              ],
            },
            {
              path: PATH.ADMINISTRATION_PANEL,
              element: <AdministrationPanel />,
              children: [
                {
                  path: PATH_ADMINISTRATION_PANEL.ASSIGN_ROLES,
                  element: <AssignRoles />,
                  index: true,
                },
                {
                  path: PATH_ADMINISTRATION_PANEL.VERIFYREQUESTS,
                  element: <VerifyRequests />,
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
