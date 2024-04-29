import { useEffect, useRef, useState } from 'react';

// components
import StyledButton from './StyledButton';
import StyledLink from './StyledLink';
import ChatList from './ChatList';
import PopperDialog from './PopperDialog';
import IconButton from './IconButton';
import CreateChatPopper from './CreateChatPopper';

// store
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { logout, selectEmail } from '../redux/authSlicer';
import { changeTab, selectCurrentTab, selectIsOpen } from '../redux/sidebarSlicer';


export default function SideBar({isChatPage = false}: { isChatPage?: boolean }) {
  const dispatch = useAppDispatch();

  const email = useAppSelector(selectEmail);
  const isOpen = useAppSelector(selectIsOpen);
  const tab = useAppSelector(selectCurrentTab);

  const referenceElem = useRef<HTMLAnchorElement>(null);

  const [isShown, setIsShown] = useState(false);
  const [isWantCreate, setIsWantCreate] = useState(false);

  const handleChange = (value: string) => {
    dispatch(changeTab(value));
  };

  const openPopper = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsShown(!isShown);
  };

  const closeManageAccount = () => {
    setIsShown(false);
  };

  const filterPresets = () => {
    console.log('filter');
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  // popper
  const openPopperCreating = () => {
    setIsWantCreate(!isWantCreate);
  };

  useEffect(() => {
    const url = window.location.pathname;
    if (url.substring(url.lastIndexOf('/') + 1) == 'presets') {
      dispatch(changeTab('email'));
    }
  }, []);

  return (
    <div className={`sidebar-wrapper ${isOpen ? 'show' : 'hide'}`}>
      <div className='add-chat'>
        <StyledButton preIcon='plus' onClick={openPopperCreating}>New chat</StyledButton>
      </div>
      <div className='chat-list'>
        <ChatList isChatPage={isChatPage} />
      </div>
      { !isChatPage &&
      <div className='sidebar-footer'>
        <StyledLink
          to='/feed'
          preIcon='network'
          onClick={() => handleChange('upwork-feed')}
          className={tab === 'upwork-feed' ? 'selected' : '' }
        >
          Upwork feed
        </StyledLink>
        <StyledLink
          to='/feed/presets'
          preIcon='account'
          ref={referenceElem}
          onClick={() => handleChange('email')}
          className={(tab === 'email') || isShown ? 'selected relative ' : 'relative' }
          afterIcon={<IconButton icon='chevron-right' onClick={openPopper} />}
        >
          {email ? email : 'username'}
          {isShown && (
            <PopperDialog position='bottom' onBlur={closeManageAccount} referenceElem={referenceElem.current}>
              <StyledButton preIcon='filter' classNames='account-popper-btn' onClick={filterPresets}>Filter presets</StyledButton>
              <div className='break-line'></div>
              <StyledButton preIcon='logout' classNames='account-popper-btn' onClick={handleLogout}>Logout</StyledButton>
            </PopperDialog>
          )}
        </StyledLink>
      </div>
      }
      {isWantCreate && <CreateChatPopper referenceElem={referenceElem} setIsWantCreate={setIsWantCreate} />}
    </div>
  );
}
