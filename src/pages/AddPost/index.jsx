import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { Navigate, useNavigate, useParams, Link } from 'react-router-dom';

import { TextField, Paper, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';

import SimpleMDE from 'react-simplemde-editor';

import { useSelector } from 'react-redux';
import { AuthSelector } from '../../redux/slices/authSlice';

import axios from '../../axios';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';

export const AddPost = () => {
  const isAuth = useSelector(AuthSelector);

  const { id } = useParams(); //returns dynamic id from the URL
  const navigate = useNavigate();

  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setLoading] = useState(false);

  const inputFileRef = useRef(null);

  const { enqueueSnackbar } = useSnackbar();

  const isEditing = Boolean(id);

  useEffect(() => {
    if (id) {
      axios
        .get(`/post/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setText(data.text);
          setImageUrl(data.imageUrl);
          setTags(data.tags.join(','));
        })
        .catch((error) => {
          console.warn(error);
          alert('Getting post error');
        });
    }
  }, [id]);

  //upload file to server
  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);

      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert('Upload error');
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true);

      //object with filled fields
      const fields = {
        title,
        imageUrl,
        tags,
        text,
      };

      const { data } = isEditing
        ? await axios.patch(`/post/${id}`, fields)
        : await axios.post('/post', fields);

      const currentPostId = isEditing ? id : data._id;
      navigate(`/post/${currentPostId}`);

      enqueueSnackbar(isEditing ? 'Your post has been updated!' : 'Your post has been published!', {
        variant: 'success',
      });
    } catch (error) {
      console.warn(error);
      enqueueSnackbar('Upload error', {
        variant: 'error',
      });
    }
  };

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Start typing the story...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if (!window.localStorage.getItem('userToken') && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        disabled={imageUrl}
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="large">
        Load thumbnail
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <IconButton
            sx={{ marginLeft: '12px' }}
            onClick={onClickRemoveImage}
            aria-label="Delete image"
            size="large">
            <DeleteIcon color="dark" fontSize="inherit" />
          </IconButton>
          <img className={styles.image} src={`http://localhost:8000${imageUrl}`} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
      />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? 'Save' : 'Publish'}
        </Button>
        <Link to="/">
          <Button size="large">Cancel</Button>
        </Link>
      </div>
    </Paper>
  );
};
