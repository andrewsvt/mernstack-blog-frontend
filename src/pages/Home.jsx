import React, { useEffect, useState } from 'react';

import { Tabs, Tab, Grid, Alert } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchTags } from '../redux/slices/postsSlice';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth.userData);

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  const [postsData, setPostsData] = useState([]);
  const [sortType, setSortType] = useState(0);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, [dispatch]);

  useEffect(() => {
    setPostsData([...posts.items].sort((a, b) => b.viewsCount - a.viewsCount));

    return () => {};
  }, [posts]);

  const handleTabChange = (event, newValue) => {
    setSortType(newValue);
  };

  return (
    <>
      <Tabs
        onChange={handleTabChange}
        style={{ marginBottom: 15 }}
        value={sortType}
        aria-label="basic tabs example">
        <Tab label="New" value={0} />
        <Tab label="Popular" value={1} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {!posts.items[0] && !isPostsLoading ? (
            <Alert severity="info">There is no posts</Alert>
          ) : (
            (isPostsLoading ? [...Array(5)] : sortType ? postsData : posts.items).map(
              (obj, index) =>
                isPostsLoading ? (
                  <Post key={index} isLoading={true} />
                ) : (
                  <Post
                    key={obj._id}
                    id={obj._id}
                    title={obj.title}
                    imageUrl={obj.imageUrl && process.env.REACT_APP_API_URL + obj.imageUrl}
                    user={obj.user}
                    createdAt={obj.createdAt.split('T')[0]}
                    viewsCount={obj.viewsCount}
                    commentsCount={3}
                    tags={obj.tags}
                    isEditable={userData?._id === obj.user._id}
                  />
                ),
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'John Snow',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Test comment',
              },
              {
                user: {
                  fullName: 'Felix Dolton',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'Test comment 2',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
