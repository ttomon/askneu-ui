
import React from 'react';

const Logo = ({ size = 40 }: { size?: number }) => {
  return (
    <div className="flex items-center space-x-2">
      <img 
        src="/lovable-uploads/374525e7-897e-493c-bb20-7f41d97bda15.png" 
        alt="AskNEU Logo"
        className="rounded-lg"
        style={{ width: size, height: size }}
      />
      <span className="font-bold text-[#7B1F27] text-xl">AskNEU</span>
    </div>
  );
};

export default Logo;
