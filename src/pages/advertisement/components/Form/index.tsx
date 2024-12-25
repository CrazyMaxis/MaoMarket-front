import { FormProvider, UseFormReturn } from 'react-hook-form';
import { Flex } from 'antd';
import { AdvertisementScheme } from 'schemes/advertisement';

interface IFormProps {
  methods: UseFormReturn<AdvertisementScheme>;
}

export const Form = ({ methods }: IFormProps) => {
  return (
    <FormProvider {...methods}>
      <Flex>
        <div></div>
      </Flex>
    </FormProvider>
  );
};
