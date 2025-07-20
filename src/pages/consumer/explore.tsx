import React, { useState, useEffect, useRef } from 'react';
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

  // Designer profile modal state
  const [designerProfile, setDesignerProfile] = useState<Designer | null>(null);
  const [loadingDesigner, setLoadingDesigner] = useState(false);
  const [designerError, setDesignerError] = useState<string | null>(null);

  // Modal image viewer state
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Drag scroll state for works gallery
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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

  // Close designer profile modal and image viewer
  const closeDesignerProfile = () => {
    setDesignerProfile(null);
    setSelectedIndex(null);
  };

  // Modal viewer navigation
  const openModal = (idx: number) => setSelectedIndex(idx);
  const closeModal = () => setSelectedIndex(null);
  const prevImage = () =>
    setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
  const nextImage = () =>
    setSelectedIndex((prev) =>
      prev !== null && prev < currentWorks.length - 1 ? prev + 1 : prev
    );

  // Drag scroll handlers for works gallery
  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  const onMouseLeaveOrUp = () => setIsDragging(false);
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1; // scroll speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // Collect all works of current designer
  const currentWorks = posts
    .filter((post) => post.createdBy._id === designerProfile?._id)
    .flatMap((post) => post.referencePics);

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
                src={`http://localhost:3000/uploads/${selectedCard.referencePics[0]}`}
                alt={`Full 0`}
                className="w-full border-[4px] border-blue-300 rounded-xl"
              />
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

          {/* Close Button */}
          <button
            onClick={() => setSelectedCard(null)}
            className="absolute top-4 right-4 text-xl text-gray-600 hover:text-red-500"
          >
            ✕
          </button>
        </div>
      )}

      {/* Designer Profile Modal matching your ProfileCard style */}
      {designerProfile && (
        <div className="fixed inset-0 bg-[#d3f1fc] flex items-center justify-center z-[1000] overflow-auto p-6">
          {/* Close Button */}
          <button
            onClick={closeDesignerProfile}
            className="absolute top-6 right-6 text-3xl text-gray-700 hover:text-red-500 font-bold"
          >
            ✕
          </button>

          <div className="relative max-w-5xl w-full mx-auto bg-white shadow-2xl rounded-3xl p-10 overflow-hidden">
            <img
              src="/src/assets/images/V.png"
              alt="Placeholder"
              className="absolute inset-0 m-auto opacity-10 w-1/2 h-auto object-contain pointer-events-none z-0"
              style={{ top: '50%', transform: 'translateY(-20%)' }}
            />

            {/* Profile Info */}
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start relative z-10">
              <div className="flex items-center gap-6 mb-6 md:mb-0">
                <img
                  src={
                    designerProfile.image
                      ? `http://localhost:3000/uploads/${designerProfile.image}`
                      : "/src/assets/images/sample_user.png"
                  }
                  alt={designerProfile.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-bold">{designerProfile.name}</h2>
                  <p className="text-gray-700">
                    {designerProfile.experience ? `Experience: ${designerProfile.experience}` : "Designer"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <h3 className="font-bold text-lg">Contact:</h3>
                {designerProfile.portfolio && (
                  <p className="text-blue-600 underline">
                    <a href={designerProfile.portfolio} target="_blank" rel="noreferrer">
                      {designerProfile.portfolio}
                    </a>
                  </p>
                )}
                <p className="text-gray-700">{designerProfile.email}</p>
                {designerProfile.phone && <p className="text-gray-700">{designerProfile.phone}</p>}
              </div>
            </div>

            {/* Works */}
            <div className="mt-10 relative z-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">My Works</h3>
              </div>

              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto cursor-grab active:cursor-grabbing"
                onMouseDown={onMouseDown}
                onMouseLeave={onMouseLeaveOrUp}
                onMouseUp={onMouseLeaveOrUp}
                onMouseMove={onMouseMove}
              >
                {currentWorks.length > 0 ? (
                  currentWorks.map((img, idx) => (
                    <img
                      key={idx}
                      src={`http://localhost:3000/uploads/${img}`}
                      alt={`Work ${idx}`}
                      onClick={() => openModal(idx)}
                      className="w-72 h-48 object-cover rounded-xl border border-gray-200 shadow-sm cursor-pointer flex-shrink-0"
                    />
                  ))
                ) : (
                  <p className="text-gray-600">No works available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Viewer for works */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 p-4">
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-3xl font-bold"
          >
            ✕
          </button>

          {/* Main enlarged image */}
          <div className="flex items-center justify-center relative mb-4">
            <button
              onClick={prevImage}
              disabled={selectedIndex === 0}
              className="text-white text-4xl font-bold hover:scale-110 transition disabled:opacity-30 absolute left-[-50px]"
            >
              ‹
            </button>
            <img
              src={`http://localhost:3000/uploads/${currentWorks[selectedIndex]}`}
              alt={`Enlarged ${selectedIndex}`}
              className="max-w-4xl max-h-[80vh] rounded-lg shadow-lg object-contain"
            />
            <button
              onClick={nextImage}
              disabled={selectedIndex === currentWorks.length - 1}
              className="text-white text-4xl font-bold hover:scale-110 transition disabled:opacity-30 absolute right-[-50px]"
            >
              ›
            </button>
          </div>

          {/* Thumbnails row */}
          <div className="flex gap-2 mt-2 overflow-x-auto max-w-full">
            {currentWorks.map((img, idx) => (
              <img
                key={idx}
                src={`http://localhost:3000/uploads/${img}`}
                alt={`Thumb ${idx}`}
                onClick={() => setSelectedIndex(idx)}
                className={`w-20 h-14 object-cover rounded-md cursor-pointer border-2 ${
                  idx === selectedIndex ? 'border-[#5FA8D3]' : 'border-transparent'
                }`}
              />
            ))}
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
