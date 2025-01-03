import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Col, Layout, Row, Typography } from 'antd';
import { Button } from 'components';
import { PATH } from 'routes/path';
import catPath from 'assets/png/cat.png';
import styles from './index.module.scss';

const { Content } = Layout;
const { Title } = Typography;

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('home');

  const onNavigate = () => {
    navigate(PATH.ADVERTISEMENTS);
  };

  return (
    <Content className={styles.content}>
      <Row justify="center" align="middle" className={styles.centeredRow}>
        <Col>
          <img src={catPath} alt="Кот" className={styles.image} />
          <Title level={2}>{t('title')}</Title>
          <Button onClick={onNavigate}>{t('buttonDescription')}</Button>
        </Col>
      </Row>
    </Content>
  );
};

export default Home;
