import { ReactNode, useEffect } from 'react';
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from 'react-hook-form';
import { Form } from 'antd';
import type { FormItemLayout } from 'antd/es/form/Form';
import classNames from 'classnames';
import { Required } from 'components';
import styles from './index.module.scss';

export type ContextCotrollerProps<T> = Omit<
  FormContextControllerProps<T>,
  'children'
>;

type FormContextControllerProps<T> = {
  name: string;
  label?: ReactNode;
  layout?: FormItemLayout;
  required?: boolean;
  defaultValue?: T | null;
  className?: string;
  colon?: boolean;
  children:
    | React.ReactNode
    | ((
        value: T,
        setValue: (newValue: T) => void,
        state: ControllerFieldState,
        field: ControllerRenderProps<FieldValues, string>,
      ) => React.ReactNode);
  noStyle?: boolean;
  boldLabel?: boolean;
  disabled?: boolean;
};

export function FormContextController<T>({
  name,
  label,
  layout = 'vertical',
  colon = true,
  defaultValue,
  className,
  children,
  required,
  noStyle,
  boldLabel = true,
  disabled,
}: FormContextControllerProps<T>) {
  const { control, setValue } = useFormContext();

  const generateLabel = () => {
    if (label) {
      let labelNode: ReactNode = label;
      if (boldLabel) {
        labelNode = <b>{labelNode}</b>;
      }
      return required ? <Required>{labelNode}</Required> : labelNode;
    }
  };

  useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue);
    }
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field,
        fieldState,
      }: {
        field: ControllerRenderProps<FieldValues, string>;
        fieldState: ControllerFieldState;
      }) => (
        <Form.Item
          className={classNames(
            styles.item,
            {
              [styles.disabledItem]: disabled,
            },
            className,
          )}
          help={fieldState.error?.message}
          validateStatus={fieldState.error?.message ? 'error' : ''}
          colon={colon}
          label={generateLabel()}
          layout={layout}
          noStyle={noStyle}
        >
          {typeof children === 'function'
            ? children(field.value, field.onChange, fieldState, field)
            : children}
        </Form.Item>
      )}
    />
  );
}
