import { useRef, useState } from 'react';

// components
import StyledButton from '../../../components/StyledButton';
import StyledLink from '../../../components/StyledLink';
import ChatList from './ChatList';
import PopperDialog from './PopperDialog';

// store
import { useAppSelector } from '../../../redux/hook';
import { selectEmail } from '../../../redux/authSlicer';


export default function SideBar() {
  const email = useAppSelector(selectEmail);

  const referenceElem = useRef<HTMLAnchorElement>(null);

  const [selectedTab, setSelectedTab] = useState<string>('upwork-feed');
  const [isShown, setIsShown] = useState(false);

  const handleChange = (value: string) => {
    setSelectedTab(value);
    if (value === 'email') openPopper();
  };

  const openPopper = () => {
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
    <div className='sidebar-wrapper'>
      <div className='add-chat'>
        <StyledButton preIcon='plus'>New chat</StyledButton>
      </div>
      <div className='chat-list'>
        <ChatList />
      </div>
      <div className='sidebar-footer'>
        <StyledLink
          preIcon='network'
          onClick={() => handleChange('upwork-feed')}
          className={selectedTab === 'upwork-feed' ? 'selected' : '' }
        >
          Upwork feed
        </StyledLink>
        <StyledLink
          preIcon='account'
          ref={referenceElem}
          afterIcon='chevron-right'
          onClick={() => handleChange('email')}
          className={selectedTab === 'email' ? 'selected relative ' : 'relative' }
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
