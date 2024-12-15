import { useFieldArray, useFormContext } from 'react-hook-form';

interface IFieldsMapperParams {
  fieldName: string;
}

const useFieldsMapper = ({ fieldName }: IFieldsMapperParams) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName,
  });

  const onAppend = () => {
    append({});
  };

  const onRemove = (idx: number) => {
    remove(idx);
  };

  return { fields, onAppend, onRemove };
};

export default useFieldsMapper;
