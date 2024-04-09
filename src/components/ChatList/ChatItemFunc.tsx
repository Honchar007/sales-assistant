import { ChangeEvent, useRef, useState } from 'react';

// components
import IconButton from '../IconButton';
import PopperDialog from '../PopperDialog';
import StyledLink from '../StyledLink';
import StyledInput from '../StyledInput';
import StyledButton from '../StyledButton';

// store
import { useRemoveChatMutation, useUpdateChatMutation } from '../../redux/rtk/chatHistory.api';
import { createPortal } from 'react-dom';

export default function ChatItemFunc({id, name, isChatPage = false}: {id: string, name: string, isChatPage: boolean}) {
  const prev = name;
  const referenceElem = useRef<HTMLButtonElement>(null);
  const referenceRemoveElem = useRef<HTMLButtonElement>(null);
  const referenceRenameElem = useRef<HTMLAnchorElement>(null);

  const [isShown, setIsShown] = useState(false);
  const [isConfirmationDeleteShown, setIsConfirmationDelete] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [chatName, setChatName] = useState<string>(name);

  const [ updateChatName ] = useUpdateChatMutation();
  const [ removeById ] = useRemoveChatMutation();

  const openPopper = () => {
    setIsShown(!isShown);
  };

  const openConfirmationDeletePopper = () => {
    setIsConfirmationDelete(!isConfirmationDeleteShown);
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

      {isChatPage ?
        <>
          <IconButton ref={referenceRemoveElem} icon='remove' onClick={openConfirmationDeletePopper} classNames='edit-chat-btn'/>
          {isConfirmationDeleteShown && createPortal(
            <div className='screen-modal'>
              <PopperDialog
                position='bottom'
                onBlur={openConfirmationDeletePopper}
                referenceElem={referenceRemoveElem.current}
                centered
              >
                <div className='header-modal'>
                  <h3>Delete chat</h3>
                  <IconButton icon='close' onClick={openConfirmationDeletePopper} />
                </div>
                <div className='main-info-modal'>
                  Are you sure you want to delete chat “{name}”?
                </div>
                <div className='modal-func' style={{
                  justifyContent: 'flex-start',
                }}>
                  <StyledButton onClick={openConfirmationDeletePopper} style={{
                    width: '134px',
                  }}>No, Keep it</StyledButton>
                  <StyledButton onClick={removeChat} classNames='primary' style={{
                    width: '134px',
                  }}>Yes, Delete it</StyledButton>
                </div>
              </PopperDialog>
            </div>, document.body)
          }
        </> :
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
      }

    </>
  );
}
