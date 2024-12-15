import { DatePickerProps } from 'antd';
import { DATE_SHORT_FORMAT } from 'constants/formatsDate';
import dayjs, { Dayjs } from 'dayjs';
import {
  ContextCotrollerProps,
  DatePicker,
  FormContextController,
} from 'components';

interface IDatePickerControlProps
  extends ContextCotrollerProps<Dayjs | string> {
  datePickerProps?: DatePickerProps;
  formatOut?: string;
}

export const DatePickerControl = ({
  datePickerProps,
  formatOut,
  disabled,
  ...props
}: IDatePickerControlProps) => {
  return (
    <FormContextController {...props} disabled={disabled}>
      {(value, setValue, ___, field) => (
        <DatePicker
          format={DATE_SHORT_FORMAT}
          {...field}
          {...datePickerProps}
          value={value ? dayjs(value) : undefined}
          onChange={(date) => {
            setValue(date?.format(formatOut));
          }}
          disabled={disabled}
        />
      )}
    </FormContextController>
  );
};
