import { Meta } from '@storybook/react';
import { Feather } from '../Feather';
import { IStatusProps, Status } from '.';

export default {
  title: 'common/Status - компонент статуса',
  component: Status,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: [
          'default',
          'ghost',
          'success',
          'error',
          'progress',
          'attention',
        ],
      },
      description: 'Тип статуса, определяющий стилизацию компонента.',
      defaultValue: 'default',
    },
    icon: {
      control: 'object',
      description: 'Иконка, отображаемая слева от текста статуса.',
    },
    children: {
      control: 'text',
      description: 'Текст, отображаемый внутри компонента статуса.',
    },
  },
  args: {
    type: 'default',
    icon: <Feather type="settings" />,
    children: 'Статус компонент',
  },
  parameters: {
    design: {
      type: 'figma',
      uri: 'https://www.figma.com/design/Teog5PYkWjnbtJH8elZt1a/DetSad-Library?node-id=1150-32609&t=8h45CqWUDwtamThB-4',
    },
  },
} satisfies Meta<typeof Status>;

const Template = (args: IStatusProps) => <Status {...args} />;

export const Default = Template.bind({});
