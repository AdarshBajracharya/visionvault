import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Navbar from '../../assets/common/navbar';
import { useNavigate } from 'react-router-dom';

interface Designer {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  portfolio?: string;
  role?: string;
  image?: string;
  experience?: string;
}

const HirePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDesigner, setSelectedDesigner] = useState<Designer | null>(null);
  const [designers, setDesigners] = useState<Designer[]>([]);

  // Works images of selected designer
  const [designerWorks, setDesignerWorks] = useState<string[]>([]);

  // All designers' works keyed by designer ID
  const [allDesignerWorks, setAllDesignerWorks] = useState<Record<string, string[]>>({});

  // Image modal inside profile modal
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Drag scroll state for works gallery inside modal
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const fetchDesigners = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/v1/designer');
        console.log('API response data:', res.data);
        const data = Array.isArray(res.data.data) ? res.data.data : [];
        setDesigners(data);
      } catch (error) {
        console.error('Error fetching designers', error);
      }
    };

    fetchDesigners();
  }, []);

  // Fetch works for all designers after designers are loaded
  useEffect(() => {
    const fetchAllWorks = async () => {
      try {
        const worksMap: Record<string, string[]> = {};

        await Promise.all(
          designers.map(async (designer) => {
            try {
              const res = await axios.get(`http://localhost:3000/api/v1/post/designer/${designer._id}`);
              if (res.data.success) {
                const pics = res.data.data.flatMap((post: any) => post.referencePics);
                worksMap[designer._id] = pics;
              } else {
                worksMap[designer._id] = [];
              }
            } catch {
              worksMap[designer._id] = [];
            }
          })
        );

        setAllDesignerWorks(worksMap);
      } catch (error) {
        console.error("Error fetching all designer works", error);
      }
    };

    if (designers.length > 0) {
      fetchAllWorks();
    }
  }, [designers]);

  const filteredDesigners = designers.filter((designer) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      (designer.role?.toLowerCase().includes(selectedCategory.toLowerCase()) ?? false);

    const matchesSearch =
      designer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (designer.role?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

    return matchesCategory && matchesSearch;
  });

  // Fetch works of a designer by ID (for profile modal)
  const fetchDesignerWorks = async (designerId: string) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/post/designer/${designerId}`);
      if (res.data.success) {
        const pics = res.data.data.flatMap((post: any) => post.referencePics);
        setDesignerWorks(pics);
      } else {
        setDesignerWorks([]);
      }
    } catch (error) {
      console.error('Error fetching designer works', error);
      setDesignerWorks([]);
    }
  };

  // Open profile and load works
  const openDesignerProfile = (designer: Designer) => {
    setSelectedDesigner(designer);
    setSelectedIndex(null);
    fetchDesignerWorks(designer._id);
  };

  // Image modal controls
  const openImageModal = (idx: number) => setSelectedIndex(idx);
  const closeImageModal = () => setSelectedIndex(null);
  const prevImage = () =>
    setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
  const nextImage = () =>
    setSelectedIndex((prev) =>
      prev !== null && prev < (designerWorks.length - 1) ? prev + 1 : prev
    );

  // Drag scroll handlers for works gallery inside profile modal
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
        className="rotate-[1.71deg] h-[500px] object-cover absolute top-[120px] left-[420px] inset-0 z-0 opacity-90"
      />
      <div className="flex flex-col items-center justify-center h-screen absolute top-0 left-0 w-full z-10 pointer-events-none">
        <img
          src="/src/assets/images/laltin.png"
          alt="laltin"
          className="rotate-[1.02deg] absolute top-[100px] right-[290px] z-50 h-[550px]"
        />
        <img
          src="/src/assets/images/speaker.png"
          alt="speaker"
          className="absolute top-[130px] left-[280px] z-50 h-[420px] rotate-11.33"
        />
        <label className="font-protest text-white text-8xl tracking-wide text-stroke drop-shadow-lg z-20">
          HIRE A
        </label>
        <label className="font-protest text-white text-8xl tracking-wide text-stroke drop-shadow-lg z-60">
          DESIGNER
        </label>
        <button
          onClick={() => navigate('/postjob')}
          className="pointer-events-auto absolute bg-white text-[#5FA8D3] font-bold py-2 px-20 rounded ml-4 font-poppins text-xl border-1 border-[#5FA8D3] top-123 right-155 z-100"
        >
          Post a Job
        </button>
      </div>

      {/* Designer Cards */}
      <div className="relative z-20 mt-[700px] w-full px-40">
        {/* Search */}
        <div className="w-full mb-6 px-2">
          <div className="flex items-center bg-white rounded-full px-6 py-3 shadow-lg w-full">
            <input
              type="text"
              placeholder="Search designers or roles..."
              className="flex-grow bg-transparent text-gray-700 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center px-2 mb-8 w-full text-lg">
          {['All', 'Illustrator', 'Web designer', 'Animator', 'Mobile Designer'].map((item) => (
            <button
              key={item}
              onClick={() => setSelectedCategory(item)}
              className={`rounded-xl px-10 py-3 transition ${selectedCategory === item
                  ? 'bg-[#94d6f5] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Designer Cards Grid */}
        <div className="flex flex-col gap-6">
          {filteredDesigners.map((designer) => (
            <div key={designer._id} className="bg-white rounded-2xl shadow-lg p-4 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      designer.image
                        ? `http://localhost:3000/uploads/${designer.image}`
                        : '/src/assets/images/sample_user.png'
                    }
                    alt={designer.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{designer.name}</p>
                    <p className="text-gray-500 text-sm">{designer.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => openDesignerProfile(designer)}
                  className="text-blue-500 hover:underline font-medium"
                >
                  View Profile
                </button>
              </div>

              {/* Works preview gallery below each designer */}
              {allDesignerWorks[designer._id] && allDesignerWorks[designer._id].length > 0 && (
                <div className="flex gap-2 overflow-x-auto mt-2">
                  {allDesignerWorks[designer._id].slice(0, 3).map((img, idx) => (
                    <img
                      key={idx}
                      src={`http://localhost:3000/uploads/${img}`}
                      alt={`Work ${idx}`}
                      className="w-70 h-48 object-cover rounded-md border border-gray-300"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Profile Modal */}
      {selectedDesigner && (
        <div className="fixed inset-0 bg-[#d3f1fc] flex items-center justify-center z-[1000] overflow-auto p-6">
          <button
            onClick={() => {
              setSelectedDesigner(null);
              setSelectedIndex(null);
              setDesignerWorks([]);
            }}
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
                    selectedDesigner.image
                      ? `http://localhost:3000/uploads/${selectedDesigner.image}`
                      : '/src/assets/images/sample_user.png'
                  }
                  alt={selectedDesigner.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-bold">{selectedDesigner.name}</h2>
                  <p className="text-gray-700">
                    {selectedDesigner.experience
                      ? `Experience: ${selectedDesigner.experience}`
                      : 'Designer'}
                  </p>
                  {selectedDesigner.portfolio && (
                    <a
                      href={selectedDesigner.portfolio}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      Portfolio
                    </a>
                  )}
                </div>
              </div>
              <div className="text-right">
                <h3 className="font-bold text-lg">Contact:</h3>
                <p className="text-gray-700">{selectedDesigner.email}</p>
                {selectedDesigner.phone && (
                  <p className="text-gray-700">{selectedDesigner.phone}</p>
                )}
              </div>
            </div>

            {/* Works Gallery */}
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
                {designerWorks.length > 0 ? (
                  designerWorks.map((img, idx) => (
                    <img
                      key={idx}
                      src={`http://localhost:3000/uploads/${img}`}
                      alt={`Work ${idx}`}
                      onClick={() => openImageModal(idx)}
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

      {/* Image Modal inside Profile Modal */}
      {selectedIndex !== null && selectedDesigner && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 p-4">
          <button
            onClick={closeImageModal}
            className="absolute top-4 right-4 text-white text-3xl font-bold"
          >
            ✕
          </button>

          <div className="flex items-center justify-center relative mb-4">
            <button
              onClick={prevImage}
              disabled={selectedIndex === 0}
              className="text-white text-4xl font-bold hover:scale-110 transition disabled:opacity-30 absolute left-[-50px]"
            >
              ‹
            </button>
            <img
              src={`http://localhost:3000/uploads/${designerWorks[selectedIndex]}`}
              alt={`Enlarged ${selectedIndex}`}
              className="max-w-4xl max-h-[80vh] rounded-lg shadow-lg object-contain"
            />
            <button
              onClick={nextImage}
              disabled={selectedIndex === designerWorks.length - 1}
              className="text-white text-4xl font-bold hover:scale-110 transition disabled:opacity-30 absolute right-[-50px]"
            >
              ›
            </button>
          </div>

          <div className="flex gap-2 mt-2 overflow-x-auto max-w-full">
            {designerWorks.map((img, idx) => (
              <img
                key={idx}
                src={`http://localhost:3000/uploads/${img}`}
                alt={`Thumb ${idx}`}
                onClick={() => setSelectedIndex(idx)}
                className={`w-20 h-14 object-cover rounded-md cursor-pointer border-2 ${idx === selectedIndex ? 'border-[#5FA8D3]' : 'border-transparent'
                  }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HirePage;
