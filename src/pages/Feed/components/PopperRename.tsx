import React, { ChangeEvent, useRef, useState } from 'react';

// components
import IconButton from '../../../components/IconButton';
import PopperDialog from './PopperDialog';
import StyledLink from '../../../components/StyledLink';
import StyledInput from '../../../components/StyledInput';

export default function PopperRename({id, name}: {id: string, name: string}) {
  const referenceElem = useRef<HTMLButtonElement>(null);

  const [isShown, setIsShown] = useState<boolean>(false);
  const [chatName, setChatName] = useState<string>(name);

  const openPopper = () => {
    console.log('asd');
    setIsShown(!isShown);
  };

  const close = () => {
    setIsShown(false);
  };

  const removeChat = () => {
    console.log(id);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChatName(e.target.value);
  };

  return (
    <>
      <IconButton ref={referenceElem} icon='dots' onClick={openPopper} classNames='edit-chat-btn'/>
      {isShown && (
        <PopperDialog onBlur={close} referenceElem={referenceElem.current}>
          <StyledInput type='text' name='chatname' value={chatName} onChange={handleChange} />
          <StyledLink preIcon='edit'>Rename</StyledLink>
          <StyledLink preIcon='remove' onClick={removeChat}>Delete</StyledLink>
        </PopperDialog>
      )}
    </>
  );
}
