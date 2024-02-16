import * as React from 'react';
import { useAppSelector } from '../../redux/hook';
import { selectEmail } from '../../redux/authSlicer';

function Feed() {
  const email = useAppSelector(selectEmail);
  return (
    <div>
      {email} email
    </div>
  );
}

export default Feed;
