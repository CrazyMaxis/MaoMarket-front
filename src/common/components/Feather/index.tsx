import AntdIcon from '@ant-design/icons';
import { ReactComponent as arrowDown } from 'assets/svg/arrowDown.svg';
import { ReactComponent as arrowLeft } from 'assets/svg/arrowLeft.svg';
import { ReactComponent as arrowRight } from 'assets/svg/arrowRight.svg';
import { ReactComponent as arrowUp } from 'assets/svg/arrowUp.svg';
import { ReactComponent as bell } from 'assets/svg/bell.svg';
import { ReactComponent as burger } from 'assets/svg/burger.svg';
import { ReactComponent as busketIcon } from 'assets/svg/busketIcon.svg';
import { ReactComponent as calendarIcon } from 'assets/svg/calendarIcon.svg';
import { ReactComponent as closeIcon } from 'assets/svg/closeIcon.svg';
import { ReactComponent as errorIcon } from 'assets/svg/errorIcon.svg';
import { ReactComponent as infoIcon } from 'assets/svg/infoIcon.svg';
import { ReactComponent as logo } from 'assets/svg/logo.svg';
import { ReactComponent as pencil } from 'assets/svg/pencil.svg';
import { ReactComponent as plusIcon } from 'assets/svg/plusIcon.svg';
import { ReactComponent as reset } from 'assets/svg/reset.svg';
import { ReactComponent as saveIcon } from 'assets/svg/saveIcon.svg';
import { ReactComponent as searchIcon } from 'assets/svg/searchIcon.svg';
import { ReactComponent as settings } from 'assets/svg/settings.svg';
import { ReactComponent as successIcon } from 'assets/svg/successIcon.svg';
import { ReactComponent as tableArrows } from 'assets/svg/tableArrows.svg';
import { ReactComponent as textEDSLogo } from 'assets/svg/textForLogoEDS.svg';
import { ReactComponent as userInCircle } from 'assets/svg/userInCircle.svg';
import { ReactComponent as warningIcon } from 'assets/svg/warningIcon.svg';

export type IconProps = Parameters<typeof AntdIcon>[0];

const icons = {
  reset,
  successIcon,
  busketIcon,
  errorIcon,
  warningIcon,
  searchIcon,
  calendarIcon,
  infoIcon,
  logo,
  textEDSLogo,
  bell,
  userInCircle,
  arrowDown,
  arrowUp,
  arrowLeft,
  arrowRight,
  pencil,
  closeIcon,
  burger,
  settings,
  tableArrows,
  plusIcon,
  saveIcon,
};

export type FeatherIconTypes = keyof typeof icons;

export interface FeatherProps extends IconProps {
  type: FeatherIconTypes;
}

export const Feather = ({ type, ...props }: FeatherProps) => {
  const component = icons[type];

  return <AntdIcon component={component} {...props} />;
};
