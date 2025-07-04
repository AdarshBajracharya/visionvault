import React from 'react';
import Navbar2 from '../../assets/common/des_nav';

const CreatePostPage: React.FC = () => {
    return (
        <div>
             <Navbar2 />
            <div className="bg-[#e9f9ff] min-h-screen relative flex flex-col items-center">
                {/* Floating lanterns on sides */}
                <img
                    src="/src/assets/images/laltin.png"
                    alt="Lantern Left"
                    className="absolute top-00 right-240 h-200 rotate-[-25.02deg]"
                />
                <img
                    src="/src/assets/images/laltin.png"
                    alt="Lantern Right"
                    className="absolute top-00 left-247 h-200"
                />

                {/* Form Card */}
                <div className="bg-white rounded-3xl shadow-xl mt-20 mb-10 w-full max-w-3xl px-10 py-12 border-2 border-[#5FA8D3] z-10">
                    <h1 className="text-4xl font-extrabold text-center mb-10 text-[#1B4965] font-protest">
                        CREATE POST
                    </h1>

                    <form className="flex flex-col gap-6">
                        {/* Job Title */}
                        <div>
                            <label className="font-semibold text-[#1B4965]">TITLE*</label>
                            <input
                                type="text"
                                className="w-full mt-2 border border-[#5FA8D3] rounded-md px-4 py-2 focus:outline-none"
                            />
                        </div>

                        {/* Job Description */}
                        <div>
                            <label className="font-semibold text-[#1B4965]">DESCRIPTION*</label>
                            <textarea
                                rows={4}
                                className="w-full mt-2 border border-[#5FA8D3] rounded-md px-4 py-2 focus:outline-none"
                            ></textarea>
                        </div>

                        {/* Job Type */}
                        <div>
                            <label className="font-semibold text-[#1B4965]">TYPE*</label>
                            <input
                                type="text"
                                className="w-full mt-2 border border-[#5FA8D3] rounded-md px-4 py-2 focus:outline-none"
                            />
                        </div>

                        {/* Reference Pics */}
                        <div>
                            <label className="font-semibold text-[#1B4965]">UPLOAD PICS</label>
                            <div className="grid grid-cols-4 gap-3 mt-2">
                                {/* Placeholder boxes */}
                                {Array.from({ length: 8 }).map((_, idx) => (
                                    <div
                                        key={idx}
                                        className="w-full aspect-square border border-[#5FA8D3] rounded-md flex items-center justify-center text-gray-400 text-sm"
                                    >
                                        +
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="mt-6 bg-[#5FA8D3] text-white font-semibold text-lg py-3 rounded-md hover:bg-[#4a91be] transition"
                        >
                            CREATE
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePostPage;
// 