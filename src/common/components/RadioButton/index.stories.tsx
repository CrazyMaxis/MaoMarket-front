import { RadioProps } from 'antd';
import { Meta } from '@storybook/react';
import { RadioButton } from '.';

export default {
  title: 'common/RadioButton - common компонент радио-кнопка',
  component: RadioButton,
  argTypes: {
    children: {
      control: 'text',
      description: 'Текст, отображаемый рядом с радио-кнопкой',
    },
    checked: {
      control: 'boolean',
      description: 'Состояние кнопки (выбрана/не выбрана)',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Состояние кнопки (активна/неактивна)',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    children: 'Текст рядом с кнопкой',
    checked: false,
    disabled: false,
  },
  parameters: {
    design: {
      type: 'figma',
      uri: 'https://www.figma.com/design/Teog5PYkWjnbtJH8elZt1a/DetSad-Library?node-id=1-22475&node-type=canvas&t=uzQ3IAT8K0pPNr2i-0',
    },
  },
} satisfies Meta<typeof RadioButton>;

const Template = (args: RadioProps) => <RadioButton {...args} />;

export const Default = Template.bind({});
