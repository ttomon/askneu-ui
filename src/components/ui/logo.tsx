
import React from 'react';

const Logo = ({ size = 40 }: { size?: number }) => {
  return (
    <div className="flex flex-col items-center space-y-1">
      <img 
        src="/lovable-uploads/9cb8bbbe-1a11-4c59-ac98-85adac17b418.png" 
        alt="AskNEU Logo"
        className="rounded-lg"
        style={{ width: size, height: size }}
      />
      <span className="font-bold text-[#7B1F27] text-xl">AskNEU</span>
    </div>
  );
};

export default Logo;
