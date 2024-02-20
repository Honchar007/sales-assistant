import React from 'react';

interface IconButtonProps {
  icon?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick }) => {
  return (
    <button className={icon ? `icon ${icon}` : 'icon'} onClick={onClick}></button>
  );
};

export default IconButton;
