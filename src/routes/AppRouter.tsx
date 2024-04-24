import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

// components
import Login from '../pages/Auth/Auth';
import Feed from '../pages/Feed/Feed';
import NotFound from '../pages/NotFound/NotFound';
import PrivateRoute from '../components/PrivateRoute';
import Presets from '../pages/Presets/Presets';
import FeedExpand from '../pages/FeedExpand/FeedExpand';
import Chat from '../pages/Chat/Chat';

// store
import { useAppSelector } from '../redux/hook';
import { recoverUser, selectIsLogin } from '../redux/authSlicer';
import { useAppDispatch } from '../redux/hook';

const AppRouter = () => {
  const dispatch = useAppDispatch();
  const isLogged = useAppSelector(selectIsLogin);

  useEffect(()=>{
    dispatch(recoverUser());
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={isLogged ? '/feed' : '/login'} />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={<PrivateRoute isAllowed={isLogged} />}
        >
          <Route path="/feed" element={<Feed />} />
          <Route path="/feed/:id" element={<FeedExpand />} />
          <Route path="/feed/presets" element={<Presets />} />
          <Route path="/chats/:id" element={<Chat />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
