import { FormProvider, UseFormReturn } from 'react-hook-form';
import { CatScheme } from 'schemes/cat';
import { Collapse } from 'components';
import useFormItems from './hooks/useFormItems';

interface IFormProps {
  methods: UseFormReturn<CatScheme>;
}

export const Form = ({ methods }: IFormProps) => {
  const { formItems, keys } = useFormItems();

  return (
    <FormProvider {...methods}>
      <Collapse items={formItems} defaultActiveKey={keys} />
    </FormProvider>
  );
};
