import React from 'react';

// components
import StyledButton from '../../../components/StyledButton';

export default function SideBar() {
  return (
    <div className='sidebar-wrapper'>
      <div className='add-chat'>
        <StyledButton>New chat</StyledButton>
      </div>
      <div className='chat-list'>
        Chats
      </div>
      <div className='sidebar-footer'>
        <StyledButton>Upwork feed</StyledButton>
        <StyledButton>username</StyledButton>
      </div>
    </div>
  );
}
