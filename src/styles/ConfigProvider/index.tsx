import { ReactNode, useEffect, useState } from 'react';
import { ConfigProvider as AntProvider, NotificationArgsProps } from 'antd';
import { PickerLocale } from 'antd/es/date-picker/generatePicker';
import Ru from 'antd/locale/ru_RU';
import i18next from 'i18next';
import { useAppSelector } from 'hooks/customReduxHooks';
import theme from '../theme';
import badgeStyles from './badge.module.scss';
import checkboxStyles from './checkbox.module.scss';
import inputStyles from './input.module.scss';
import notificationStyles from './notification.module.scss';
import radioStyles from './radio.module.scss';
import selectStyles from './select.module.scss';

const CalendarRu = {
  shortMonths:
    'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'.split(
      '_',
    ),
};

interface IConfigProvider {
  children: ReactNode;
}

export const providerOptions = {
  button: { className: 'buttonConfigAntd' },
  select: { className: selectStyles.root },
  input: { className: inputStyles.root },
  rangePicker: { className: 'rangePickerConfigAntd' },
  checkbox: { className: checkboxStyles.root },
  radio: { className: radioStyles.root },
  notification: { className: notificationStyles.root } as NotificationArgsProps,
  spin: { className: 'spinConfigAntd' },
  table: { className: 'tableConfigAntd' },
  badge: { className: badgeStyles.root },
  theme,
};

const ConfigProvider = ({ children }: IConfigProvider) => {
  const { isDisabledAntd, sizeAntd } = useAppSelector((state) => state.antd);
  const [lang, setLang] = useState(i18next.language);

  useEffect(() => {
    i18next.on('languageChanged', () => {
      setLang(i18next.language);
    });
  }, []);

  return (
    <AntProvider
      {...providerOptions}
      componentDisabled={isDisabledAntd}
      locale={
        lang === 'ru-RU'
          ? {
              ...Ru,
              Calendar: {
                ...Ru.Calendar,
                lang: { ...Ru.Calendar?.lang, ...CalendarRu },
              },
              DatePicker: {
                ...Ru.DatePicker,
                lang: { ...Ru.Calendar?.lang, ...CalendarRu },
              } as PickerLocale,
            }
          : Ru
      }
      componentSize={sizeAntd}
    >
      {children}
    </AntProvider>
  );
};

export default ConfigProvider;
