import { ITab } from 'components';
import { PATH_ADMINISTRATION_PANEL } from 'routes/path';

export const TAB_NODES: ITab[] = [
  {
    i18key: 'tabs.assignRoles',
    url: PATH_ADMINISTRATION_PANEL.ASSIGN_ROLES,
  },
  {
    i18key: 'tabs.verifyRequests',
    url: PATH_ADMINISTRATION_PANEL.VERIFYREQUESTS,
  },
];
