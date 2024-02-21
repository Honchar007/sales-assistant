import React from 'react';

interface IconButtonProps {
  icon?: string,
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
  classNames?: string,
  style?: React.CSSProperties,
}

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick, classNames, style }) => {
  // const buttonClass = icon ? `icon ${icon} ${classNames || ''}`.trim() : `icon ${classNames || ''}`.trim();

  return (
    <button className={classNames} onClick={onClick} style={style}>
      {/* <button className={buttonClass} onClick={onClick} style={style}> */}
      {icon && <i className={icon ? `icon ${icon}` : 'icon'}></i>}
    </button>
  );
};

export default IconButton;
