import React, { useEffect, useState } from 'react';
import Navbar from '../../assets/common/navbar';

const ExplorePage: React.FC = () => {

  return (
    <div className="bg-[#e9f9ff] min-h-screen">
      <Navbar />
       <img
        src="/src/assets/images/designer_home_bg.png"
        alt="Designer Home Background"
        className="rotate-197.75 h-125 object-cover absolute top-30 left-105 inset-0 z-0 opacity-86"
      />
      <div className="flex flex-col items-center justify-center h-screen absolute top-0 left-0 w-full">
        <label className="font-protest text-white text-8xl tracking-wide drop-shadow-lg z-20">DISCOVER NEW</label>
        <label className="font-protest text-white text-8xl tracking-wide drop-shadow-lg z-20">TALENTS</label>
      </div>
      
    </div>
  );
};

export default ExplorePage;
