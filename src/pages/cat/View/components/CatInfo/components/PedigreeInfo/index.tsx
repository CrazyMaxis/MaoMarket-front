import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex } from 'antd';
import CatService from 'api/services/CatService';
import { ICat, ICatPedigree } from 'models/ICat';
import { CatItemInfo } from './components/CatItemInfo';
import styles from './index.module.scss';

interface IPedigreeInfoProps {
  cat: ICat;
}

export const PedigreeInfo = ({ cat }: IPedigreeInfoProps) => {
  const { t } = useTranslation('cat', {
    keyPrefix: 'view.pedigreeInfo',
  });
  const [pedigree, setPedigree] = useState<ICatPedigree>();

  const fetchPedigree = async () => {
    const response = await CatService.getCatPedigree(cat.id);
    setPedigree(response.data);
  };

  useEffect(() => {
    fetchPedigree();
  }, []);

  return (
    <>
      {pedigree && (
        <Flex gap={24} vertical className={styles.tree}>
          <Flex gap={16} vertical align="center">
            <div className={styles.title}>{t('parents')}</div>
            <Flex gap={32} justify="center">
              <Flex gap={8} vertical align="center">
                <div className={styles.subtitle}>{t('mother')}</div>
                {pedigree.mother ? (
                  <CatItemInfo data={pedigree.mother} />
                ) : (
                  <div className={styles.noInfo}>{t('noInfo')}</div>
                )}
              </Flex>
              <Flex gap={8} vertical align="center">
                <div className={styles.subtitle}>{t('father')}</div>
                {pedigree.father ? (
                  <CatItemInfo data={pedigree.father} />
                ) : (
                  <div className={styles.noInfo}>{t('noInfo')}</div>
                )}
              </Flex>
            </Flex>
          </Flex>

          <Flex gap={16} vertical align="center">
            <div className={styles.title}>{t('partner')}</div>
            {pedigree.partner ? (
              <Flex justify="center">
                <CatItemInfo data={pedigree.partner} />
              </Flex>
            ) : (
              <div className={styles.noInfo}>{t('noInfo')}</div>
            )}
          </Flex>

          <Flex gap={16} vertical align="center">
            <div className={styles.title}>{t('children')}</div>
            <Flex gap={16} justify="center">
              {pedigree.children.length > 0 ? (
                pedigree.children.map((child) => (
                  <CatItemInfo key={child.id} data={child} />
                ))
              ) : (
                <div className={styles.noInfo}>{t('noInfo')}</div>
              )}
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
};
