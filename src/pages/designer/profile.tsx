import React, { useEffect, useState } from 'react';
import Navbar2 from '../../assets/common/des_nav';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage2: React.FC = () => {
    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone: '',
        experience: '',
        portfolio: '',
        image: '',
    });

    const fetchProfile = async () => {
        try {
            const userId = localStorage.getItem("designerUserId");
            if (!userId) {
                navigate("/");
                return;
            }

            const res = await axios.get(`http://localhost:3000/api/v1/designer/${userId}`);
            const data = res.data?.data; // ✅ get the actual profile data

            setProfile({
                name: data.name || 'Unnamed',
                email: data.email || '',
                phone: data.phone || '',
                experience: data.experience || '',
                portfolio: data.portfolio || '',
                image: data.image || '/src/assets/images/sample_user.png',
            });
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };


    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div className="flex bg-[#e9f9ff] min-h-screen">
            {/* Left Sidebar */}
            <div className="bg-[#5FA8D3] w-64 p-6 flex flex-col justify-between text-white">
                <div>
                    <div className="text-xl font-bold mb-4">Contact Info:</div>
                    <p className="mb-2">{profile.email}</p>
                    <p className="mb-4">{profile.phone}</p>
                    <div className="text-xl font-bold mb-2">Experience:</div>
                    <p className="mb-4">{profile.experience}</p>
                    <div className="text-xl font-bold mb-2">Portfolio</div>
                    <p>{profile.portfolio}</p>
                </div>
                <button className="bg-[#D9534F] hover:bg-[#c64541] text-white font-bold py-2 rounded mt-6"
                    onClick={() => {
                        localStorage.removeItem("designerUserId");
                        navigate('/');
                    }}>
                    LOGOUT
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <Navbar2 />

                {/* Profile Info */}
                <div className="flex flex-col items-center mt-10">
                    <img
                        src={profile.image}
                        alt="Profile"
                        className="w-28 h-28 rounded-full object-cover mb-2"
                    />
                    <h1 className="text-4xl font-extrabold text-[#1B4965] mb-6">{profile.name}</h1>
                </div>

                {/* My Works & Add Post */}
                <div className="flex justify-between items-center px-10 mt-4 mb-6">
                    <h2 className="text-xl font-semibold text-[#1B4965]">My Works</h2>
                    <button className="bg-[#5FA8D3] text-white font-semibold px-4 py-2 rounded hover:bg-[#4a91be] transition" onClick={() => navigate('/addpost')}>
                        Add Post
                    </button>
                </div>

                {/* Works Grid - Leave unchanged for now */}
                <div className="flex flex-col gap-6 px-10 pb-10">
                    {/* Placeholder for works */}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage2;
