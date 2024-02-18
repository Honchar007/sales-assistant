import React from 'react';

// components
import StyledButton from '../../../components/StyledButton';
import StyledLink from '../../../components/StyledLink';

// store
import { useAppSelector } from '../../../redux/hook';
import { selectEmail } from '../../../redux/authSlicer';

export default function SideBar() {
  const email = useAppSelector(selectEmail);

  return (
    <div className='sidebar-wrapper'>
      <div className='add-chat'>
        <StyledButton>New chat</StyledButton>
      </div>
      <div className='chat-list'>
        Chats
      </div>
      <div className='sidebar-footer'>
        <StyledLink preIcon='network' afterIcon='chevron-right'>Upwork feed</StyledLink>
        <StyledLink preIcon='account'>{email ? email : 'username'}</StyledLink>
      </div>
    </div>
  );
}
