import React, { ChangeEvent, useEffect, useRef } from 'react';

interface TextAreaProps {
  placeholder?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  maxWidth?: number;
}

const StyledTextArea = ({
  placeholder,
  value,
  onChange,
  className,
  maxWidth,
}: TextAreaProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const resizeTextArea = () => {
    if (textAreaRef.current && textAreaRef.current.style && maxWidth) {
      if (value) {
        textAreaRef.current.style.height = 'auto';
        textAreaRef.current.style.height = Math.min(textAreaRef.current.scrollHeight, maxWidth) + 'px';
      } else {
        textAreaRef.current.style.height = 'auto';
        textAreaRef.current.style.height = '24px';
      }
    }
  };

  useEffect(resizeTextArea, [value]);

  return (
    <textarea
      ref={textAreaRef}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`styled-textarea ${className}`}
      rows={1}
    />
  );
};

export default StyledTextArea;
