import React, { useState } from 'react';

// components
import StyledButton from '../../../components/StyledButton';
import StyledLink from '../../../components/StyledLink';

// store
import { useAppSelector } from '../../../redux/hook';
import { selectEmail } from '../../../redux/authSlicer';

export default function SideBar() {
  const email = useAppSelector(selectEmail);
  const [selectedTab, setSelectedTab] = useState<string>('upwork-feed');

  const handleChange = (value: string) => {
    setSelectedTab(value);
  };

  return (
    <div className='sidebar-wrapper'>
      <div className='add-chat'>
        <StyledButton>New chat</StyledButton>
      </div>
      <div className='chat-list'>
        <StyledLink
          afterIcon='dots'
        >
          Hi there! How can I help you?
        </StyledLink>
        <StyledLink
          afterIcon='dots'
        >
          Hi there! How can I help you?
        </StyledLink>
        <StyledLink
          afterIcon='dots'
        >
          Hi there! How can I help you?
        </StyledLink>
      </div>
      <div className='sidebar-footer'>
        <StyledLink
          preIcon='network'
          afterIcon='chevron-right'
          onClick={() => handleChange('upwork-feed')}
          className={selectedTab === 'upwork-feed' ? 'selected' : '' }
        >
          Upwork feed
        </StyledLink>
        <StyledLink
          preIcon='account'
          onClick={() => handleChange('email')}
          className={selectedTab === 'email' ? 'selected' : '' }
        >
          {email ? email : 'username'}
        </StyledLink>
      </div>
    </div>
  );
}
