import { Meta } from '@storybook/react';
import { Checkbox, ICheckboxProps } from '.';

export default {
  title: 'common/Checkbox - common компонент чекбокс',
  component: Checkbox,
  argTypes: {
    label: {
      control: 'text',
    },
    checked: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    label: 'Click me',
    checked: false,
    disabled: false,
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Teog5PYkWjnbtJH8elZt1a/DetSad-Library?node-id=1-22474&node-type=canvas&t=4ewTtL9uJY2Blg4p-0',
    },
  },
} satisfies Meta<typeof Checkbox>;

const Template = (args: ICheckboxProps) => <Checkbox {...args} />;

export const Default = Template.bind({});
