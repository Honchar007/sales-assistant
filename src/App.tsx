import React, { useEffect } from 'react';

// components
import AppRouter from './routes/AppRouter';

// styles
import './assets/scss/index.scss';
import { useAppDispatch, useAppSelector } from './redux/hook';
import { initialFetchingDone, selectFetching, selectInitialFetching } from './redux/authSlicer';
import Spinner from './components/Spinner';

function App() {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectFetching);
  const initialFetch = useAppSelector(selectInitialFetching);

  useEffect(() => {
    dispatch(initialFetchingDone(true));
  }, []);

  return (
    <div className="App">
      {(!initialFetch || loading) && <Spinner size='200' isFullScreen/>}
      <AppRouter />
    </div>
  );
}

export default App;
