import React from 'react';
import Navbar2 from '../../assets/common/des_nav';

const sampleWorks = Array.from({ length: 4 }).map((_, idx) => ({
  id: idx,
  title: 'Lorem Ipsum',
  images: [
    '/src/assets/images/sample_portfolio.png',
    '/src/assets/images/sample_portfolio.png',
  ],
}));

const ProfilePage2: React.FC = () => {
  return (
    <div className="flex bg-[#e9f9ff] min-h-screen">
      {/* Left Sidebar */}
      <div className="bg-[#5FA8D3] w-64 p-6 flex flex-col justify-between text-white">
        <div>
          <div className="text-xl font-bold mb-4">Contact Info:</div>
          <p className="mb-2">amirkhan@gmail.com</p>
          <p className="mb-4">+977 980-1523050</p>
          <div className="text-xl font-bold mb-2">Experience:</div>
          <p className="mb-4">12+ years</p>
          <div className="text-xl font-bold mb-2">Portfolio</div>
          <p>www.amirkhan.com</p>
        </div>
        <button className="bg-[#D9534F] hover:bg-[#c64541] text-white font-bold py-2 rounded mt-6">
          LOGOUT
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar2 />

        {/* Profile Info */}
        <div className="flex flex-col items-center mt-10">
          <img
            src="/src/assets/images/sample_user.png"
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover mb-2"
          />
          <h1 className="text-4xl font-extrabold text-[#1B4965] mb-6">AMIR KHAN</h1>
        </div>

        {/* My Works & Add Post */}
        <div className="flex justify-between items-center px-10 mt-4 mb-6">
          <h2 className="text-xl font-semibold text-[#1B4965]">My Works</h2>
          <button className="bg-[#5FA8D3] text-white font-semibold px-4 py-2 rounded hover:bg-[#4a91be] transition">
            Add Post
          </button>
        </div>

        {/* Works Grid */}
        <div className="flex flex-col gap-6 px-10 pb-10">
          {sampleWorks.map((work) => (
            <div
              key={work.id}
              className="bg-white rounded-2xl shadow-md p-4 flex flex-col"
            >
              <h3 className="text-center font-semibold text-[#1B4965] mb-2">{work.title}</h3>
              <div className="flex gap-4 justify-center">
                {work.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Work ${idx}`}
                    className="w-1/3 rounded-xl object-cover"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage2;
