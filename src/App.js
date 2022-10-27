import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AuthSelector, fetchAuthMe } from './redux/slices/authSlice';

import Container from '@mui/material/Container';
import { SnackbarProvider } from 'notistack';

import { Header } from './components';
import { Home, FullPost, Registration, AddPost, Login, Tag } from './pages';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(AuthSelector);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<FullPost />} />
          <Route path="/post/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/tags/:tag" element={<Tag />} />
        </Routes>
      </Container>
    </SnackbarProvider>
  );
}

export default App;
