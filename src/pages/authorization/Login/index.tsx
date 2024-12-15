import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Col, Flex, Row } from 'antd';
import { getStateAuthLoading } from 'reduxApp/authentification';
import { Button, InputControl } from 'components';
import { useAppSelector } from 'hooks/customReduxHooks';
import { PATH, PATH_AUTHORIZATION } from 'routes/path';
import { useLogin } from './hooks/useLogin';
import styles from './index.module.scss';

const Login = () => {
  const { t } = useTranslation('authorization');
  const { methods, onLogin } = useLogin();
  const isLoading = useAppSelector(getStateAuthLoading);
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`${PATH.AUTHARIZATION}/${PATH_AUTHORIZATION.REGISTER}`);
  };

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
              <Button type="link" onClick={onClick}>
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

export default Login;
