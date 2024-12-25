import { Flex } from 'antd';
import { FilterForm } from './components/FitlerForm';
import { TableRequests } from './components/TableRequests';

const VerifyRequests = () => {
  return (
    <Flex vertical gap={8}>
      <FilterForm />
      <TableRequests />
    </Flex>
  );
};

export default VerifyRequests;
