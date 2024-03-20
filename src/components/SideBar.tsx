import { useRef, useState } from 'react';

// components
import StyledButton from './StyledButton';
import StyledLink from './StyledLink';
import ChatList from './ChatList';
import PopperDialog from './PopperDialog';
import IconButton from './IconButton';

// store
import { useAppSelector } from '../redux/hook';
import { selectEmail } from '../redux/authSlicer';
import { selectIsOpen } from '../redux/sidebarSlicer';


export default function SideBar() {
  const email = useAppSelector(selectEmail);
  const isOpen = useAppSelector(selectIsOpen);
  console.log(isOpen);
  const referenceElem = useRef<HTMLAnchorElement>(null);

  const [selectedTab, setSelectedTab] = useState<string>('upwork-feed');
  const [isShown, setIsShown] = useState(false);

  const handleChange = (value: string) => {
    setSelectedTab(value);
    // if (value === 'email') openPopper();
  };

  const openPopper = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    setSelectedTab('account');
    setIsShown(!isShown);
  };

  const closeManageAccount = () => {
    setIsShown(false);
    setSelectedTab('upwork-feed');
  };

  const filterPresets = () => {
    console.log('filter');
  };

  const logout = () => {
    console.log('logout');
  };

  return (
    <div className={`sidebar-wrapper ${isOpen ? 'show' : 'hide'}`}>
      <div className='add-chat'>
        <StyledButton preIcon='plus'>New chat</StyledButton>
      </div>
      <div className='chat-list'>
        <ChatList />
      </div>
      <div className='sidebar-footer'>
        <StyledLink
          to='/feed'
          preIcon='network'
          onClick={() => handleChange('upwork-feed')}
          className={selectedTab === 'upwork-feed' ? 'selected' : '' }
        >
          Upwork feed
        </StyledLink>
        <StyledLink
          to='/feed/presets'
          preIcon='account'
          ref={referenceElem}
          onClick={() => handleChange('email')}
          className={selectedTab === 'email' ? 'selected relative ' : 'relative' }
          afterIcon={<IconButton icon='chevron-right' onClick={openPopper} />}
        >
          {email ? email : 'username'}
          {isShown && (
            <PopperDialog position='bottom' onBlur={closeManageAccount} referenceElem={referenceElem.current}>
              <StyledButton preIcon='filter' classNames='account-popper-btn' onClick={filterPresets}>Filter presets</StyledButton>
              <div className='break-line'></div>
              <StyledButton preIcon='logout' classNames='account-popper-btn' onClick={logout}>Logout</StyledButton>
            </PopperDialog>
          )}
        </StyledLink>
      </div>
    </div>
  );
}
