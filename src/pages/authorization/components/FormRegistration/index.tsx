import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Col, Flex, Row } from 'antd';
import { getStateAuthLoading } from 'reduxApp/authentification';
import { Button, InputControl } from 'components';
import { useAppSelector } from 'hooks/customReduxHooks';
import { useFormRegistration } from './hooks/useFormRegistration';
import { useFormVerify } from './hooks/useFormVerify';
import styles from './index.module.scss';

interface FormRegistrationProps {
  toggleForm: () => void;
}

export const FormRegistration = ({ toggleForm }: FormRegistrationProps) => {
  const { t } = useTranslation('registration');
  const { methodsRegister, onRegister, isVerify } = useFormRegistration();
  const { methodsVerify, onVerify } = useFormVerify();
  const isLoading = useAppSelector(getStateAuthLoading);

  return (
    <>
      {!isVerify ? (
        <FormProvider {...methodsRegister}>
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
                  <Button type="link" onClick={toggleForm}>
                    {t('haveAccount')}
                  </Button>
                </Flex>
              </Col>
            </Row>
          </form>
        </FormProvider>
      ) : (
        <FormProvider {...methodsVerify}>
          <form>
            <Row className={styles.root}>
              <Col span={24}>
                <h1 className={styles.title}>{t('titleVerify')}</h1>
              </Col>
              <Col span={24}>
                <InputControl
                  name="code"
                  label={t('labels.code')}
                  required
                  inputProps={{
                    placeholder: t('placeholders.code'),
                  }}
                />
              </Col>
              <Col span={24}>
                <Button
                  onClick={onVerify}
                  className={styles.buttonRegister}
                  loading={isLoading}
                  htmlType="submit"
                >
                  {t('enter')}
                </Button>
              </Col>
            </Row>
          </form>
        </FormProvider>
      )}
    </>
  );
};
