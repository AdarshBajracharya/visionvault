import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPasswordPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [validToken, setValidToken] = useState(false);

  // Check if token is valid on mount
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/designer/resetpassword/${token}`);
        if (res.data.success) {
          setValidToken(true);
        }
      } catch (error) {
        setMessage("Invalid or expired reset token.");
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:3000/api/v1/designer/resetpassword/${token}`, {
        password,
      });
      setMessage(res.data.message || "Password reset successful!");
      setTimeout(() => {
        navigate("/designerlogin");
      }, 2000);
    } catch (error: any) {
      setMessage(error?.response?.data?.message || "Error resetting password");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans text-[#5FA8D3]">
        <p>Verifying token...</p>
      </div>
    );
  }

  if (!validToken) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans text-red-600">
        <p>{message || "Invalid or expired token."}</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center font-sans bg-[#C5F6FF]"
      style={{
        backgroundImage: "url('/src/assets/images/designer_login_bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white bg-opacity-90 rounded-xl p-10 max-w-md w-full shadow-lg">
        <h2 className="text-3xl font-semibold text-[#5FA8D3] mb-6 text-center">Reset Password</h2>

        {message && (
          <p
            className={`mb-4 text-center ${
              message.includes("successful") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">New Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border rounded-full shadow-md focus:ring-2 focus:ring-[#5FA8D3] outline-none"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border rounded-full shadow-md focus:ring-2 focus:ring-[#5FA8D3] outline-none"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#5FA8D3] text-white text-lg font-semibold rounded-full hover:bg-[#4a94c1] transition-colors"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
