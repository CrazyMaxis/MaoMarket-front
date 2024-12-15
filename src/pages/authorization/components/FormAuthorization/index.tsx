import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Col, Flex, Row } from 'antd';
import { getStateAuthLoading } from 'reduxApp/authentification';
import { Button, InputControl } from 'components';
import { useAppSelector } from 'hooks/customReduxHooks';
import useFormAuthorization from './hooks/useFormAuthorization';
import styles from './index.module.scss';

interface FormAuthorizationProps {
  toggleForm: () => void;
}

export const FormAuthorization = ({ toggleForm }: FormAuthorizationProps) => {
  const { t } = useTranslation('authorization');
  const { methods, onLogin } = useFormAuthorization();
  const isLoading = useAppSelector(getStateAuthLoading);

  return (
    <FormProvider {...methods}>
      <form>
        <Row className={styles.root}>
          <Col span={24}>
            <h1 className={styles.title}>{t('title')}</h1>
          </Col>
          <Col span={24}>
            <InputControl
              name="email"
              label={t('labels.email')}
              required
              inputProps={{
                placeholder: t('placeholders.email'),
              }}
            />
          </Col>
          <Col span={24}>
            <InputControl
              name="password"
              label={t('labels.password')}
              required
              inputProps={{
                placeholder: t('placeholders.password'),
              }}
              password
            />
          </Col>
          <Col span={24}>
            <Button
              onClick={onLogin}
              className={styles.buttonLogin}
              loading={isLoading}
              htmlType="submit"
            >
              {t('enter')}
            </Button>
          </Col>
          <Col span={24}>
            <Flex justify="space-between">
              <Button type="link" onClick={toggleForm}>
                {t('haventAccount')}
              </Button>
              <Button type="link">{t('forgot')}</Button>
            </Flex>
          </Col>
        </Row>
      </form>
    </FormProvider>
  );
};
