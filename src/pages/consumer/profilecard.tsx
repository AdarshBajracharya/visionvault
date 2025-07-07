import React, { useState, useRef } from 'react';
import Navbar from '../../assets/common/navbar';

const ProfileCard: React.FC = () => {
    const works = [
        'src/assets/images/Hire a desginer.png',
        'src/assets/images/Hire a desginer.png',
        'src/assets/images/Hire a desginer.png',
        'src/assets/images/plane.png',
        'src/assets/images/V.png',
    ];

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    // Drag scroll state
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

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

    const openModal = (idx: number) => setSelectedIndex(idx);
    const closeModal = () => setSelectedIndex(null);
    const prevImage = () =>
        setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
    const nextImage = () =>
        setSelectedIndex((prev) =>
            prev !== null && prev < works.length - 1 ? prev + 1 : prev
        );

    return (
        <div className="relative min-h-screen bg-[#d3f1fc]">
            <div className='relative z-100'>
                <Navbar />
            </div>

            {/* Background */}
            <img
                src="src/assets/images/Hire a desginer.png"
                alt="Background"
                className="absolute top-10 left-0 w-full h-full object-cover z-0"
            />

            <div className="relative max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-10 z-10 overflow-hidden mt-20">
                <img
                    src="src/assets/images/V.png"
                    alt="Placeholder"
                    className="absolute inset-0 m-auto opacity-10 w-1/2 h-auto object-contain pointer-events-none z-0"
                    style={{ top: '50%', transform: 'translateY(-20%)' }}
                />

                {/* Profile Info */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start relative z-10">
                    <div className="flex items-center gap-6 mb-6 md:mb-0">
                        <img
                            src="src\assets\images\designer_graphic.png"
                            alt="Adarsh"
                            className="w-24 h-24 rounded-full object-cover"
                        />
                        <div>
                            <h2 className="text-xl font-bold">Adarsh Bajracharya</h2>
                            <p className="text-gray-700">Web Designer</p>
                            <p className="text-gray-700">Experience : 12 years</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <h3 className="font-bold text-lg">Contact:</h3>
                        <p className="text-gray-700">www.adarsh.com</p>
                        <p className="text-gray-700">adarsh@gmail.com</p>
                        <p className="text-gray-700">+977 980-1523050</p>
                    </div>
                </div>

                {/* My Works */}
                <div className="mt-10 relative z-10">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">My works</h3>
                        <button
                            onClick={() => setSelectedIndex(0)}
                            className="text-[#5FA8D3] hover:underline text-sm"
                        >
                            Show all
                        </button>
                    </div>

                    {/* Scrollable works */}
                    <div
                        ref={scrollRef}
                        className="flex gap-4 overflow-x-auto cursor-grab active:cursor-grabbing"
                        onMouseDown={onMouseDown}
                        onMouseLeave={onMouseLeaveOrUp}
                        onMouseUp={onMouseLeaveOrUp}
                        onMouseMove={onMouseMove}
                    >
                        {works.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`Work ${idx}`}
                                onClick={() => openModal(idx)}
                                className="w-72 h-48 object-cover rounded-xl border border-gray-200 shadow-sm cursor-pointer flex-shrink-0"
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal Viewer */}
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
                            src={works[selectedIndex]}
                            alt={`Enlarged ${selectedIndex}`}
                            className="max-w-4xl max-h-[80vh] rounded-lg shadow-lg object-contain"
                        />
                        <button
                            onClick={nextImage}
                            disabled={selectedIndex === works.length - 1}
                            className="text-white text-4xl font-bold hover:scale-110 transition disabled:opacity-30 absolute right-[-50px]"
                        >
                            ›
                        </button>
                    </div>

                    {/* Thumbnails row */}
                    <div className="flex gap-2 mt-2 overflow-x-auto max-w-full">
                        {works.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
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

export default ProfileCard;
