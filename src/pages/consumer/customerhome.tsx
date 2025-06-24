import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../assets/common/navbar';


const DesignerHomePage: React.FC = () => {
    return (
        <div className='bg-[#e9f9ff] min-h-screen'>
            <Navbar />
            <img src="/src/assets/images/designer_home_bg.png" alt="Designer Home Background" className="rotate-211.99 h-125 object-cover absolute top-30 left-105 inset-0 z-0 opacity-86" />

            <div className="bg-[#e9f9ff]">

                <div className="flex flex-col justify-center items-center mt-40 z-10">
                    <img src="/src/assets/images/DONUT.png" alt="donut1" className="absolute top-40 right-38 z-30 h-105 rotate-226.91" />
                    <img src="/src/assets/images/DONUT.png" alt="donut2" className="absolute top-75 left-41 z-50 h-105 rotate-300" />
                    <label className="font-protest text-white text-8xl tracking-wide drop-shadow-lg z-20">ILLUSTRATION</label>
                    <label className="font-protest text-white text-8xl tracking-wide drop-shadow-lg z-40">UI/UX DESIGN</label>
                    <label className="font-protest text-white text-8xl tracking-wide drop-shadow-lg z-60">ANIMATION</label>
                </div>

                <div className="mt-70 px-85 text-[#1B4965] text-2xl">
                    <p className='font-encode'>
                        What do you do in VisionVault <br />
                        <label className="font-bold">as a consumer?</label>
                        <br /><br />
                        As a consumer in VisionVault, you explore <br />
                        verified designer portfolios, try out <br />
                        previews of digital art or products, <br />
                        purchase creative works directly, and <br />
                        connect with designers for custom <br />
                        projects, all through a seamless and secure <br />
                        experience.
                    </p>
                    <div className='mt-5'>
                    <button className="bg-[#5FA8D3] text-white font-bold py-3 px-10 rounded font-poppins text-xl">
                        Explore
                    </button>
                    <button className="bg-white text-[#5FA8D3] font-bold py-3 px-10 rounded ml-4 font-poppins text-xl border-2 border-[#5FA8D3]">
                        Hire a Designer
                    </button>
                    <img src="/src/assets/images/jellyfish.png" alt="Designer Home Graphic" className="absolute top-190 right-60 z-10 h-120" />
                    </div>
                </div>
                <div>
                    <h1 className="text-7xl font-protest text-center mt-50 text-[#1B4965]">
                        GETTING STARTED   </h1>
                </div>
            </div>

        </div>
    );
};

export default DesignerHomePage;
