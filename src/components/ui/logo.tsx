
import React from 'react';

const Logo = ({ size = 40 }: { size?: number }) => {
  return (
    <div className="flex flex-col items-center space-y-1">
      <img 
        src="/lovable-uploads/43e97cfe-0e7d-437e-bd7f-7c52bc9b04c8.png" 
        alt="AskNEU Logo"
        className="rounded-lg"
        style={{ width: size, height: size }}
      />
      <span className="font-bold text-[#2563EB] text-xl">AskNEU</span>
    </div>
  );
};

export default Logo;
