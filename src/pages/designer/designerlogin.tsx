import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DesignerLoginPage: React.FC = () => {
    const navigate = useNavigate();

    // Login form states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    // Modal states
    const [showModal, setShowModal] = useState(false);
    const [modalStep, setModalStep] = useState<"forgot" | "reset">("forgot");

    // Forgot/reset password modal states
    const [modalEmail, setModalEmail] = useState("");
    const [resetToken, setResetToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [modalMessage, setModalMessage] = useState("");

    // Handle Login
    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:3000/api/v1/designer/login", {
                email,
                password,
            });

            console.log("Login response:", res.data); // ✅ Check this in your browser console

            setMessage("✅ Login successful!");

            // Try extracting and saving the userId
            const userId = res.data?.data?._id;
            if (userId) {
                localStorage.setItem("designerUserId", userId);
            } else {
                console.warn("No user ID found in response.");
            }

            navigate("/designerhome");
        } catch (err: any) {
            setMessage(err?.response?.data?.message || "Login failed");
        }
    };


    // Handle Forgot Password (send reset link)
    const handleForgotPassword = async () => {
        try {
            const res = await axios.post("http://localhost:3000/api/v1/designer/forgotpassword", {
                email: modalEmail,
            });
            setModalMessage(res.data.message || "Reset link sent! Check your email.");
            setModalStep("reset");
        } catch (err: any) {
            setModalMessage(err?.response?.data?.message || "Failed to send reset link");
        }
    };

    // Handle Reset Password
    const handleResetPassword = async () => {
        if (!resetToken) {
            setModalMessage("Please enter the reset token sent to your email.");
            return;
        }
        if (!newPassword) {
            setModalMessage("Please enter your new password.");
            return;
        }

        try {
            const res = await axios.post(
                `http://localhost:3000/api/v1/designer/resetpassword/${resetToken}`,
                { password: newPassword }
            );
            setModalMessage(res.data.message || "Password reset successful!");
            // Optionally close modal after success
            setTimeout(() => {
                setShowModal(false);
                setModalStep("forgot");
                setModalEmail("");
                setResetToken("");
                setNewPassword("");
                setModalMessage("");
            }, 2000);
        } catch (err: any) {
            setModalMessage(err?.response?.data?.message || "Failed to reset password");
        }
    };

    return (
        <div className="min-h-screen flex font-sans relative">
            {/* Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('src/assets/images/designer_login_bg.png')",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    opacity: 0.5,
                }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 z-10 bg-[#C5F6FF] opacity-50" />

            {/* Buttons and graphic */}
            <div className="z-20 w-full flex justify-center items-center">
                <button
                    onClick={() => navigate("/consumerlogin")}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                    className="fixed left-31 bottom-7 transform bg-white px-11 py-8 w-14 text-[#5FA8D3] font-bold tracking-widest text-xl flex flex-col items-center space-y-3 rounded-none hover:scale-101 hover:shadow-xl transition-transform duration-300 ease-in-out outline outline-1 outline-[#5FA8D3] cursor-pointer"
                >
                    {"CUSTOMER".split("").map((letter, i) => (
                        <span
                            key={i}
                            className="leading-none transition-transform duration-300 ease-in-out hover:scale-120 hover:drop-shadow-lg cursor-pointer text-2xl"
                        >
                            {letter}
                        </span>
                    ))}
                </button>

                <button
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                    className="fixed left-120 top-7 z-30 bg-[#5FA8D3] px-11 py-8 w-14 text-white font-bold tracking-widest text-xl flex flex-col items-center space-y-3 rounded-none transition-transform duration-300 ease-in-out outline outline-1 outline-[#5FA8D3] cursor-default"
                >
                    {"DESIGNER".split("").map((letter, i) => (
                        <span
                            key={i}
                            className="leading-none transition-transform duration-300 ease-in-out text-2xl"
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Password Field */}
                <div className="w-full">
                    <label className="block mb-2 text-lg text-gray-700 font-medium">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-3 border border-blue-300 rounded-full shadow-md text-lg focus:outline-none focus:ring-2 focus:ring-[#5FA8D3]"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Login Button */}
                <button
                    className="w-full bg-[#5FA8D3] text-white py-3 rounded-full text-lg font-semibold hover:bg-[#4a94c1] transition-colors duration-300"
                    onClick={handleLogin}
                >
                    Login
                </button>

                {/* Forgot Password Link */}
                <div
                    className="text-center text-[#5FA8D3] cursor-pointer hover:underline mt-2"
                    onClick={() => {
                        setShowModal(true);
                        setModalStep("forgot");
                        setModalEmail("");
                        setResetToken("");
                        setNewPassword("");
                        setModalMessage("");
                    }}
                >
                    Forgot Password?
                </div>

                {/* Register Link */}
                <div className="text-center text-gray-600 mt-4">
                    Don't have an account?{" "}
                    <span
                        onClick={() => navigate("/designerregister")}
                        className="text-[#5FA8D3] cursor-pointer hover:underline"
                    >
                        Register here
                    </span>
                </div>
                {message && <div className="text-center text-red-600 mt-2 text-sm">{message}</div>}
            </div>

            {/* Modal popup */}
            {showModal && (
                <>
                    <div
                        className="fixed inset-0 bg-black bg-opacity-40 z-50"
                        onClick={() => setShowModal(false)}
                    />
                    <div className="fixed inset-0 z-50 flex justify-center items-center p-6">
                        <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-6 relative shadow-lg">
                            {/* Close button */}
                            <button
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                                onClick={() => setShowModal(false)}
                            >
                                &times;
                            </button>

                            {modalStep === "forgot" && (
                                <>
                                    <h2 className="text-2xl font-semibold text-center text-[#5FA8D3]">Forgot Password</h2>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-3 border rounded-full shadow-md focus:ring-2 focus:ring-blue-300 outline-none"
                                        value={modalEmail}
                                        onChange={(e) => setModalEmail(e.target.value)}
                                    />
                                    <button
                                        className="w-full py-3 text-white text-lg rounded-full font-semibold bg-[#5FA8D3] hover:bg-[#4a94c1] transition-colors"
                                        onClick={handleForgotPassword}
                                    >
                                        Send Reset Link
                                    </button>
                                </>
                            )}

                            {modalStep === "reset" && (
                                <>
                                    <h2 className="text-2xl font-semibold text-center text-[#5FA8D3]">Reset Password</h2>
                                    <p className="text-center text-gray-700">
                                        A password reset link has been sent to your email. Please check your inbox and follow the instructions to reset your password.
                                    </p>
                                    <button
                                        className="w-full py-3 text-white text-lg rounded-full font-semibold bg-[#5FA8D3] hover:bg-[#4a94c1] transition-colors"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                </>
                            )}


                            {modalMessage && <p className="text-center text-sm text-gray-700 mt-2">{modalMessage}</p>}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default DesignerLoginPage;
