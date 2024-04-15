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
import { useGetMessagesQuery, useSendMessageMutation } from '../../redux/rtk/chat.api';
import MessageItem from './components/MessageItem';
import { socket } from '../../services/socket-manager';
import localStorageService from '../../services/local-storage.service';
import { NotificationEvents } from '../../submodules/public-common/enums/notification/notification-events.enum';
import { IMessageDTO } from '../../submodules/public-common/interfaces/dto/message/imessage-dto';

// models
import { MessagesRoutesEnum } from '../../submodules/public-common/enums/routes/messages-routes.enum';
import { selectAccountId } from '../../redux/authSlicer';
import { IApiResponseDTO } from '../../submodules/public-common/interfaces/dto/common/iapi-response.interface';

// config
function Chat() {
  const { id } = useParams();

  const isOpen = useAppSelector(selectIsOpen);
  const accountId = useAppSelector(selectAccountId);

  const [ sendMessage, {error} ] = useSendMessageMutation();

  const [message, setMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { data } = useGetMessagesQuery({
    id: parseInt(id || '0'),
  }, { refetchOnMountOrArgChange: true });

  const [messages, setMessages] = useState<IMessageDTO[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChangeMessages = (data: IMessageDTO) => {
    setMessages((prevMessages) => [...prevMessages, data]);
  };

  const send = async () => {
    handleChangeMessages(
      {
        id: Date.now().toString(),
        content: message,
        created: new Date(Date.now()).toISOString(),
        isBot: false,
        accountId,
        chatId: parseInt(id || '0'),
      }
    );
    setMessage('');
    await sendMessage({
      ...(id && {chatId: parseInt(id)}),
      content: message,
    });
    setLoading(true);
  };

  useEffect(() => {
    setLoading(false);
    socket.connect();
    socket.emit(MessagesRoutesEnum.Subscribe, {
      chatId: parseInt(id || '0'),
      accessToken: localStorageService.get().accessToken,
    });

    const handleChatResponse = (data: IMessageDTO) => {
      handleChangeMessages(data);
      setLoading(false);
    };

    socket.on(NotificationEvents.ChatResponse, handleChatResponse);

    return () => {
      socket.disconnect();
      socket.emit(MessagesRoutesEnum.Unsubscribe, {
        chatId: parseInt(id || '0'),
        accessToken: localStorageService.get().accessToken,
      });
      socket.off(NotificationEvents.ChatResponse, handleChatResponse);
    };
  }, [id]);

  useEffect(() => {
    if (data) {
      setMessages([...data?.data]);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      const er = (error as IApiResponseDTO).data;

      setErrorMessage((er as IApiResponseDTO).error?.errorCode ?? '');
    }
  }, [error]);

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
            { messages.map((message) =>
              <MessageItem key={message.id} isBot={message.isBot}>
                {message.content}
              </MessageItem>) }
            { !errorMessage && loading && <MessageItem isBot>
              looking for answer...
            </MessageItem> }
            { errorMessage && <MessageItem isBot>
              <>Error {errorMessage}</>
            </MessageItem> }
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
