import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonProps } from 'antd';
import classNames from 'classnames';
import { Button, Feather } from '../../../../';
import styles from './index.module.scss';

export interface IFileUploaderProps extends ButtonProps {
  onUpload?: (files: FileList) => void;
  accept?: string;
  multi?: boolean;
  placeholder?: string;
}

export const Uploader = ({
  onUpload,
  multi,
  accept,
  placeholder,
}: IFileUploaderProps) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const { t } = useTranslation();

  const onClickButton = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  return (
    <div
      className={styles.inner}
      onDragOver={() => setDrag(true)}
      onDragLeave={() => setDrag(false)}
    >
      <div className={styles.input}>
        <input
          accept={accept}
          multiple={multi}
          onChange={(event) => {
            if (event.target.files && onUpload) {
              onUpload(event.target.files);
            }
          }}
          ref={fileRef}
          type="file"
        />
        <Button
          icon={<Feather type="uploadIcon" rotate={180} />}
          onClick={onClickButton}
          className={classNames({ [styles.drag]: drag })}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);

            onUpload && onUpload(e.dataTransfer.files);
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
        >
          {placeholder || t('fileUpload')}
        </Button>
      </div>
    </div>
  );
};
