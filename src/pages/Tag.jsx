import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/slices/postsSlice';

import { Container, Typography, Grid } from '@mui/material';

import { Post } from '../components/Post';

export const Tag = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  const { tag } = useParams();

  const isPostsLoading = posts.status === 'loading';

  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    const filtered = [...posts.items].filter((e) => e.tags.includes(tag));
    setPostsData(filtered);
  }, [posts, tag]);

  return (
    <div>
      <Container maxWidth="lg">
        <Typography sx={{ color: '#E0E0E0', marginBottom: '30px', fontWeight: 400 }} variant="h3">
          #{tag}
        </Typography>
        <Grid container justifyContent="space-between" spacing={2} columns={12}>
          {(isPostsLoading ? [...Array(2)] : postsData).map((obj, index) =>
            isPostsLoading ? (
              <Grid item style={{ flexGrow: 1, flexShrink: 1, maxWidth: '50%' }} key={index}>
                <Post key={index} isLoading={true} />
              </Grid>
            ) : (
              <Grid item style={{ flexGrow: 1, flexShrink: 1, maxWidth: '50%' }} key={index}>
                <Post
                  key={obj._id}
                  id={obj._id}
                  title={obj.title}
                  imageUrl={obj.imageUrl && `http://localhost:8000${obj.imageUrl}`}
                  user={obj.user}
                  createdAt={obj.createdAt.split('T')[0]}
                  viewsCount={obj.viewsCount}
                  commentsCount={3}
                  tags={obj.tags}
                />
              </Grid>
            ),
          )}
        </Grid>
      </Container>
    </div>
  );
};
