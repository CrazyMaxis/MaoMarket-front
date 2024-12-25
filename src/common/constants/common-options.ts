import { DefaultOptionType } from 'antd/es/select';
import { Roles } from 'enums/Roles';
import { SortOrder } from 'enums/SortOrder';
import i18next from 'i18next';

const generateOptions = <T extends string>(
  enumObj: { [key: string]: T },
  i18nKey: string,
) =>
  Object.values(enumObj).map((value) => ({
    label: i18next.t(`common:${i18nKey}.${value}`),
    value: value,
  }));

export const ROLES_OPTIONS = () => generateOptions(Roles, 'roles');

export const SORT_ORDER_OPTIONS = () => generateOptions(SortOrder, 'sortOrder');

export const IS_BLOCKED_OPTIONS = (): DefaultOptionType[] => [
  { label: i18next.t('common:isBlocked.BLOCKED'), value: 1 },
  { label: i18next.t('common:isBlocked.NOT_BLOCKED'), value: 0 },
];
