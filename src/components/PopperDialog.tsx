import React, { useEffect, useRef } from 'react';
import { usePopper } from 'react-popper';

export interface PopperDialog {
  children?: React.ReactNode,
  referenceElem: HTMLButtonElement | HTMLAnchorElement | null,
  onBlur?: () => void,
  style?: React.CSSProperties,
  position?: 'bottom' | 'top',
  centered?: boolean,
}

export default function PopperDialog({children, referenceElem, onBlur, style, position = 'top', centered}: PopperDialog) {
  const referencePopper = useRef<HTMLDivElement>(null);
  const { attributes } = usePopper(referencePopper.current, referenceElem, {
    placement: 'bottom',
  });

  const popperStyles = {
    left: centered ? '50%' : '0',
    [position]: '100%',
    ...style,
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        referenceElem &&
        referencePopper.current &&
        !referencePopper.current.contains(event.target as Node) &&
        !referenceElem.contains(event.target as Node)
      ) {
        if (onBlur) onBlur();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onBlur, referenceElem]);

  return (
    <div ref={referencePopper} style={popperStyles} {...attributes.popper} className='popper'>
      {children}
    </div>
  );
}
