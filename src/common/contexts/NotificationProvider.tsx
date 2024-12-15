import React from 'react';
import { notification } from 'antd';
import type { NotificationInstance } from 'antd/es/notification/interface';
import { ArgsProps } from 'antd/lib/notification';
import { Feather } from 'components';
import getViewportContainer from 'utils/get-viewport-container';

export type NotificationProviderProps = {
  notification: NotificationInstance;
};

export const NotificationContext =
  React.createContext<NotificationProviderProps>({
    notification: {} as unknown as NotificationInstance,
  });

export const withNotification =
  <P extends object>(
    Component: React.ComponentType<P>,
  ): React.FC<Omit<P, keyof NotificationProviderProps>> =>
  // eslint-disable-next-line react/display-name
  (props) => (
    <NotificationContext.Consumer>
      {(value) => (
        <Component {...(props as P)} notification={value.notification} />
      )}
    </NotificationContext.Consumer>
  );

export default function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notificationApi, notificationContextHolder] =
    notification.useNotification({
      duration: 3,
      placement: 'bottomLeft',
      getContainer: getViewportContainer,
    });

  const customNotification = {
    ...notificationApi,
    success: (args: ArgsProps) =>
      notificationApi.success({
        ...args,
        icon: <Feather type="successIcon" />,
        closeIcon: <Feather type="closeIcon" />,
      }),
    warning: (args: ArgsProps) =>
      notificationApi.warning({
        ...args,
        icon: <Feather type="warningIcon" />,
        closeIcon: <Feather type="closeIcon" />,
      }),
    error: (args: ArgsProps) =>
      notificationApi.error({
        ...args,
        icon: <Feather type="errorIcon" />,
        closeIcon: <Feather type="closeIcon" />,
      }),
    info: (args: ArgsProps) =>
      notificationApi.info({
        ...args,
        icon: <Feather type="infoIcon" />,
        closeIcon: <Feather type="closeIcon" />,
      }),
  };

  return (
    <NotificationContext.Provider
      value={{
        notification: customNotification,
      }}
    >
      {notificationContextHolder}
      {children}
    </NotificationContext.Provider>
  );
}
