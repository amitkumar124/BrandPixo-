
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`
        w-full flex items-center justify-center bg-cyan-500 text-black font-bold py-3 px-4 rounded-lg
        transition-all duration-300
        hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(0,255,255,0.6)]
        disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed disabled:shadow-none
        focus:outline-none focus:ring-4 focus:ring-cyan-500/50
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
