import { FormProvider, UseFormReturn } from 'react-hook-form';
import { ProfileScheme } from 'schemes/profile';
import { Collapse } from 'components';
import useFormItems from './hooks/useFormItems';

interface IFormProps {
  methods: UseFormReturn<ProfileScheme>;
}

export const Form = ({ methods }: IFormProps) => {
  const { formItems, keys } = useFormItems();

  return (
    <FormProvider {...methods}>
      <Collapse items={formItems} defaultActiveKey={keys} />
    </FormProvider>
  );
};
