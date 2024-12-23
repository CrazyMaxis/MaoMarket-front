import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Flex } from 'antd';
import CommentService from 'api/services/CommentService';
import { IComment } from 'models/IComment';
import useDataLoader from 'hooks/useDataLoader';
import { CommentForm } from './components/CommentForm';
import { CommentInfo } from './components/CommentInfo';
import styles from './index.module.scss';

export const Comments = () => {
  const { t } = useTranslation('comment');
  const { id } = useParams();
  const [comments, setComments] = useState<IComment[]>([]);
  const [refresh, setRefresh] = useState(false);
  const { loadData, isLoading, res } = useDataLoader(
    CommentService.getComments,
  );

  useEffect(() => {
    loadData(id);
  }, [refresh]);

  useEffect(() => {
    setComments(res?.data);
  }, [res?.data]);

  const handleDelete = (commentId: string) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId),
    );
  };

  const handleCommentCreate = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <Flex vertical gap={24} className={styles.container}>
      {comments && comments.length > 0 ? (
        comments.map((comment: IComment) => (
          <CommentInfo
            comment={comment}
            key={comment.id}
            handleDelete={handleDelete}
          />
        ))
      ) : (
        <Flex>{t('noComment')}</Flex>
      )}
      <CommentForm handleCommentCreate={handleCommentCreate} />
    </Flex>
  );
};
