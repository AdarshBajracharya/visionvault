import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email || !token || !newPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/consumer/resetpassword/${token}`,
        { email, password: newPassword }
      );
      setMessage(res.data.message || "Password reset successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/consumerlogin");
      }, 3000);
    } catch (error: any) {
      setMessage(error?.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#C5F6FF] font-sans px-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-center text-[#5FA8D3]">Reset Password</h2>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5FA8D3]"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">Reset Token</label>
          <input
            type="text"
            placeholder="Enter reset token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full px-4 py-3 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5FA8D3]"
          />
        </div>

        <div className="relative">
          <label className="block mb-2 font-medium text-gray-700">New Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5FA8D3]"
          />
          <button
            type="button"
            className="absolute right-4 top-11 text-sm text-[#5FA8D3] font-semibold"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {message && <p className="text-center text-red-600">{message}</p>}

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-[#5FA8D3] text-white py-3 rounded-full text-lg font-semibold hover:bg-[#4a94c1] transition-colors duration-300 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Reset Password"}
        </button>

        <p className="text-center text-gray-600">
          Remember your password?{" "}
          <span
            className="text-[#5FA8D3] cursor-pointer hover:underline"
            onClick={() => navigate("/consumerlogin")}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default CResetPasswordPage;
