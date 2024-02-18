import React from 'react';

interface LinkProps {
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void,
  children?: React.ReactNode,
  style?: React.CSSProperties,
  className?: string,
  preIcon?: string,
  afterIcon?: string,
}

export default function StyledLink({ onClick, children = null, style, className, preIcon, afterIcon }: LinkProps) {
  return (
    <a
      className={className ? `link-btn ${className}` : 'link-btn'}
      onClick={onClick}
      style={style}
    >
      {preIcon && <span className={`icon pre ${preIcon}`}></span>}
      <span className='link-text' style={{width: afterIcon ? 'calc(100% - 48px)' : 'calc(100% - 24px)'}}>{children}</span>
      {afterIcon && <span className={`icon ${afterIcon}`}></span>}
    </a>
  );
}
