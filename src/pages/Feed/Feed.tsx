import React from 'react';
import { useAppSelector } from '../../redux/hook';
import { selectEmail } from '../../redux/authSlicer';
import SideBar from './components/SideBar';

// components

function Feed() {
  const email = useAppSelector(selectEmail);
  return (
    <div className='feed-wrapper'>
      <SideBar />
      <div>{email} email</div>
    </div>
  );
}

export default Feed;
