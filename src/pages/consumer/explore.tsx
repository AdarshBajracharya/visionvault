import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../assets/common/navbar';

interface Post {
  _id: string;
  title: string;
  description: string;
  type: string;
  referencePics: string[];
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
}

interface Designer {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  experience?: string;
  portfolio?: string;
  image?: string | null;
}

const ExplorePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCard, setSelectedCard] = useState<Post | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Designer profile modal state
  const [designerProfile, setDesignerProfile] = useState<Designer | null>(null);
  const [loadingDesigner, setLoadingDesigner] = useState(false);
  const [designerError, setDesignerError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/v1/post');
        setPosts(res.data.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  // Reset current image index when a new card is selected
  useEffect(() => {
    if (selectedCard) {
      setCurrentImageIndex(0);
    }
  }, [selectedCard]);

  const filterData = posts.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.type === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Fetch designer profile on Contact Designer click
  const handleContactDesignerClick = async (designerId: string) => {
    setLoadingDesigner(true);
    setDesignerError(null);
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/designer/${designerId}`);
      setDesignerProfile(res.data.data);
    } catch (error) {
      setDesignerError('Failed to load designer profile.');
      console.error(error);
    } finally {
      setLoadingDesigner(false);
    }
  };

  // Close designer profile modal
  const closeDesignerProfile = () => {
    setDesignerProfile(null);
  };

  return (
    <div className="bg-[#e9f9ff] min-h-screen relative">
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

        {/* Post Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterData.map((item) => (
            <div
              key={item._id}
              onClick={() => setSelectedCard(item)}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition hover:shadow-xl"
            >
              <img
                src={`http://localhost:3000/uploads/${item.referencePics[0]}`}
                alt="Portfolio"
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex items-center gap-4">
                <img
                  src="/src/assets/images/sample_user.png"
                  alt="User"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold">{item.createdBy?.name || 'Unknown'}</p>
                  <p className="text-sm text-gray-500">{item.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Card Detail Modal */}
      {selectedCard && !designerProfile && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#e9f9ff] z-[999] overflow-auto px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Main Preview with navigation */}
            <div className="relative w-full lg:w-1/2">
              <img
                src={`http://localhost:3000/uploads/${selectedCard.referencePics[currentImageIndex]}`}
                alt={`Full ${currentImageIndex}`}
                className="w-full border-[4px] border-blue-300 rounded-xl"
              />
              {/* Previous Button */}
              <button
                onClick={() =>
                  setCurrentImageIndex((prev) =>
                    prev === 0 ? selectedCard.referencePics.length - 1 : prev - 1
                  )
                }
                className="absolute top-1/2 left-2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-blue-100"
                aria-label="Previous Image"
              >
                ‹
              </button>
              {/* Next Button */}
              <button
                onClick={() =>
                  setCurrentImageIndex((prev) =>
                    prev === selectedCard.referencePics.length - 1 ? 0 : prev + 1
                  )
                }
                className="absolute top-1/2 right-2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-blue-100"
                aria-label="Next Image"
              >
                ›
              </button>
            </div>

            {/* Details */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedCard.createdBy?.name}</h2>
                <p className="text-gray-700 mb-6 max-w-lg">{selectedCard.description}</p>
              </div>
              <button
                onClick={() => handleContactDesignerClick(selectedCard.createdBy._id)}
                className="bg-white border border-blue-500 text-blue-500 px-6 py-2 rounded-lg font-semibold w-fit hover:bg-blue-100"
              >
                Contact Designer
              </button>
            </div>
          </div>

          {/* Gallery Thumbnails */}
          <div className="mt-12">
            <div className="flex gap-4 overflow-x-auto">
              {selectedCard.referencePics.map((pic, i) => (
                <img
                  key={i}
                  src={`http://localhost:3000/uploads/${pic}`}
                  alt={`Work ${i}`}
                  className={`rounded-xl w-24 h-24 object-cover border cursor-pointer ${
                    i === currentImageIndex ? 'border-blue-500 border-4' : 'border'
                  }`}
                  onClick={() => setCurrentImageIndex(i)}
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

      {/* Designer Profile Modal */}
      {designerProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-[1000] p-6 overflow-auto">
          <button
            onClick={closeDesignerProfile}
            className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-red-500"
            aria-label="Close designer profile"
          >
            ✕
          </button>

          <div className="bg-white rounded-xl p-8 max-w-xl w-full shadow-xl">
            <div className="flex flex-col items-center gap-4">
              <img
                src={
                  designerProfile.image
                    ? `http://localhost:3000/uploads/${designerProfile.image}`
                    : '/src/assets/images/sample_user.png'
                }
                alt={designerProfile.name}
                className="w-32 h-32 rounded-full object-cover"
              />
              <h2 className="text-2xl font-bold">{designerProfile.name}</h2>
              <p className="text-gray-700">{designerProfile.email}</p>
              {designerProfile.phone && <p className="text-gray-700">Phone: {designerProfile.phone}</p>}
              {designerProfile.experience && (
                <p className="text-gray-700">Experience: {designerProfile.experience}</p>
              )}
              {designerProfile.portfolio && (
                <p className="text-blue-600 underline">
                  <a href={designerProfile.portfolio} target="_blank" rel="noreferrer">
                    Portfolio
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Show loading or error for designer fetch */}
      {loadingDesigner && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1100]">
          <p className="text-white text-lg">Loading designer profile...</p>
        </div>
      )}
      {designerError && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1100]">
          <p className="text-red-500 bg-white px-4 py-2 rounded">{designerError}</p>
          <button onClick={() => setDesignerError(null)} className="ml-4 px-2 py-1 bg-gray-300 rounded">
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
