
import React from 'react';

const Logo = ({ size = 40 }: { size?: number }) => {
  return (
    <div className="flex items-center space-x-2">
      <div 
        className="relative flex items-center justify-center rounded-lg bg-gradient-to-br from-[#7B1F27] to-[#A52A2A]"
        style={{ width: size, height: size }}
      >
        <div className="relative">
          <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
            <div className="w-3 h-2 bg-[#F4C430] rounded-sm"></div>
          </div>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-white rounded-sm"></div>
        </div>
      </div>
      <span className="font-bold text-[#7B1F27] text-xl">AskNEU</span>
    </div>
  );
};

export default Logo;
