import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// components
import SideBar from '../../components/SideBar';
import { StyledHeader } from '../../components/StyledHeader';
import IconButton from '../../components/IconButton';
import StyledTextArea from './components/StyledTextArea';

// store
import { useAppSelector } from '../../redux/hook';
import { selectIsOpen } from '../../redux/sidebarSlicer';
import { useGetMessagesQuery, useSendMessageMutation, useGetMessagesSocketQuery } from '../../redux/rtk/chat.api';
import MessageItem from './components/MessageItem';

// models

// config

function Chat() {
  const { id } = useParams();

  const isOpen = useAppSelector(selectIsOpen);

  const [ sendMessage ] = useSendMessageMutation();

  const [message, setMessage] = useState<string>('');

  // const { data: newData } = useSubscribeQuery({
  //   id: parseInt(id || '0'),
  // }, { refetchOnMountOrArgChange: true,
  // });

  const { data: newData } = useGetMessagesSocketQuery(parseInt(id || '0'), {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    console.log('newData');

    console.log(newData);
  }, [newData]);

  const { data } = useGetMessagesQuery({
    id: parseInt(id || '0'),
  }, { refetchOnMountOrArgChange: true });

  const send = async () => {
    await sendMessage({
      ...(id && {chatId: parseInt(id)}),
      content: message,
    });
    setMessage('');
  };

  return (
    <div className='feed-wrapper'>
      <SideBar isChatPage/>
      <div className='main-wrapper' style={{width: isOpen ? 'calc(100% - 320px)' : '100%' }}>
        <StyledHeader />
        <div className='chat-wrapper'>
          <div className='messages'>
            <MessageItem isBot>
            Hello, how can I assist you today?
            </MessageItem>
            { data?.data && data?.data.map((message) =>
              <MessageItem key={message.id} isBot={message.isBot}>
                {message.content}
              </MessageItem>) }
          </div>
        </div>
        <div
          className='message-wrapper'
          style={{
            borderColor: message === '' ? 'var(--gray-400)' : 'var(--primary)',
          }}
        >
          {/* <StyledInput
              type='textarea'
              value={message}
              placeholder='Write a question...'
              onChange={(e) => setMessage(e.target.value)}
              className='textarea'
            /> */}
          <div className='request-container'>
            <StyledTextArea
              value={message}
              placeholder='Write a question...'
              onChange={(e) => setMessage(e.target.value)}
              maxWidth={280}
              className='textarea'
            />
          </div>
          <div className='icn-container'>
            <IconButton
              icon={message === '' ? 'send-outlined-black' : 'send-outlined'}
              classNames='send-icn'
              disabled={message === ''}
              onClick={send}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
