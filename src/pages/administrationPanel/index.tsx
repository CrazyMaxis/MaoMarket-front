import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import { CommunicationHeader, Tabs } from 'components';
import { TAB_NODES } from './constants/tabs';

const AdministrationPanel = () => {
  const { t } = useTranslation('administrationPanel');

  return (
    <CommunicationHeader title={t('title')}>
      <Tabs instance="administrationPanel" tabs={TAB_NODES} />
      <Suspense>
        <Outlet />
      </Suspense>
    </CommunicationHeader>
  );
};

export default AdministrationPanel;
