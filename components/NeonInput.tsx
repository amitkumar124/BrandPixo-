
import React from 'react';

interface NeonInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const NeonInput: React.FC<NeonInputProps> = (props) => {
  return (
    <textarea
      {...props}
      rows={3}
      className="w-full bg-black/30 border border-cyan-500/50 rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-shadow duration-300 shadow-[0_0_5px_rgba(0,255,255,0.2)] focus:shadow-[0_0_15px_rgba(0,255,255,0.5)]"
    />
  );
};

export default NeonInput;
