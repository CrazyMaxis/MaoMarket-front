import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'antd';
import { getStateAuthLoading } from 'reduxApp/authentification';
import { Button, InputControl } from 'components';
import { useAppSelector } from 'hooks/customReduxHooks';
import { useVerify } from './hooks/useVerify';
import styles from './index.module.scss';

const Verify = () => {
  const { t } = useTranslation('verification');
  const { methods, onVerify } = useVerify();
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
  );
};

export default Verify;
