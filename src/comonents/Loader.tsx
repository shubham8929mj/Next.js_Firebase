import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed h-[100%] w-[100%] z-10 flex items-center justify-center h-screen bg-opacity-50 bg-white backdrop-filter backdrop-blur-lg">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default Loader;
