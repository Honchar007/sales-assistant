import React from 'react';
import IconButton from './IconButton';

import { useTheme } from '../providers/ThemeProvider';

export function StyledHeader() {
  const { theme, updateTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    updateTheme(newTheme);
  };

  return (
    <div className='header'>
      <IconButton icon='arrow-left' classNames='header-icon' />
      <IconButton icon={'moon'} classNames='header-icon' onClick={toggleTheme} />
    </div>
  );
}
