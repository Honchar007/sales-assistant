import React, { useRef, useState } from 'react';
import IconButton from './IconButton';

// providers
import { useTheme } from '../providers/ThemeProvider';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { selectIsOpen, openClose } from '../redux/sidebarSlicer';
import StyledButton from './StyledButton';
import CreateChatPopper from './CreateChatPopper';

// store

export function StyledHeader() {
  const isOpen = useAppSelector(selectIsOpen);
  const dispatch = useAppDispatch();

  const { theme, updateTheme } = useTheme();

  const [isWantCreate, setIsWantCreate] = useState(false);

  const referenceElem = useRef<HTMLAnchorElement>(null);

  const handleOpenClose = () => {
    dispatch(openClose(!isOpen));
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    updateTheme(newTheme);
  };

  const openPopperCreating = () => {
    setIsWantCreate(!isWantCreate);
  };

  return (
    <div className='header'>
      <IconButton icon={isOpen ? 'arrow-left' : 'burger-menu'} classNames='header-icon' onClick={handleOpenClose} />
      {!isOpen && <div className='add-chat-header'>
        <StyledButton preIcon='plus' onClick={openPopperCreating}>New chat</StyledButton>
      </div>}
      <IconButton icon={'moon'} classNames='header-icon' onClick={toggleTheme} />
      {isWantCreate && <CreateChatPopper referenceElem={referenceElem} setIsWantCreate={setIsWantCreate} />}
    </div>
  );
}
