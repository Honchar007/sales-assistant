import React from 'react';

interface LinkProps extends React.ButtonHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode,
  style?: React.CSSProperties,
  className?: string,
  preIcon?: string,
  afterIcon?: React.ReactNode,
  ref?: React.Ref<HTMLAnchorElement>;
}

export default function StyledLink({ name, onClick, children, style, className, preIcon, afterIcon, ref }: LinkProps) {
  return (
    <a
      id={name}
      ref={ref}
      className={className ? `link-btn ${className}` : 'link-btn'}
      onClick={onClick}
      style={style}
    >
      {preIcon && <span className={`icon ${preIcon}`}></span>}
      <span
        className='link-text'
        style={{
          width: `calc(100% - ${afterIcon && preIcon ? '48' : afterIcon || preIcon ? '24' : '0'}px)`,
          marginLeft: preIcon ? '8px' : '0',
        }}
      >
        {children}
      </span>
      {afterIcon && <>{afterIcon}</>}
    </a>
  );
}
