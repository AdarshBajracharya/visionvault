import React, { useState } from 'react';
import Navbar from '../../assets/common/navbar';

const sampleData = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  name: 'John Doe',
  role: ['UI/UX Designer', 'Illustrator', 'Animator', 'Logo Designer', 'Mobile Designer'][i % 5],
  category: ['Web design', 'Illustration', 'Animation', 'Logo', 'Mobile'][i % 5],
  description:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
  portfolioImage: '/src/assets/images/sample_portfolio.png',
  userImage: '/src/assets/images/sample_user.png',
}));

const ExplorePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCard, setSelectedCard] = useState<any>(null);

  const filterData = sampleData.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#e9f9ff] min-h-screen relative">
      {/* Navbar */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Hero Section */}
      <img
        src="/src/assets/images/designer_home_bg.png"
        alt="Designer Home Background"
        className="rotate-[197.75deg] h-[500px] object-cover absolute top-[120px] left-[420px] inset-0 z-0 opacity-90"
      />
      <div className="flex flex-col items-center justify-center h-screen absolute top-0 left-0 w-full z-10 pointer-events-none">
        <img
          src="/src/assets/images/plane.png"
          alt="plane"
          className="absolute top-[240px] right-[180px] z-50 h-[420px]"
        />
        <img
          src="/src/assets/images/trail.png"
          alt="trail"
          className="absolute top-[280px] left-[320px] z-0 h-[280px]"
        />
        <label className="font-protest text-white text-8xl tracking-wide drop-shadow-lg text-stroke z-20">
          DISCOVER NEW
        </label>
        <label className="font-protest text-white text-8xl tracking-wide drop-shadow-lg text-stroke z-20">
          TALENTS
        </label>
      </div>

      {/* Portfolio Section */}
      <div className="relative z-20 mt-[700px] w-full px-40">
        {/* Search Bar */}
        <div className="w-full mb-6 px-2">
          <div className="flex items-center bg-white rounded-full px-6 py-3 shadow-lg w-full">
            <input
              type="text"
              placeholder="What are you searching for?"
              className="flex-grow bg-transparent text-gray-700 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center px-2 mb-8 w-full text-lg">
          {['All', 'Illustration', 'Web design', 'Logo', 'Animation', 'Mobile'].map((item) => (
            <button
              key={item}
              onClick={() => setSelectedCategory(item)}
              className={`rounded-xl px-10 py-3 transition ${
                selectedCategory === item
                  ? 'bg-[#94d6f5] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterData.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedCard(item)}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition hover:shadow-xl"
            >
              <img
                src={item.portfolioImage}
                alt="Portfolio"
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex items-center gap-4">
                <img
                  src={item.userImage}
                  alt="User"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Card Detail Modal */}
      {selectedCard && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#e9f9ff] z-[999] overflow-auto px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Main Preview */}
            <img
              src={selectedCard.portfolioImage}
              alt="Full"
              className="w-full lg:w-1/2 border-[4px] border-blue-300 rounded-xl"
            />

            {/* Details */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedCard.name}</h2>
                <p className="text-gray-700 mb-6 max-w-lg">{selectedCard.description}</p>
              </div>
              <button className="bg-white border border-blue-500 text-blue-500 px-6 py-2 rounded-lg font-semibold w-fit hover:bg-blue-100">
                Contact Designer
              </button>
            </div>
          </div>

          {/* Gallery */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">More from this designer</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <img
                  key={i}
                  src={selectedCard.portfolioImage}
                  alt={`Work ${i}`}
                  className="rounded-xl w-full h-48 object-cover border"
                />
              ))}
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setSelectedCard(null)}
            className="absolute top-4 right-4 text-xl text-gray-600 hover:text-red-500"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
