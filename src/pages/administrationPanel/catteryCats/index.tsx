import { Flex } from 'antd';
import { FilterForm } from './components/FilterForm';
import { List } from './components/List';

const CatteryCats = () => {
  return (
    <Flex vertical gap={8}>
      <FilterForm />
      <List />
    </Flex>
  );
};

export default CatteryCats;
