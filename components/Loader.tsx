
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-16 h-16 border-4 border-t-transparent border-fuchsia-400 rounded-full animate-spin"></div>
      <p className="text-fuchsia-300 text-lg">AI is creating magic...</p>
    </div>
  );
};

export default Loader;
