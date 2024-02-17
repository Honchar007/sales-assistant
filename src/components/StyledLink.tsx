import React from 'react';

interface LinkProps {
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void,
  children?: React.ReactNode,
  style?: React.CSSProperties,
  className?: string,
}

export default function StyledLink({ onClick, children = null, style, className }: LinkProps) {
  return (
    <a
      className={className ? `link ${className}` : 'link'}
      onClick={onClick}
      style={style}
    >
      {children}
    </a>
  );
}
