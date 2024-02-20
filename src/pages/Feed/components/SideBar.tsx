import React, { useState } from 'react';
import { usePopper } from 'react-popper';

// components
import StyledButton from '../../../components/StyledButton';
import StyledLink from '../../../components/StyledLink';

// store
import { useAppSelector } from '../../../redux/hook';
import { selectEmail } from '../../../redux/authSlicer';
import IconButton from '../../../components/IconButton';

export default function SideBar() {
  const email = useAppSelector(selectEmail);
  const [selectedTab, setSelectedTab] = useState<string>('upwork-feed');

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [isShown, setIsShown] = useState(false);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: 'offset', options: { offset: [0, 10] } }],
    placement: 'bottom',
  });

  const popperStyles = {
    ...styles.popper,
    // display: isShown ? "block" : "none"
  };

  const handleChange = (value: string) => {
    setSelectedTab(value);
  };

  return (
    <div className='sidebar-wrapper'>
      <div className='add-chat'>
        <StyledButton preIcon='plus'>New chat</StyledButton>
      </div>
      <div className='chat-list'>
        <StyledLink
          afterIcon={<IconButton icon='dots' />}
        >
          Hi there! How can I help you?
        </StyledLink>
        <StyledLink
          afterIcon={<IconButton icon='dots' />}
        >
          Hi there! How can I help you?
        </StyledLink>
        <StyledLink
          afterIcon={<IconButton icon='dots' />}
        >
          Hi there! How can I help you?
        </StyledLink>
      </div>
      <div className='sidebar-footer'>
        <StyledLink
          preIcon='network'
          onClick={() => handleChange('upwork-feed')}
          className={selectedTab === 'upwork-feed' ? 'selected' : '' }
        >
          Upwork feed
        </StyledLink>
        <StyledLink
          preIcon='account'
          afterIcon={<IconButton icon='chevron-right' onClick={() => setIsShown((x) => !x)}/>}
          onClick={() => handleChange('email')}
          className={selectedTab === 'email' ? 'selected' : '' }
          ref={setReferenceElement}
        >
          {email ? email : 'username'}
        </StyledLink>
        {isShown && (
          <div ref={setPopperElement} style={popperStyles} {...attributes.popper}>
          Popper element
          </div>
        )}
      </div>
    </div>
  );
}
