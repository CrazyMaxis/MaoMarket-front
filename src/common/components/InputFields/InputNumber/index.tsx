import { forwardRef } from 'react';
import { InputNumber as AntdInputNumber, InputNumberProps } from 'antd';

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  function InputNumber({ ...props }, ref) {
    return <AntdInputNumber ref={ref} {...props} />;
  },
);
