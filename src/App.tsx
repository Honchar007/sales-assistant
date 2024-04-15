import React from 'react';

// components
import AppRouter from './routes/AppRouter';
import Spinner from './components/Spinner';

// styles
import './assets/scss/index.scss';
import { useAppSelector } from './redux/hook';
import { selectFetching } from './redux/authSlicer';

function App() {
  const loading = useAppSelector(selectFetching);
  // const initialFetch = useAppSelector(selectInitialFetching);

  return (
    <div className="App">
      {(loading) && <Spinner size='200' isFullScreen/>}
      <AppRouter />
    </div>
  );
}

export default App;
