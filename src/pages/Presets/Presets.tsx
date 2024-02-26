import React from 'react';

// components
import SideBar from '../../components/SideBar';
import { StyledHeader } from '../../components/StyledHeader';
import PresetList from '../../components/PresetList';

// store
import { useAppSelector } from '../../redux/hook';
import { selectEmail } from '../../redux/authSlicer';
import StyledButton from '../../components/StyledButton';


function Presets() {
  const email = useAppSelector(selectEmail);
  return (
    <div className='presets-wrapper'>
      <SideBar />
      <div className='main-wrapper'>
        <StyledHeader />
        <div className='subheader'>
          <h2>Setup filters</h2>
          <StyledButton preIcon='plus'>New preset</StyledButton>
        </div>
        <PresetList />
        <div>{email}</div>
      </div>
    </div>
  );
}

export default Presets;
