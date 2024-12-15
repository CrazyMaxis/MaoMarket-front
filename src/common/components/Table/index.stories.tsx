import { Meta } from '@storybook/react';
import { ITableProps, Table } from '.';

export default {
  title: 'common/Table - компонент таблицы',
  component: Table,
  argTypes: {
    isSelecting: {
      control: 'boolean',
      description: 'Включает или отключает выбор строк в таблице',
      table: { defaultValue: { summary: 'true' } },
    },
    columns: {
      control: 'object',
      description: 'Столбцы таблицы, определяющие заголовки и данные',
    },
    dataSource: {
      control: 'object',
      description: 'Данные для отображения в таблице',
    },
    sortColumns: {
      control: 'object',
      description: 'Столбцы, которые нужно сортировать',
    },
    loading: {
      control: 'boolean',
      description: 'Показывает индикатор загрузки',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    isSelecting: true,
    columns: [
      {
        title: 'Название',
        dataIndex: 'name',
        width: 500,
        key: 'name',
      },
      {
        title: 'Возраст',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Адрес',
        dataIndex: 'address',
        key: 'address',
      },
    ],
    dataSource: [
      {
        key: '1',
        name: 'Джон',
        age: 32,
        address: '10 улица, Город',
      },
      {
        key: '2',
        name: 'Сара',
        age: 28,
        address: '20 улица, Город',
      },
    ],
    sortColumns: ['name'],
    loading: false,
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Teog5PYkWjnbtJH8elZt1a/DetSad-Library?node-id=1361-15418&t=Dzqzp4eJw3Jdcj08-4',
    },
  },
} satisfies Meta<typeof Table>;

const Template = (args: ITableProps) => <Table {...args} />;

export const Default = Template.bind({});
