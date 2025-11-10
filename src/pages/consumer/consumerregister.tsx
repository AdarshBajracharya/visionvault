import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ConsumerRegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!imageFile) {
      setImagePreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(imageFile);
    setImagePreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('password', formData.password);
      data.append('phone', formData.phone);
      data.append('role', formData.role);

      if (imageFile) {
        data.append('image', imageFile);
      }

      const res = await axios.post('http://localhost:3000/api/v1/consumer/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('✅ Registered successfully!');
      console.log(res.data);
    } catch (error: any) {
      setMessage(`❌ ${error?.response?.data?.message || 'Registration failed'}`);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center font-sans relative"
      style={{
        backgroundImage: "url('/src/assets/images/designer_login_bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-[#C5F6FF] opacity-50 z-0"></div>

      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center justify-between px-12 py-8">
        <img
          src="src/assets/images/V.png"
          alt="Logo Placeholder"
          className="absolute w-165 h-165 object-contain right-150"
        />

        {/* Clickable preview image */}
        <label
          htmlFor="imageUpload"
          className="cursor-pointer mb-6"
          title="Click to select a profile picture"
        >
          {imagePreviewUrl ? (
            <img
              src={imagePreviewUrl}
              alt="Profile Preview"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-300 shadow-md ml-140"
            />
          ) : (
            <div className="w-32 h-32 rounded-full border-4 border-blue-300 flex items-center justify-center text-blue-400 text-lg font-semibold shadow-md">
              Choose Image
            </div>
          )}
        </label>

        {/* Hidden file input */}
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
        />

        <div className="w-[500px] bg-transparent backdrop-blur-md rounded-xl space-y-6 ml-150">
          <form className="space-y-4" onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
              <label className="text-gray-700 font-medium">Name</label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-full shadow-md focus:ring-2 focus:ring-blue-300 outline-none"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-full shadow-md focus:ring-2 focus:ring-blue-300 outline-none"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">Password</label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-full shadow-md focus:ring-2 focus:ring-blue-300 outline-none"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex space-x-4">
              <div className="w-3/5">
                <label className="text-gray-700 font-medium">Phone number</label>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-full shadow-md focus:ring-2 focus:ring-blue-300 outline-none"
                  placeholder="Phone number"
                />
              </div>
              <div className="w-2/5">
                <label className="text-gray-700 font-medium">I am a</label>
                <input
                  name="role"
                  type="text"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-full shadow-md focus:ring-2 focus:ring-blue-300 outline-none"
                  placeholder="Customer"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-white text-lg rounded-full font-semibold bg-[#5FA8D3] hover:bg-[#4a94c1] transition-colors"
            >
              Register
            </button>

            {message && (
              <p className="text-center mt-2 text-sm text-red-600">{message}</p>
            )}
          </form>

          <p className="text-center text-[#0f2e47] mt-4 text-md">
            Already have an account?{' '}
            <a href="/consumerlogin" className="text-[#0f2e47] font-semibold underline hover:text-blue-600">
              Login Here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConsumerRegisterPage;
