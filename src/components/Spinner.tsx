import React from 'react';

interface SpinnerProps {
  size?: string;
  borderWidth?: string;
  borderColor?: string;
  duration?: number;
  isFullScreen?: boolean,
}

const Spinner: React.FC<SpinnerProps> = ({ size = 50, isFullScreen = false }) => {
  const spinnerStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
  };

  return (
    <div className={`spinner-wrapper ${isFullScreen && 'spinner-wrapper-full-screen'}`} >
      <div className="spinner" style={spinnerStyle} />
    </div>
  );
};

export default Spinner;
