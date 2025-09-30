import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 tracking-wider">
        BrandPixo
      </h1>
      <p className="mt-2 text-lg text-gray-300">AI Product Shoot Studio</p>
    </header>
  );
};

export default Header;
