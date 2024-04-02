import { ChangeEvent, useRef, useState } from 'react';

// components
import IconButton from '../IconButton';
import PopperDialog from '../PopperDialog';
import StyledLink from '../StyledLink';
import StyledInput from '../StyledInput';
import StyledButton from '../StyledButton';

// store
import { useRemoveChatMutation, useUpdateChatMutation } from '../../redux/rtk/chatHistory.api';

export default function ChatItemFunc({id, name}: {id: string, name: string}) {
  const prev = name;
  const referenceElem = useRef<HTMLButtonElement>(null);
  const referenceRenameElem = useRef<HTMLAnchorElement>(null);

  const [isShown, setIsShown] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [chatName, setChatName] = useState<string>(name);

  const [ updateChatName ] = useUpdateChatMutation();
  const [ removeById ] = useRemoveChatMutation();

  const openPopper = () => {
    setIsShown(!isShown);
  };

  const close = () => {
    setIsShown(false);
  };

  const closeChatRename = () => {
    setIsEditMode(false);
  };

  const removeChat = async () => {
    await removeById({ id });
    close();
  };

  const renameChat = () => {
    setIsShown(false);
    setIsEditMode(true);
  };

  const discardEdit = () => {
    setChatName(prev);
    // closeChatRename();
  };

  const saveEdit = async () => {
    await updateChatName({id, name: chatName});
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
