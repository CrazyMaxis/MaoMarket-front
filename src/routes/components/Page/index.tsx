import { Outlet } from 'react-router-dom';
import { Content } from 'antd/es/layout/layout';

const Page = () => {
  return (
    <Content>
      <Outlet />
    </Content>
  );
};

export default Page;
