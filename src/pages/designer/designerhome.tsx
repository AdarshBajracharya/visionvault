import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../assets/common/navbar';
import Navbar2 from '../../assets/common/des_nav';

const DesignerHomePage: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const sections = [
    {
      title: 'DISCOVER',
      img: '/src/assets/images/consumers1.png',
      text: (
        <>
          Browse through curated designer <br />
          portfolios and trending creative works.
        </>
      ),
    },
    {
      title: 'PREVIEW',
      img: '/src/assets/images/consumer2.png',
      text: (
        <>
          Use previews to visualize art or products <br />
          before buying.
        </>
      ),
    },
    {
      title: 'CONNECT',
      img: '/src/assets/images/customer3.png',
      text: (
        <>
          Chat with designers for commissions <br />
          or custom collaborations.
        </>
      ),
    },
    {
      title: 'PURCHASE',
      img: '/src/assets/images/customer4.png',
      text: (
        <>
          Securely buy or commission <br />
          creative pieces.
        </>
      ),
    },
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNext = () => {
    if (currentIndex < sections.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-[#e9f9ff] min-h-screen">
      <style>{`
        @keyframes zoomInSmooth {
          0% {
            transform: scale(0.7) translateY(${scrollY * -0.3}px);
            opacity: 0;
          }
          100% {
            transform: scale(1) translateY(${scrollY * -0.3}px);
            opacity: 1;
          }
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .fade-slide {
          opacity: 0;
          transform: scale(0.9);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .fade-slide.active {
          opacity: 1;
          transform: scale(1);
        }
      `}</style>

      <Navbar2 />

      <img
        src="/src/assets/images/designer_home_bg.png"
        alt="Designer Home Background"
        className="rotate-211.99 h-125 object-cover absolute top-30 left-105 inset-0 z-0 opacity-86"
      />

      <div className="bg-[#e9f9ff]">
        {/* Title Section */}
        <div className="flex flex-col justify-center items-center mt-40 z-10">
          <img
            src="/src/assets/images/DONUT.png"
            alt="donut1"
            className="absolute top-37 right-55 z-30 h-105 rotate-226.91"
            style={{
              transform: `translateY(${scrollY * -0.3}px)`,
              animation: 'zoomInSmooth 0.5s ease-in-out',
            }}
          />
          <img
            src="/src/assets/images/DONUT.png"
            alt="donut2"
            className="absolute top-50 left-48 z-50 h-105 rotate-300"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
              animation: 'zoomInSmooth 0.5s ease-in-out 0.1s both',
            }}
          />
          <label className="font-protest text-white text-8xl tracking-wide text-stroke drop-shadow-lg z-20">WELCOME</label>
          <label className="font-protest text-white text-8xl tracking-wide text-stroke drop-shadow-lg z-40">DESIGNER</label>
        </div>

        {/* About Designer */}
        <div className="mt-80 px-85 text-[#1B4965] text-2xl">
          <p className="">
            What do you do in VisionVault <br />
            <label className="font-bold">as a designer?</label>
            <br /><br />
            As a designer in VisionVault, you  <br />
            showcase your portfolio, receive feedback <br />
            from the community, discover freelance <br />
            opportunities through AI-matched  <br />
            projects, and sell your work directly  <br />
            through an integrated shop, all in one  <br />
            trusted and interactive platform.
          </p>
          <div className="mt-5">
            <button
              onClick={() => navigate('/findjobs')}
              className="bg-white text-[#5FA8D3] mt-5 font-bold py-2 px-18 rounded font-poppins text-lg border-1 border-[#5FA8D3]">
              Find Jobs
            </button>
            <img
              src="/src/assets/images/jellyfish.png"
              alt="Designer Home Graphic"
              className="absolute top-160 right-40 z-10 h-150"
              style={{
                transform: `scale(${Math.max(1 - scrollY * 0.0005, 0.75)})`,
                transition: 'transform 0.1s ease-out',
                willChange: 'transform',
              }}
            />
          </div>
        </div>

        {/* Getting Started Section */}
        <h1 className="text-7xl font-protest text-center mt-40 text-[#1B4965]">GETTING STARTED</h1>

        <div className="relative mt-20 mb-20 overflow-hidden w-full">
          {/* Arrow Buttons */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-[#5FA8D3] text-white w-12 h-12 rounded-full shadow-md flex items-center justify-center z-10 transition-all hover:scale-110 disabled:opacity-40"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === sections.length - 1}
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-[#5FA8D3] text-white w-12 h-12 rounded-full shadow-md flex items-center justify-center z-10 transition-all hover:scale-110 disabled:opacity-40"
          >
            →
          </button>

          {/* Slide Container */}
          <div className="relative w-full h-[400px] flex items-center justify-center">
            {sections.map((section, index) => (
              <div
                key={index}
                className={`absolute w-full px-10 transition-all duration-500 ease-in-out flex justify-center items-center ${index === currentIndex ? 'fade-slide active' : 'fade-slide'
                  }`}
              >
                <div className="max-w-screen-xl flex flex-row items-center gap-20">
                  <img src={section.img} alt={section.title} className="h-80" />
                  <p className="text-2xl text-[#1B4965] text-left">
                    <b>{section.title}</b>
                    <br />
                    <br />
                    {section.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignerHomePage;
