import { Meta } from '@storybook/react';
import { Collapse } from '.';
import { CollapseProps } from 'antd';
import { Feather } from '../Feather';

export default {
  title: 'common/Collapse - common компонент колапс',
  component: Collapse,
  argTypes: {
    className: {
      control: 'text',
    },
    expandIcon: {
      control: 'object',
      description: 'Иконка, отобращающая состояние колапса',
    },
    items: {
      control: 'object',
      description:
        'Элементы колапса;  [Применительно для форм, когда надо убрать padding снизу, то в свойство className элемента стоит присвоить `hidePadding`]',
    },
    defaultActiveKey: {
      control: 'object',
      description: 'Ключи для элементов колапса, которые по умолчанию открыты',
    },
    accordion: {
      control: 'boolean',
      description:
        'Флаг, меняющий поведение колапса по аналогии поведения аккордеона',
    },
  },
  args: {
    className: '',
    items: [
      { key: '1', label: 'test1', children: 'test1' },
      { key: '2', label: 'test2', children: 'test2', className: 'hidePadding' },
      { key: '3', label: 'test3', children: 'test3' },
    ],
    defaultActiveKey: ['1'],
    accordion: false,
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Teog5PYkWjnbtJH8elZt1a/DetSad-Library?node-id=4364-122380&t=XL45rpWpGwzOCLx8-4',
    },
  },
} satisfies Meta<typeof Collapse>;

const Template = (args: CollapseProps) => <Collapse {...args} />;

export const Default = Template.bind({});
