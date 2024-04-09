import React from 'react';

export interface MessageItem {
  children?: React.ReactNode,
  isBot: boolean,
}

const MessageItem = ({isBot, children}: MessageItem) => {
  return (
    <div className={`message-item ${isBot ? 'is-bot' : 'is-user'}`}>
      <div className='icon-container'>
        <span className={isBot ? 'icon stars' : 'icon account-filled'} />
      </div>
      <div className='message-text'>
        {children}
      </div>
    </div>
  );
};

export default MessageItem;
