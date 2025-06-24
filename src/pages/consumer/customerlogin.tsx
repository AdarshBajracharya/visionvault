import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerLoginPage: React.FC = () => {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex font-sans relative">
            {/* Background image */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('src/assets/images/designer_login_bg.png')",
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    opacity: 0.5,
                }}
            ></div>

            {/* Overlay */}
            <div
                className="absolute inset-0 z-10"
                style={{
                    backgroundColor: '#C5F6FF',
                    opacity: 0.5,
                }}
            ></div>

            {/* Buttons and graphic */}
            <div className="z-20 w-full flex justify-center items-center">
                <button
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                    className="
                        fixed left-31 bottom-7 z-30 transform
                        bg-[#5FA8D3] px-11 py-8
                        w-14
                        text-white font-bold tracking-widest text-xl
                        flex flex-col items-center space-y-3
                        rounded-none
                        transition-transform duration-300 ease-in-out
                        outline outline-1 outline-[#5FA8D3]
                        cursor-pointer
                    "
                >
                    {'CUSTOMER'.split('').map((letter, i) => (
                        <span
                            key={i}
                            className="
                                leading-none
                                transition-transform duration-300 ease-in-out
                                hover:scale-120 hover:drop-shadow-lg
                                cursor-default 
                                text-2xl
                            "
                        >
                            {letter}
                        </span>
                    ))}
                </button>

                <button
                    onClick={() => navigate('/')}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                    className="
                        fixed left-120 top-7
                        bg-white px-11 py-8
                        w-14
                        text-[#5FA8D3] font-bold tracking-widest text-xl
                        flex flex-col items-center space-y-3
                        rounded-none
                        hover:scale-101 hover:shadow-xl
                        transition-transform duration-300 ease-in-out
                        outline outline-1 outline-[#5FA8D3]
                        cursor-default
                    "
                >
                    {'DESIGNER'.split('').map((letter, i) => (
                        <span
                            key={i}
                            className="
                                leading-none
                                hover:scale-120 hover:drop-shadow-lg
                                transition-transform duration-300 ease-in-out
                                cursor-pointer
                                text-2xl
                            "
                        >
                            {letter}
                        </span>
                    ))}
                </button>

                <img
                    src="src/assets/images/designer_graphic.png"
                    alt="Designer Graphic"
                    className="absolute top-33 left-25 w-128 h-auto object-contain pointer-events-none"
                />
            </div>

            {/* Login Form */}
            <div className="absolute right-50 top-20 flex flex-col w-1/3 space-y-6 z-20">
                {/* Logo */}
                <div className="w-full flex justify-center">
                    <img
                        src="src/assets/images/V.png"
                        alt="Logo Placeholder"
                        className="w-65 h-65 object-contain"
                    />
                </div>

                {/* Email Field */}
                <div className="mt-[-40px] w-full">
                    <label className="block mb-2 text-lg text-gray-700 font-medium">Email</label>
                    <input
                        type="text"
                        placeholder="Email or Username"
                        className="w-full px-4 py-3 border border-blue-300 rounded-full shadow-md text-lg focus:outline-none focus:ring-2 focus:ring-[#5FA8D3]"
                    />
                </div>

                {/* Password Field */}
                <div className="w-full">
                    <label className="block mb-2 text-lg text-gray-700 font-medium">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-3 border border-blue-300 rounded-full shadow-md text-lg focus:outline-none focus:ring-2 focus:ring-[#5FA8D3]"
                    />
                </div>

                {/* Login Button */}
                <button
                    className="w-full bg-[#5FA8D3] text-white py-3 rounded-full text-lg font-semibold hover:bg-[#4a94c1] transition-colors duration-300"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default CustomerLoginPage;
