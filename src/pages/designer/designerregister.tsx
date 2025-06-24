import React from 'react';

const RegisterPage: React.FC = () => {
    return (
        <div
            className="min-h-screen flex items-center justify-center font-sans relative"
            style={{
                backgroundImage: "url('/src/assets/images/designer_login_bg.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#C5F6FF] opacity-50 z-0"></div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-6xl flex flex-row items-center justify-between px-12 py-8">
                {/* Left Side Logo */}
                <div className="w-1/2 flex flex-col items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-[140px] font-bold leading-none text-black">V</h1>
                        <h2 className="text-[32px] text-[#8B5E3C] italic -mt-6">VisionVault</h2>
                        <h1 className="text-[140px] font-bold leading-none text-black -mt-6">V</h1>
                    </div>
                </div>

                {/* Right Side Form */}
                <div className="w-1/2 bg-transparent backdrop-blur-md rounded-xl p-8 space-y-6">
                    <form className="space-y-4">
                        <div>
                            <label className="text-gray-700 font-medium">Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 border rounded-full shadow-md focus:ring-2 focus:ring-blue-300 outline-none"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div>
                            <label className="text-gray-700 font-medium">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-3 border rounded-full shadow-md focus:ring-2 focus:ring-blue-300 outline-none"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label className="text-gray-700 font-medium">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 border rounded-full shadow-md focus:ring-2 focus:ring-blue-300 outline-none"
                                placeholder="Enter your password"
                            />
                        </div>

                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <label className="text-gray-700 font-medium">Phone number</label>
                                <input
                                    type="tel"
                                    className="w-full px-4 py-3 border rounded-full shadow-md focus:ring-2 focus:ring-blue-300 outline-none"
                                    placeholder="Phone number"
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="text-gray-700 font-medium">I am a</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border rounded-full shadow-md focus:ring-2 focus:ring-blue-300 outline-none"
                                    placeholder="Designer / Customer"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <label className="text-gray-700 font-medium">Experience</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border rounded-full shadow-md focus:ring-2 focus:ring-blue-300 outline-none"
                                    placeholder="e.g. 3 years"
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="text-gray-700 font-medium">Portfolio</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border rounded-full shadow-md focus:ring-2 focus:ring-blue-300 outline-none"
                                    placeholder="Portfolio link"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 text-white text-lg rounded-full font-semibold bg-[#5FA8D3] hover:bg-[#4a94c1] transition-colors"
                        >
                            Register
                        </button>
                    </form>

                    <p className="text-center text-[#0f2e47] mt-4 text-md">
                        Already have an account?{' '}
                        <a href="/login" className="text-[#0f2e47] font-semibold underline hover:text-blue-600">
                            Login Here
                        </a>
                    </p>
                    
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
