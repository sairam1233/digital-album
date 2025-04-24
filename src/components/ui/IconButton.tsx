import React from 'react';

interface IconButtonProps {
  onClick: () => void;
  className?: string;
  ariaLabel: string;
  children: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({ 
  onClick, 
  className = '', 
  ariaLabel,
  children 
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${className}`}
    >
      {children}
    </button>
  );
};

export default IconButton;