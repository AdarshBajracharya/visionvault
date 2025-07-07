import React, { useState } from 'react';
import Navbar2 from '../../assets/common/des_nav';

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

const FindJobsPage: React.FC = () => {
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
                    {filterData.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedCard(item)}
                            className="bg-white rounded-2xl shadow-lg p-4 flex flex-col gap-4 cursor-pointer hover:shadow-xl transition"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={item.userImage}
                                        alt="User"
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-gray-500 text-sm">{item.role}</p>
                                    </div>
                                </div>
                                <button className="text-blue-500 hover:underline font-medium">
                                    View Profile
                                </button>
                            </div>
                            <div className="flex gap-4 overflow-x-auto">
                                {[1, 2, 3].map((i) => (
                                    <img
                                        key={i}
                                        src={item.portfolioImage}
                                        alt={`Preview ${i}`}
                                        className="rounded-xl object-cover h-32 w-full sm:w-1/3 flex-shrink-0"
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Popup Modal */}
            {selectedCard && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="bg-white w-[90%] max-w-4xl rounded-3xl p-8 shadow-xl relative">
                        <button
                            className="absolute top-4 right-6 text-xl font-bold text-gray-600 hover:text-red-500"
                            onClick={() => setSelectedCard(null)}
                        >
                            ✕
                        </button>

                        <div className="flex items-center gap-4 mb-6">
                            <img
                                src={selectedCard.userImage}
                                className="w-14 h-14 rounded-full"
                                alt="user"
                            />
                            <div>
                                <h3 className="text-[#1B4965] font-bold text-lg uppercase">
                                    Softwarica College
                                </h3>
                                <p className="text-gray-700">Looking for: {selectedCard.role}</p>
                            </div>
                        </div>

                        <p className="text-gray-700 mb-6">{selectedCard.description}</p>

                        <h4 className="text-[#1B4965] font-bold text-lg mb-4">Reference pics:</h4>
                        <div className="flex flex-wrap gap-4 mb-8">
                            {[1, 2, 3].map((i) => (
                                <img
                                    key={i}
                                    src={selectedCard.portfolioImage}
                                    alt="sample"
                                    className="w-40 h-32 object-cover rounded-xl"
                                />
                            ))}
                        </div>

                        <button className="bg-[#5FA8D3] text-white px-6 py-2 rounded-xl font-semibold hover:bg-[#4a91be] transition">
                            CONTACT
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FindJobsPage;
