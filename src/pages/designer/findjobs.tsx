import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar2 from '../../assets/common/des_nav';

const FindJobsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCard, setSelectedCard] = useState<any>(null);

  // For fullscreen image viewer:
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    const fetchJobsWithProfiles = async () => {
      try {
        const jobRes = await axios.get('http://localhost:3000/api/v1/job');
        const jobsData = jobRes.data.data;

        const jobsWithNames = jobsData.map((job: any) => ({
          ...job,
          creatorName: job.createdBy?.name || 'Unknown',
          creatorEmail: job.createdBy?.email || '', // ensure email is available here
        }));

        setJobs(jobsWithNames);
      } catch (err) {
        console.error('Error fetching jobs:', err);
      }
    };

    fetchJobsWithProfiles();
  }, []);

  const filterData = jobs.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.type === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Open fullscreen image viewer on click image in job modal
  const openImageViewer = (index: number) => {
    setCurrentImageIndex(index);
    setIsImageViewerOpen(true);
  };

  // Navigation in fullscreen image viewer
  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      selectedCard
        ? (prev - 1 + selectedCard.referencePics.length) % selectedCard.referencePics.length
        : 0
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      selectedCard
        ? (prev + 1) % selectedCard.referencePics.length
        : 0
    );
  };

  // Handler for contact button - opens Gmail compose in new tab
  const handleContactClick = () => {
    if (!selectedCard?.creatorEmail) {
      alert('No email available for this job poster.');
      return;
    }
    const toEmail = selectedCard.creatorEmail;
    const subject = encodeURIComponent(`Inquiry about job: ${selectedCard.title}`);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${toEmail}&su=${subject}`;

    window.open(gmailUrl, '_blank');
  };

  return (
    <div className="bg-[#e9f9ff] min-h-screen relative">
      {/* Navbar */}
      <div className="relative z-50">
        <Navbar2 />
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
          className="absolute top-[190px] right-[145px] z-50 h-[420px] rotate-[-11.33deg]"
        />
        <img
          src="/src/assets/images/trail.png"
          alt="trail"
          className="absolute top-[290px] left-[340px] z-0 h-[280px] rotate-[-11.33deg]"
        />
        <label className="font-protest text-white text-8xl tracking-wide drop-shadow-lg z-20 text-stroke">
          FIND JOBS
        </label>
      </div>

      {/* Job Cards */}
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
                selectedCategory === item ? 'bg-[#94d6f5] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-6">
          {filterData.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedCard(item)}
              className="bg-white rounded-2xl shadow-lg p-4 flex flex-col gap-4 cursor-pointer hover:shadow-xl transition"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="/src/assets/images/sample_user.png"
                    alt="User"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{item.creatorName}</p>
                    <p className="text-gray-500 text-sm">{item.title}</p>
                  </div>
                </div>
                <button className="text-blue-500 hover:underline font-medium">View</button>
              </div>
              <div className="flex gap-4 overflow-x-auto">
                {item.referencePics?.slice(0, 3).map((pic: string, idx: number) => (
                  <img
                    key={idx}
                    src={`http://localhost:3000/uploads/${pic}`}
                    alt={`Preview ${idx}`}
                    className="rounded-xl object-cover h-32 w-full sm:w-1/3 flex-shrink-0"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Job Details Modal */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white w-[90%] max-w-4xl rounded-3xl p-8 shadow-xl relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-4 right-6 text-xl font-bold text-gray-600 hover:text-red-500"
              onClick={() => setSelectedCard(null)}
            >
              ✕
            </button>

            <div className="flex items-center gap-4 mb-6">
              <img src="/src/assets/images/sample_user.png" className="w-14 h-14 rounded-full" alt="user" />
              <div>
                <h3 className="text-[#1B4965] font-bold text-lg uppercase">{selectedCard.creatorName}</h3>
                <p className="text-gray-700">Looking for: {selectedCard.title}</p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">{selectedCard.description}</p>

            <h4 className="text-[#1B4965] font-bold text-lg mb-4">Reference pics:</h4>
            <div className="flex flex-wrap gap-4 mb-8">
              {selectedCard.referencePics?.map((img: string, idx: number) => (
                <img
                  key={idx}
                  src={`http://localhost:3000/uploads/${img}`}
                  alt="sample"
                  className="w-40 h-32 object-cover rounded-xl cursor-pointer"
                  onClick={() => openImageViewer(idx)}
                />
              ))}
            </div>

            <button
              onClick={handleContactClick}
              className="bg-[#5FA8D3] text-white px-6 py-2 rounded-xl font-semibold hover:bg-[#4a91be] transition"
            >
              CONTACT
            </button>
          </div>
        </div>
      )}

      {/* Fullscreen Image Viewer */}
      {isImageViewerOpen && selectedCard && (
        <div className="fixed inset-0 z-[100] bg-black bg-opacity-90 flex flex-col justify-center items-center p-4">
          <button
            className="absolute top-6 right-6 text-white text-3xl font-bold hover:text-red-600"
            onClick={() => setIsImageViewerOpen(false)}
          >
            ✕
          </button>

          {/* Prev Arrow */}
          <button
            className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold px-4 py-2 hover:text-gray-300 select-none"
            onClick={prevImage}
          >
            ‹
          </button>

          {/* Next Arrow */}
          <button
            className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold px-4 py-2 hover:text-gray-300 select-none"
            onClick={nextImage}
          >
            ›
          </button>

          <img
            src={`http://localhost:3000/uploads/${selectedCard.referencePics[currentImageIndex]}`}
            alt={`Fullscreen ${currentImageIndex}`}
            className="max-h-[80vh] max-w-full rounded-lg shadow-lg"
          />

          {/* Thumbnails */}
          <div className="flex gap-2 mt-6 overflow-x-auto max-w-full px-4">
            {selectedCard.referencePics.map((img: string, idx: number) => (
              <img
                key={idx}
                src={`http://localhost:3000/uploads/${img}`}
                alt={`Thumbnail ${idx}`}
                className={`w-20 h-16 object-cover rounded cursor-pointer border-4 ${
                  idx === currentImageIndex ? 'border-blue-400' : 'border-transparent'
                }`}
                onClick={() => setCurrentImageIndex(idx)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FindJobsPage;
