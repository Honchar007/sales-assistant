import React from 'react';

interface ButtonProps {
  type?: 'submit' | 'reset' | 'button';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
  children?: React.ReactNode,
  disabled?: boolean,
  style?: React.CSSProperties,
}

export default function StyledButton({ type = 'button', onClick, disabled, children = null, style }: ButtonProps) {
  return (
    <button
      type={type}
      className='button'
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
}
