import { ThemeConfig } from 'antd';
import { components } from './components';
import colors from '../scss/palette.module.scss';

const theme: ThemeConfig = {
  token: {
    colorPrimary: colors['primary-color'],
    colorError: colors['error-color'],
    borderRadiusLG: 5,
  },
  components,
};

export default theme;
