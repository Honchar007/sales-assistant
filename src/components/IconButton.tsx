import React, { forwardRef } from 'react';

interface IconButtonProps {
  icon?: string,
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
  classNames?: string,
  style?: React.CSSProperties,
}

export type Ref = HTMLButtonElement;

const IconButton = forwardRef<Ref, IconButtonProps>((props, ref) => {
  const { icon, onClick, classNames, style } = props;
  // const buttonClass = icon ? `icon ${icon} ${classNames || ''}`.trim() : `icon ${classNames || ''}`.trim();

  return (
    <button ref={ref} className={classNames} onClick={onClick} style={style}>
      {/* <button className={buttonClass} onClick={onClick} style={style}> */}
      {icon && <i className={icon ? `icon ${icon}` : 'icon'}></i>}
    </button>
  );
});

export default IconButton;
