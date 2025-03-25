import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import { CommunicationHeader, Tabs } from 'components';
import { TAB_NODES } from './constants/tabs';
import useTabActions from './hooks/useTabActions';

const AdministrationPanel = () => {
  const { t } = useTranslation('administrationPanel');

  const { headerButtons, onSetActiveTab } = useTabActions();

  return (
    <CommunicationHeader title={t('title')} buttons={headerButtons}>
      <Tabs
        instance="administrationPanel"
        tabs={TAB_NODES}
        onClickItem={onSetActiveTab}
      />
      <Suspense>
        <Outlet />
      </Suspense>
    </CommunicationHeader>
  );
};

export default AdministrationPanel;
