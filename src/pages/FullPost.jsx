import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';

import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';

import ReactMarkdown from 'react-markdown';

export const FullPost = () => {
  const [postData, setPostData] = useState();
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/post/${id}`)
      .then((res) => {
        setPostData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert('getting post error');
      });
  }, [id]);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  } else
    return (
      <>
        <Post
          id={postData._id}
          title={postData.title}
          imageUrl={postData.imageUrl && `http://localhost:8000${postData.imageUrl}`}
          user={postData.user}
          createdAt={postData.createdAt}
          viewsCount={postData.viewsCount}
          commentsCount={3}
          tags={postData.tags}
          isFullPost>
          <ReactMarkdown children={postData.text} />
        </Post>

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
          isLoading={false}>
          <Index />
        </CommentsBlock>
      </>
    );
};
