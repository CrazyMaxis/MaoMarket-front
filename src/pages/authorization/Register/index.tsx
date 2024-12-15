import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Col, Flex, Row } from 'antd';
import { getStateAuthLoading } from 'reduxApp/authentification';
import { Button, InputControl } from 'components';
import { useAppSelector } from 'hooks/customReduxHooks';
import { PATH, PATH_AUTHORIZATION } from 'routes/path';
import { useRegister } from './hooks/useRegister';
import styles from './index.module.scss';

const Register = () => {
  const { t } = useTranslation('registration');
  const { methods, onRegister } = useRegister();
  const isLoading = useAppSelector(getStateAuthLoading);
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`${PATH.AUTHARIZATION}/${PATH_AUTHORIZATION.LOGIN}`);
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
              name="name"
              label={t('labels.name')}
              required
              inputProps={{
                placeholder: t('placeholders.name'),
              }}
            />
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
              onClick={onRegister}
              className={styles.buttonRegister}
              loading={isLoading}
              htmlType="submit"
            >
              {t('enter')}
            </Button>
          </Col>
          <Col span={24}>
            <Flex>
              <Button type="link" onClick={onClick}>
                {t('haveAccount')}
              </Button>
            </Flex>
          </Col>
        </Row>
      </form>
    </FormProvider>
  );
};

export default Register;
