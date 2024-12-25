import { Flex } from 'antd';
import { FilterForm } from './components/FilterForm';
import { TableUsers } from './components/TableUsers';

const AssignRoles = () => {
  return (
    <Flex vertical gap={8}>
      <FilterForm />
      <TableUsers />
    </Flex>
  );
};

export default AssignRoles;
