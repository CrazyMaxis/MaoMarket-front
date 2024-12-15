import { useTranslation } from 'react-i18next';
import { Flex, Layout } from 'antd';
import { CommunicationHeader } from 'components';
import styles from './index.module.scss';

const Home = () => {
  const { t } = useTranslation('home');
  const { Content } = Layout;

  return (
    <Content className={styles.content}>
      <CommunicationHeader title={t('title')}>
        <Flex align="center" vertical>
          Привет!
        </Flex>
      </CommunicationHeader>
    </Content>
  );
};

export default Home;
