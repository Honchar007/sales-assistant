import React from 'react';

// components
import AppRouter from './routes/AppRouter';

// styles
import './assets/scss/index.scss';
import { useAppSelector } from './redux/hook';
import { selectFetching, selectInitialFetching } from './redux/authSlicer';
import Spinner from './components/Spinner';

function App() {
  const loading = useAppSelector(selectFetching);
  const initialFetch = useAppSelector(selectInitialFetching);

  return (
    <div className="App">
      {(!initialFetch || loading) && <Spinner size='200' isFullScreen/>}
      <AppRouter />
    </div>
  );
}

export default App;
