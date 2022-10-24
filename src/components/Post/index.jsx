import React from 'react';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import clsx from 'clsx';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import classes from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { fetchRemovePost } from '../../redux/slices/postsSlice';

export const Post = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();

  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = () => {
    if (window.confirm('Are you sure you want to delete post?')) {
      dispatch(fetchRemovePost(id));
    }
  };

  return (
    <div className={clsx(classes.root, { [classes.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={classes.editButtons}>
          <Link to={`/post/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <img
          className={clsx(classes.image, { [classes.imageFull]: isFullPost })}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className={classes.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={classes.indention}>
          <h2 className={clsx(classes.title, { [classes.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/post/${id}`}>{title}</Link>}
          </h2>
          <ul className={classes.tags}>
            {tags.map((name, index) => (
              <li key={index}>
                <Link to={`/tag/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>
          {children && <div className={classes.content}>{children}</div>}
          <ul className={classes.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
