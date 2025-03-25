import { ITab } from 'components';
import { PATH_ADMINISTRATION_PANEL } from 'routes/path';
import { TabType } from '../enum/TabsType';

export const TAB_NODES: ITab[] = [
  {
    i18key: 'tabs.assignRoles',
    url: PATH_ADMINISTRATION_PANEL.ASSIGN_ROLES,
    activeTabKey: TabType.ASSIGN_ROLES,
  },
  {
    i18key: 'tabs.verifyRequests',
    url: PATH_ADMINISTRATION_PANEL.VERIFY_REQUESTS,
    activeTabKey: TabType.VERIFY_REQUESTS,
  },
  {
    i18key: 'tabs.catteryCats',
    url: PATH_ADMINISTRATION_PANEL.CATTERY_CATS,
    activeTabKey: TabType.CATTERY_CATS,
  },
  {
    i18key: 'tabs.breeds',
    url: PATH_ADMINISTRATION_PANEL.BREEDS,
    activeTabKey: TabType.BREEDS,
  },
];
