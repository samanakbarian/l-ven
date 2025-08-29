
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
       <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-loven-green"></div>
       <p className="mt-4 text-lg text-gray-400">Laddar data...</p>
    </div>
  );
};

export default Loader;
