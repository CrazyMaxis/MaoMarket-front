import { Radio, RadioProps } from 'antd';

export const RadioButton = ({ ...props }: RadioProps) => {
  return <Radio {...props}>{props.children}</Radio>;
};
