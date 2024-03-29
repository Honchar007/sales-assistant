import React, { forwardRef } from 'react';

interface IconButtonProps {
  icon?: string,
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
  classNames?: string,
  style?: React.CSSProperties,
  disabled?: boolean,
}

export type Ref = HTMLButtonElement;

const IconButton = forwardRef<Ref, IconButtonProps>((props, ref) => {
  const { icon, onClick, classNames, style, disabled } = props;

  return (
    <button ref={ref} disabled={disabled} className={classNames} onClick={onClick} style={style}>
      {icon && <i className={icon ? `icon ${icon}` : 'icon'}></i>}
    </button>
  );
});

export default IconButton;
