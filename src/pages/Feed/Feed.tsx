import React from 'react';
import { useAppSelector } from '../../redux/hook';
import { selectEmail } from '../../redux/authSlicer';
import SideBar from './components/SideBar';
import { StyledHeader } from '../../components/StyledHeader';
import ChatList from './components/ChatList';

// components

function Feed() {
  const email = useAppSelector(selectEmail);
  return (
    <div className='feed-wrapper'>
      <SideBar />
      <div className='main-wrapper'>
        <StyledHeader />
        <div>{email}</div>
        <ChatList />
      </div>
    </div>
  );
}

export default Feed;
