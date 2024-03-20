import React from 'react';

interface SpinnerProps {
  size?: string;
  borderWidth?: string;
  borderColor?: string;
  duration?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 50 }) => {
  const spinnerStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
  };

  return (
    <div className="spinner-wrapper" >
      <div className="spinner" style={spinnerStyle} />
    </div>
  );
};

export default Spinner;
