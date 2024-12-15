import { ReactNode } from 'react';
import { Flex } from 'antd';
import { Button, Feather } from 'components';
import useFieldsMapper from './hooks/useFieldsMapper';
import styles from './index.module.scss';

export interface IMapItemProps {
  id: number;
  onAppend: () => void;
  onRemove: (id: number) => void;
  isLastItem: boolean;
  fieldName: string;
}

interface IFormFieldsMapperProps {
  fieldName: string;
  titleAddButton?: string;
  addButton?: ReactNode;
  MapItem: ({
    id,
    onAppend,
    onRemove,
    isLastItem,
    fieldName,
  }: IMapItemProps) => ReactNode;
}

export const FormFieldsMapper = ({
  fieldName,
  MapItem,
  addButton,
  titleAddButton,
}: IFormFieldsMapperProps) => {
  const { fields, onAppend, onRemove } = useFieldsMapper({
    fieldName: fieldName,
  });

  return (
    <Flex gap={24} vertical>
      {!fields.length &&
        (addButton ?? (
          <div>
            <Button
              className={styles.buttonAdd}
              icon={<Feather type="plusIcon" />}
              onClick={onAppend}
            >
              {titleAddButton}
            </Button>
          </div>
        ))}
      {fields.map((field, idx) => (
        <MapItem
          id={idx}
          onAppend={onAppend}
          onRemove={onRemove}
          isLastItem={fields.length - 1 === idx}
          fieldName={fieldName}
          key={field.id}
        />
      ))}
    </Flex>
  );
};
