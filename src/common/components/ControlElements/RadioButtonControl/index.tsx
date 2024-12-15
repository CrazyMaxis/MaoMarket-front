import { ReactNode } from 'react';
import { RadioProps } from 'antd';
import {
  ContextCotrollerProps,
  FormContextController,
  RadioButton,
} from 'components';

type RadioButtonControlProps = ContextCotrollerProps<boolean> & {
  radioProps?: Omit<RadioProps, 'children'>;
  children?: ReactNode;
};

export const RadioButtonControl = ({
  radioProps,
  layout = 'horizontal',
  children,
  disabled,
  ...props
}: RadioButtonControlProps) => {
  return (
    <FormContextController<boolean>
      {...props}
      layout={layout}
      disabled={disabled}
    >
      {(value, setValue) => {
        return (
          <RadioButton
            checked={value}
            onClick={() => setValue(!value)}
            {...radioProps}
            disabled={disabled}
          >
            {children}
          </RadioButton>
        );
      }}
    </FormContextController>
  );
};
