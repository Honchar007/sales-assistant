import React, { useEffect } from 'react';

// components
import AppRouter from './routes/AppRouter';

// styles
import './assets/scss/index.scss';

function App() {
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      document.documentElement.setAttribute('data-theme', storedTheme);
    } else {
      const defaultTheme = 'light';
      document.documentElement.setAttribute('data-theme', defaultTheme);
      localStorage.setItem('theme', defaultTheme);
    }
  }, []);

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
