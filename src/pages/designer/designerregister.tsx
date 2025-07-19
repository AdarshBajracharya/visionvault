import React, { useState, useRef } from 'react';
import axios from 'axios';

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: '',
        experience: '',
        portfolio: '',
    });

    const [image, setImage] = useState<File | null>(null);
    const [message, setMessage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });
        if (image) data.append('image', image);

        try {
            const res = await axios.post(
                'http://localhost:3000/api/v1/designer/register',
                data,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
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

            <div className="relative z-10 w-full max-w-6xl flex flex-row items-center justify-between px-12 py-8">
                <img
                    src="src/assets/images/V.png"
                    alt="Logo Placeholder"
                    className="absolute w-165 h-165 object-contain right-150"
                />

                <div className="w-[500px] bg-transparent backdrop-blur-md rounded-xl space-y-6 ml-150">

                    {/* Hidden file input */}
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                    />

                    {/* Image preview circle (clickable) */}
                    <div
                        onClick={handleImageClick}
                        className="w-32 h-32 rounded-full border-4 border-[#5FA8D3] overflow-hidden cursor-pointer flex items-center justify-center bg-gray-300 relative ml-40"
                        title="Click to upload image"
                    >
                        {image ? (
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Profile Preview"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-gray-600 select-none">Click to add image</span>
                        )}
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>

                        {/* Your existing inputs unchanged */}

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
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border rounded-full shadow-md focus:ring-2 focus:ring-blue-300 outline-none"
                                >
                                    <option value="" disabled>
                                        Select your role
                                    </option>
                                    <option value="Illustrator">Illustrator</option>
                                    <option value="Web Designer">Web Designer</option>
                                    <option value="Animator">Animator</option>
                                    <option value="Mobile Designer">Mobile Designer</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <label className="text-gray-700 font-medium">Experience</label>
                                <input
                                    name="experience"
                                    type="text"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border rounded-full shadow-md focus:ring-2 focus:ring-blue-300 outline-none"
                                    placeholder="e.g. 3 years"
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="text-gray-700 font-medium">Portfolio</label>
                                <input
                                    name="portfolio"
                                    type="text"
                                    value={formData.portfolio}
                                    onChange={handleChange}
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

                        {message && (
                            <p className="text-center mt-2 text-sm text-red-600">{message}</p>
                        )}
                    </form>

                    <p className="text-center text-[#0f2e47] mt-4 text-md">
                        Already have an account?{' '}
                        <a href="/" className="text-[#0f2e47] font-semibold underline hover:text-blue-600">
                            Login Here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
