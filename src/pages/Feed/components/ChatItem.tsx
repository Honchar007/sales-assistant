import { ChangeEvent, useRef, useState } from 'react';

// components
import IconButton from '../../../components/IconButton';
import PopperDialog from './PopperDialog';
import StyledLink from '../../../components/StyledLink';
import StyledInput from '../../../components/StyledInput';
import StyledButton from '../../../components/StyledButton';

export default function ChatItemFunc({id, name}: {id: string, name: string}) {
  const prev = name;
  const referenceElem = useRef<HTMLButtonElement>(null);
  const referenceRenameElem = useRef<HTMLAnchorElement>(null);

  const [isShown, setIsShown] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [chatName, setChatName] = useState<string>(name);

  const openPopper = () => {
    setIsShown(!isShown);
  };

  const close = () => {
    setIsShown(false);
  };

  const closeChatRename = () => {
    setIsEditMode(false);
  };

  const removeChat = () => {
    console.log(id);
    close();
  };

  const renameChat = () => {
    console.log(name);
    setIsShown(false);
    setIsEditMode(true);
  };

  const discardEdit = () => {
    setChatName(prev);
    // closeChatRename();
  };

  const saveEdit = () => {
    // store changes
    closeChatRename();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChatName(e.target.value);
  };

  return (
    <>
      <IconButton ref={referenceElem} icon='dots' onClick={openPopper} classNames='edit-chat-btn'/>
      {isShown && !isEditMode && (
        <PopperDialog onBlur={close} referenceElem={referenceElem.current}>
          <StyledLink ref={referenceRenameElem} preIcon='edit' onClick={renameChat}>Rename</StyledLink>
          <StyledLink preIcon='remove' onClick={removeChat}>Delete</StyledLink>
        </PopperDialog>
      )}
      {isEditMode && (
        <PopperDialog onBlur={closeChatRename} referenceElem={referenceRenameElem.current} style={{padding: '12px'}}>
          <StyledInput type='text' name='chatname' value={chatName} onChange={handleChange} />
          <div className='edit-func'>
            <StyledButton onClick={discardEdit}>Discard</StyledButton>
            <StyledButton onClick={saveEdit} classNames='primary'>Save</StyledButton>
          </div>
        </PopperDialog>
      )}
    </>
  );
}
