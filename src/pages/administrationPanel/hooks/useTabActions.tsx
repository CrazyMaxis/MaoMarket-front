import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ITab } from 'components';
import BreedsHeaderButtons from '../breeds/components/BreedsHeaderButtons';
import { TAB_CONFIG_MAP } from '../constants/tabsConfig';
import { TabType } from '../enum/TabsType';

const useTabActions = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop() || '';
  const initialActiveTab = TAB_CONFIG_MAP[currentPath];
  const [activeTab, setActiveTabState] = useState<ITab>(initialActiveTab);

  const onSetActiveTab = (item: ITab) => {
    setActiveTabState(item);
  };

  const headerButtons = useMemo(() => {
    switch (activeTab.activeTabKey) {
      case TabType.BREEDS:
        return <BreedsHeaderButtons />;
      default:
        return <></>;
    }
  }, [activeTab.activeTabKey]);

  return { headerButtons, onSetActiveTab };
};

export default useTabActions;
