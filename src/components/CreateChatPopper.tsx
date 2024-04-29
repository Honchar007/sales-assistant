import React, { ChangeEvent, useState } from 'react';
import { createPortal } from 'react-dom';

// components
import PopperDialog from './PopperDialog';
import { useCreateChatMutation } from '../redux/rtk/chatHistory.api';
import IconButton from './IconButton';
import StyledInput from './StyledInput';
import StyledButton from './StyledButton';

function CreateChatPopper({setIsWantCreate, referenceElem}) {
  const [name, setName] = useState<string>('');

  const [ createChat ] = useCreateChatMutation();

  // popper
  const close = () => {
    setIsWantCreate(false);
  };

  const cancel = () => {
    setName('');
  };

  const save = async () => {
    await createChat({name});
    setName('');
    setIsWantCreate(false);
  };

  return createPortal(
    <div className='screen-modal'>
      <PopperDialog
        position='bottom'
        onBlur={close}
        referenceElem={referenceElem.current}
        centered
      >
        <div className='header-modal'>
          <h3>New chat</h3>
          <IconButton icon='close' onClick={close} />
        </div>
        <StyledInput
          type='text'
          name='preset-name'
          placeholder='Name'
          label='Chat name'
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
        <div className='modal-func'>
          <StyledButton onClick={cancel}>Cancel</StyledButton>
          <StyledButton disabled={name === ''} onClick={save} classNames='primary'>Save</StyledButton>
        </div>
      </PopperDialog>
    </div>, document.body);
}

export default CreateChatPopper;
