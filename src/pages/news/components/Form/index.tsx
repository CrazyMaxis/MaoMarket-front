import { FormProvider, UseFormReturn } from 'react-hook-form';
import { PostScheme } from 'schemes/post';
import { Collapse } from 'components';
import useFormItems from './hooks/useFormItems';

interface IFormProps {
  methods: UseFormReturn<PostScheme>;
}

export const Form = ({ methods }: IFormProps) => {
  const { formItems, keys } = useFormItems();

  return (
    <FormProvider {...methods}>
      <Collapse items={formItems} defaultActiveKey={keys} />
    </FormProvider>
  );
};
