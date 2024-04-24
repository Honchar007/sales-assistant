import React from 'react';
import IconButton from './IconButton';

// providers
import { useTheme } from '../providers/ThemeProvider';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { selectIsOpen, openClose } from '../redux/sidebarSlicer';

// store

export function StyledHeader() {
  const isOpen = useAppSelector(selectIsOpen);
  const dispatch = useAppDispatch();

  const { theme, updateTheme } = useTheme();

  const handleOpenClose = () => {
    dispatch(openClose(!isOpen));
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    updateTheme(newTheme);
  };

  return (
    <div className='header'>
      <IconButton icon={isOpen ? 'arrow-left' : 'burger-menu'} classNames='header-icon' onClick={handleOpenClose} />
      <IconButton icon={'moon'} classNames='header-icon' onClick={toggleTheme} />
    </div>
  );
}
