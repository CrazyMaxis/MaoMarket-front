import { useState } from 'react';
import { Flex } from 'antd';
import CommentService from 'api/services/CommentService';
import dayjs from 'dayjs';
import { Roles } from 'enums/Roles';
import { IComment } from 'models/IComment';
import { getUser } from 'reduxApp/authentification';
import { Button, Feather } from 'components';
import { useAppSelector } from 'hooks/customReduxHooks';
import styles from './index.module.scss';

interface ICommnetInfoProps {
  comment: IComment;
  handleDelete: (commentId: string) => void;
}

export const CommentInfo = ({ comment, handleDelete }: ICommnetInfoProps) => {
  const [likes, setLikes] = useState(comment.likes || 0);
  const [dislikes, setDislikes] = useState(comment.dislikes || 0);
  const user = useAppSelector((state) => getUser(state));

  const onLike = async () => {
    await CommentService.reactComment(comment.id, 'Like');
    setLikes((prev) => prev + 1);
  };

  const onDislike = async () => {
    await CommentService.reactComment(comment.id, 'Dislike');
    setDislikes((prev) => prev + 1);
  };

  const onDelete = async () => {
    await CommentService.deleteComment(comment.id);
    handleDelete(comment.id);
  };

  dayjs.locale('ru');
  const date = dayjs(comment.createdAt);
  const formattedDate = date.format('DD MMMM YYYY, HH:mm:ss');

  const allowedRoles = [
    Roles.NEWS_EDITOR,
    Roles.MODERATOR,
    Roles.ADMINISTRATOR,
  ];

  return (
    <Flex gap={16} vertical className={styles.container}>
      <Flex align="center" justify="space-between">
        <b className={styles.sender}>{comment.user.name}</b>
        <Flex gap={16} align="center">
          <div>{formattedDate}</div>

          {user &&
            allowedRoles.includes(user.role) &&
            user.id === comment.user.id && (
              <Button icon={<Feather type="busketIcon" />} onClick={onDelete} />
            )}
        </Flex>
      </Flex>
      <div>{comment.body}</div>
      <Flex gap={16} justify="flex-end">
        <Button icon={<Feather type="like" />} onClick={onLike}>
          {likes}
        </Button>
        <Button icon={<Feather type="dislike" />} onClick={onDislike}>
          {dislikes}
        </Button>
      </Flex>
    </Flex>
  );
};
