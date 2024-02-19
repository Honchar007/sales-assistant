import React from 'react';

interface LinkProps extends React.ButtonHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode,
  style?: React.CSSProperties,
  className?: string,
  preIcon?: string,
  afterIcon?: string,
}

export default function StyledLink({ name, onClick, children, style, className, preIcon, afterIcon }: LinkProps) {
  return (
    <a
      id={name}
      className={className ? `link-btn ${className}` : 'link-btn'}
      onClick={onClick}
      style={style}
    >
      {preIcon && <span className={`icon ${preIcon}`}></span>}
      <span
        className='link-text'
        style={{
          width: afterIcon ? 'calc(100% - 48px)' : 'calc(100% - 24px)',
          marginLeft: preIcon ? '8px' : '0',
        }}
      >
        {children}
      </span>
      {afterIcon && <span className={`icon ${afterIcon}`}></span>}
    </a>
  );
}
