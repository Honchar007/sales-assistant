import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

// components
import SideBar from '../../components/SideBar';
import { StyledHeader } from '../../components/StyledHeader';
import PresetList from '../../components/PresetList';
import PopperDialog from '../../components/PopperDialog';
import StyledButton from '../../components/StyledButton';
import IconButton from '../../components/IconButton';
import StyledInput from '../../components/StyledInput';

// store
import { useAppSelector } from '../../redux/hook';
import { selectEmail } from '../../redux/authSlicer';

function Presets() {
  const email = useAppSelector(selectEmail);

  const referenceElem = useRef<HTMLButtonElement>(null);
  const [isShown, setIsShown] = useState<boolean>(false);
  const [presetName, setPresetName] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [isDisable, setIsDisable] = useState<boolean>(false);


  const handleChangePresetName = (e: ChangeEvent<HTMLInputElement>) => {
    setPresetName(e.target.value);
  };

  const handleChangeUrl = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const openPopper = () => {
    setIsShown(!isShown);
    console.log(email);
  };

  const close = () => {
    setIsShown(false);
  };

  const cancel = () => {
    setPresetName('');
    setUrl('');
  };

  const save = () => {
    console.log('save');
    close();
  };

  useEffect(()=>{
    if (url === '' || presetName === '') {
      setIsDisable(true);
    } else setIsDisable(false);
  }, [url, presetName]);

  return (
    <div className='presets-wrapper'>
      <SideBar />
      <div className='main-wrapper'>
        <StyledHeader />
        <div className='subheader'>
          <h2>Setup filters</h2>
          <StyledButton
            ref={referenceElem}
            preIcon='plus'
            onClick={openPopper}
          >
            New preset
          </StyledButton>
        </div>
        <PresetList />
      </div>
      {isShown && createPortal(
        <div className='screen-modal'>
          <PopperDialog
            position='bottom'
            onBlur={close}
            referenceElem={referenceElem.current}
            centered
          >
            <div className='header-modal'>
              <h3>Edit preset</h3>
              <IconButton icon='close' onClick={close} />
            </div>
            <StyledInput
              type='text'
              name='preset-name'
              placeholder='Preset name'
              label='Preset name'
              value={presetName}
              onChange={handleChangePresetName}
            />
            <StyledInput
              type='text'
              name='preset-url'
              placeholder='URL'
              label='URL'
              value={url}
              onChange={handleChangeUrl}
            />
            <div className='modal-func'>
              <StyledButton onClick={cancel}>Cancel</StyledButton>
              <StyledButton disabled={isDisable} onClick={save} classNames='primary'>Save</StyledButton>
            </div>
          </PopperDialog>
        </div>, document.body)
      }
    </div>
  );
}

export default Presets;
