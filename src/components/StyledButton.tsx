import React, { useEffect, useState } from 'react';

interface ButtonProps {
  type?: 'submit' | 'reset' | 'button';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
  children?: React.ReactNode,
  disabled?: boolean,
  style?: React.CSSProperties,
  afterIcon?: string,
  preIcon?: string,
}

export default function StyledButton({ type = 'button', onClick, disabled, children = null, style, afterIcon, preIcon }: ButtonProps) {
  const [minusWidth, setMinusWidth] = useState(0);

  useEffect(()=>{
    if (afterIcon) setMinusWidth(minusWidth+24);
    if (preIcon) setMinusWidth(minusWidth+24);
  }, []);

  return (
    <button
      type={type}
      className='button'
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {preIcon && <span className={`icon ${preIcon}`}></span>}
      <span
        className='button-text'
        style={{
          maxWidth: `calc(100% - ${minusWidth}px)`,
          marginLeft: preIcon ? '8px' : '0',
        }}
      >
        {children}
      </span>
      {afterIcon && <span className={`icon ${afterIcon}`}></span>}
    </button>
  );
}
