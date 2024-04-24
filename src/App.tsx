import React from 'react';

// store
import { useAppSelector } from './redux/hook';
import { selectFetching } from './redux/authSlicer';

// components
import AppRouter from './routes/AppRouter';
import Spinner from './components/Spinner';

// styles
import './assets/scss/index.scss';

function App() {
  const loading = useAppSelector(selectFetching);

  return (
    <div className="App">
      {(loading) && <Spinner size='200' isFullScreen/>}
      <AppRouter />
    </div>
  );
}

export default App;
