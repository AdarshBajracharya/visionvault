import React, { useState } from 'react';
import Navbar2 from '../../assets/common/des_nav';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePostPage: React.FC = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [referencePics, setReferencePics] = useState<File[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setReferencePics(prev => [...prev, ...filesArray].slice(0, 8));
            e.target.value = '';
        }
    };

    const handleRemoveImage = (index: number) => {
        setReferencePics(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const designerId = localStorage.getItem('designerUserId');
        if (!designerId) {
            alert('You must be logged in to post.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('type', type);
        formData.append('createdBy', designerId);

        referencePics.forEach(file => {
            formData.append('referencePics', file);
        });

        try {
            await axios.post('http://localhost:3000/api/v1/post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('✅ Post created successfully!');
            navigate('/addpost'); // replace with your actual route
        } catch (err) {
            console.error('❌ Error creating post:', err);
            alert('Failed to create post.');
        }
    };

    return (
        <div>
            <Navbar2 />
            <div className="bg-[#e9f9ff] min-h-screen relative flex flex-col items-center">
                {/* Lanterns */}
                <img
                    src="/src/assets/images/laltin.png"
                    alt="Lantern Left"
                    className="absolute top-0 right-60 h-52 rotate-[-25deg]"
                />
                <img
                    src="/src/assets/images/laltin.png"
                    alt="Lantern Right"
                    className="absolute top-0 left-60 h-52"
                />

                {/* Form Card */}
                <div className="bg-white rounded-3xl shadow-xl mt-20 mb-10 w-full max-w-3xl px-10 py-12 border-2 border-[#5FA8D3] z-10">
                    <h1 className="text-4xl font-extrabold text-center mb-10 text-[#1B4965] font-protest">
                        CREATE POST
                    </h1>

                    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="font-semibold text-[#1B4965]">TITLE*</label>
                            <input
                                type="text"
                                className="w-full mt-2 border border-[#5FA8D3] rounded-md px-4 py-2 focus:outline-none"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="font-semibold text-[#1B4965]">DESCRIPTION*</label>
                            <textarea
                                rows={4}
                                className="w-full mt-2 border border-[#5FA8D3] rounded-md px-4 py-2 focus:outline-none"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="font-semibold text-[#1B4965]">TYPE*</label>
                            <select
                                className="w-full mt-2 border border-[#5FA8D3] rounded-md px-4 py-2 focus:outline-none"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select a type</option>
                                <option value="Illustration">Illustration</option>
                                <option value="Web design">Web design</option>
                                <option value="Logo">Logo</option>
                                <option value="Animation">Animation</option>
                                <option value="Mobile">Mobile</option>
                            </select>
                        </div>

                        <div>
                            <label className="font-semibold text-[#1B4965]">UPLOAD PICS</label>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                className="hidden"
                                id="refPicsInput"
                                onChange={handleFileChange}
                            />
                            <div className="grid grid-cols-4 gap-3 mt-2">
                                {Array.from({ length: 8 }).map((_, idx) => {
                                    const file = referencePics[idx];
                                    return (
                                        <div
                                            key={idx}
                                            className="w-full aspect-square border border-[#5FA8D3] rounded-md flex items-center justify-center overflow-hidden relative cursor-pointer"
                                            onClick={() => document.getElementById('refPicsInput')?.click()}
                                        >
                                            {file ? (
                                                <>
                                                    <img
                                                        src={URL.createObjectURL(file)}
                                                        alt={`img-${idx}`}
                                                        className="object-cover w-full h-full"
                                                        onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center text-lg font-bold hover:bg-red-600 transition"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleRemoveImage(idx);
                                                        }}
                                                    >
                                                        ×
                                                    </button>
                                                </>
                                            ) : (
                                                <span className="text-gray-400 text-3xl select-none">+</span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

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
