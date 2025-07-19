import React, { useEffect, useState, useRef, type ChangeEvent } from "react";
import Navbar2 from "../../assets/common/des_nav";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface Post {
    _id: string;
    title: string;
    description: string;
    type: string;
    referencePics: string[];
}

const ProfilePage2: React.FC = () => {
    const navigate = useNavigate();

    // Profile state with editable fields
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        experience: "",
        portfolio: "",
        image: "",
    });

    const [newProfileImage, setNewProfileImage] = useState<File | null>(null);
    const [previewImageUrl, setPreviewImageUrl] = useState<string>("");
    const [isEditing, setIsEditing] = useState(false); // New state for edit mode

    const [posts, setPosts] = useState<Post[]>([]);

    const [editPostId, setEditPostId] = useState<string | null>(null);
    const [editFormData, setEditFormData] = useState({
        title: "",
        description: "",
        type: "",
    });
    const [editImages, setEditImages] = useState<File[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>([]);

    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [postToDelete, setPostToDelete] = useState<string | null>(null);

    const titleInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (editPostId && titleInputRef.current) {
            titleInputRef.current.focus();
        }
    }, [editPostId]);

    const fetchProfile = async () => {
        try {
            const userId = localStorage.getItem("designerUserId");
            if (!userId) return navigate("/");

            const [profileRes, postsRes] = await Promise.all([
                axios.get(`http://localhost:3000/api/v1/designer/${userId}`),
                axios.get(`http://localhost:3000/api/v1/post/designer/${userId}`),
            ]);

            const profileData = profileRes.data?.data;

            setProfile({
                name: profileData.name || "Unnamed",
                email: profileData.email || "",
                phone: profileData.phone || "",
                experience: profileData.experience || "",
                portfolio: profileData.portfolio || "",
                image:
                    profileData.image && profileData.image !== ""
                        ? `http://localhost:3000/uploads/${profileData.image}`
                        : "/src/assets/images/sample_user.png",
            });

            setPosts(postsRes.data?.data || []);
        } catch (error) {
            console.error("Error fetching profile or posts:", error);
            toast.error("Failed to load profile data.");
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    // Handle contact info changes (name/email/phone)
    const handleContactInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle experience/portfolio textareas change
    const handleProfileChange = (
        e: ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Profile image change handler
    const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setNewProfileImage(file);
            setPreviewImageUrl(URL.createObjectURL(file));
        }
    };

    // Save all profile changes
    const handleSaveProfile = async () => {
        try {
            const userId = localStorage.getItem("designerUserId");
            if (!userId) return navigate("/");

            const formData = new FormData();
            formData.append("name", profile.name);
            formData.append("email", profile.email);
            formData.append("phone", profile.phone);
            formData.append("experience", profile.experience);
            formData.append("portfolio", profile.portfolio);
            if (newProfileImage) {
                formData.append("image", newProfileImage);
            }

            const res = await axios.put(
                `http://localhost:3000/api/v1/designer/${userId}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            toast.success("Profile updated successfully!");
            const updatedData = res.data.data;
            setProfile((prev) => ({
                ...prev,
                image:
                    updatedData.image && updatedData.image !== ""
                        ? `http://localhost:3000/uploads/${updatedData.image}`
                        : prev.image,
            }));
            setNewProfileImage(null);
            setPreviewImageUrl("");
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update profile:", error);
            toast.error("Failed to update profile.");
        }
    };

    const handleEditClick = (post: Post) => {
        setEditPostId(post._id);
        setEditFormData({ title: post.title, description: post.description, type: post.type });
        setExistingImages(post.referencePics || []);
        setEditImages([]);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);

            if (existingImages.length + editImages.length + selectedFiles.length > 5) {
                toast.error("You can only upload up to 5 images in total.");
                return;
            }
            setEditImages((prev) => [...prev, ...selectedFiles]);
        }
    };

    const handleRemoveExistingImage = (img: string) => {
        setExistingImages((prev) => prev.filter((i) => i !== img));
    };

    const handleRemoveNewImage = (idx: number) => {
        setEditImages((prev) => prev.filter((_, i) => i !== idx));
    };

    const handleEditSave = async () => {
        if (!editPostId) return;
        try {
            const formData = new FormData();
            formData.append("title", editFormData.title);
            formData.append("description", editFormData.description);
            formData.append("type", editFormData.type);
            formData.append("existingImages", JSON.stringify(existingImages));
            editImages.forEach((file) => {
                formData.append("referencePics", file);
            });

            const res = await axios.put(
                `http://localhost:3000/api/v1/post/${editPostId}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            toast.success("Post updated successfully.");
            setPosts((prev) => prev.map((p) => (p._id === editPostId ? res.data.data : p)));
            setEditPostId(null);
            setEditImages([]);
            setExistingImages([]);
        } catch (err) {
            console.error("Error updating post:", err);
            toast.error("Failed to update post.");
        }
    };

    const confirmDelete = (id: string) => {
        setPostToDelete(id);
        setShowDeletePopup(true);
    };

    const handleDeletePost = async () => {
        if (!postToDelete) return;
        try {
            await axios.delete(`http://localhost:3000/api/v1/post/${postToDelete}`);
            setPosts((prev) => prev.filter((p) => p._id !== postToDelete));
            setShowDeletePopup(false);
            setPostToDelete(null);
            toast.success("Post deleted.");
        } catch (err) {
            console.error("Error deleting post:", err);
            toast.error("Failed to delete post.");
        }
    };

    return (
        <div className="flex bg-[#e9f9ff] min-h-screen">
            <Toaster />
            {/* Left sidebar: Contact info only */}
            <aside className="bg-[#5FA8D3] w-72 p-6 text-white flex flex-col">
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-6">Contact Info</h2>

                    {isEditing ? (
                        <>
                            <label className="block mb-2 font-semibold" htmlFor="name">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={profile.name}
                                onChange={handleContactInfoChange}
                                className="w-full mb-4 p-2 rounded text-black"
                            />

                            <label className="block mb-2 font-semibold" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={profile.email}
                                onChange={handleContactInfoChange}
                                className="w-full mb-4 p-2 rounded text-black"
                            />

                            <label className="block mb-2 font-semibold" htmlFor="phone">
                                Phone
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="text"
                                value={profile.phone}
                                onChange={handleContactInfoChange}
                                className="w-full mb-6 p-2 rounded text-black"
                            />
                        </>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <p className="font-semibold">Name</p>
                                <p>{profile.name}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Email</p>
                                <p>{profile.email}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Phone</p>
                                <p>{profile.phone}</p>
                            </div>
                        </div>
                    )}

                    {/* Edit Form - Only shown when editing a post */}
                    {editPostId && (
                        <div className="mt-8 p-4 bg-white rounded-lg text-black">
                            <h3 className="font-bold mb-3 text-[#1B4965]">Edit Post</h3>
                            <input
                                ref={titleInputRef}
                                name="title"
                                value={editFormData.title}
                                onChange={handleEditChange}
                                className="w-full border p-2 mb-2 rounded"
                                placeholder="Title"
                            />
                            <textarea
                                name="description"
                                value={editFormData.description}
                                onChange={handleEditChange}
                                className="w-full border p-2 mb-2 rounded"
                                placeholder="Description"
                                rows={3}
                            />
                            <input
                                name="type"
                                value={editFormData.type}
                                onChange={handleEditChange}
                                className="w-full border p-2 mb-2 rounded"
                                placeholder="Type"
                            />

                            <div className="mb-2">
                                <p className="font-semibold mb-1">Existing Images:</p>
                                <div className="flex gap-2 flex-wrap">
                                    {existingImages.map((img, i) => (
                                        <div key={i} className="relative">
                                            <img
                                                src={`http://localhost:3000/uploads/${img}`}
                                                alt="existing"
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                            <button
                                                onClick={() => handleRemoveExistingImage(img)}
                                                className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-1 hover:bg-red-800"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-2">
                                <p className="font-semibold mb-1">Add New Images (max total 5):</p>
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleAddImages}
                                    accept="image/*"
                                    className="w-full border p-2 rounded"
                                />
                                <div className="flex gap-2 flex-wrap mt-2">
                                    {editImages.map((file, i) => (
                                        <div key={i} className="relative">
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt="new"
                                                className="w-16 h-16 object-cover rounded border"
                                            />
                                            <button
                                                onClick={() => handleRemoveNewImage(i)}
                                                className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-1 hover:bg-red-800"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={handleEditSave}
                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setEditPostId(null)}
                                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Fixed position buttons at bottom */}
                <div className="sticky bottom-0 bg-[#5FA8D3] pb-6 pt-4 space-y-3">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSaveProfile}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded w-full"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 rounded w-full"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded w-full"
                        >
                            Edit Profile
                        </button>
                    )}
                    <button
                        onClick={() => {
                            localStorage.removeItem("designerUserId");
                            navigate("/");
                        }}
                        className="bg-[#D9534F] hover:bg-[#c64541] text-white font-bold py-3 rounded w-full"
                    >
                        LOGOUT
                    </button>
                </div>
            </aside>

            {/* Right main content */}
            <main className="flex-1 flex flex-col overflow-auto">
                <Navbar2 />
                <section className="flex flex-col items-center mt-10 px-10">
                    <img
                        src={previewImageUrl || profile.image}
                        alt="Profile"
                        className="w-28 h-28 rounded-full object-cover mb-3 border-4 border-[#5FA8D3]"
                    />
                    <h1 className="text-4xl font-extrabold text-[#1B4965] mb-6">{profile.name}</h1>

                    {isEditing && (
                        <div className="w-full max-w-3xl bg-white rounded-2xl shadow p-6 mb-8">
                            <label className="block mb-2 font-semibold text-[#1B4965]" htmlFor="experience">
                                Experience
                            </label>
                            <textarea
                                id="experience"
                                name="experience"
                                value={profile.experience}
                                onChange={handleProfileChange}
                                className="w-full mb-6 p-3 rounded border border-gray-300 resize-none text-gray-700"
                                rows={4}
                                placeholder="Describe your experience..."
                            />

                            <label className="block mb-2 font-semibold text-[#1B4965]" htmlFor="portfolio">
                                Portfolio
                            </label>
                            <textarea
                                id="portfolio"
                                name="portfolio"
                                value={profile.portfolio}
                                onChange={handleProfileChange}
                                className="w-full mb-6 p-3 rounded border border-gray-300 resize-none text-gray-700"
                                rows={4}
                                placeholder="Share your portfolio details or links..."
                            />

                            <label className="block mb-2 font-semibold text-[#1B4965]" htmlFor="image">
                                Profile Image
                            </label>
                            <input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={handleProfileImageChange}
                                className="mb-4"
                            />

                            <div className="mb-4">
                                <img
                                    src={previewImageUrl || profile.image}
                                    alt="Profile Preview"
                                    className="w-24 h-24 rounded-full object-cover border"
                                />
                            </div>
                        </div>
                    )}

                    {!isEditing && (
                        <div className="w-full max-w-3xl bg-white rounded-2xl shadow p-6 mb-8">
                            {profile.experience && (
                                <div className="mb-6">
                                    <h3 className="font-semibold text-[#1B4965] mb-2">Experience</h3>
                                    <p className="text-gray-700 whitespace-pre-line">{profile.experience}</p>
                                </div>
                            )}
                            {profile.portfolio && (
                                <div>
                                    <h3 className="font-semibold text-[#1B4965] mb-2">Portfolio</h3>
                                    <p className="text-gray-700 whitespace-pre-line">{profile.portfolio}</p>
                                </div>
                            )}
                        </div>
                    )}
                </section>

                {/* Updated My Works header and button */}
                <div className="flex justify-between items-center px-10 mt-8 mb-8 max-w-7xl mx-18">
                    <h2 className="text-3xl font-bold text-[#1B4965]">My Works</h2>
                    <button
                        onClick={() => navigate("/addpost")}
                        className="bg-[#5FA8D3] text-white px-6 py-3 rounded hover:bg-[#4a91be] ml-4"
                    >
                        Add Post
                    </button>
                </div>

                {/* Updated grid to show fewer columns for bigger cards */}
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8 px-6 pb-10 max-w-5xl mx-auto">
                    {posts.length === 0 && <p className="text-center text-gray-600">No posts found.</p>}

                    {posts.map((post) => (
                        <div key={post._id} className="bg-white rounded-lg shadow p-4 flex flex-col">
                            {editPostId === post._id ? (
                                // Edit mode handled above in sidebar, so skip here
                                <></>
                            ) : (
                                <>
                                    <h3 className="text-xl font-semibold mb-2 text-[#1B4965]">{post.title}</h3>
                                    <p className="mb-2 text-gray-700">{post.description}</p>
                                    <p className="mb-4 text-sm text-gray-500">Type: {post.type}</p>

                                    <div className="flex flex-wrap gap-3 mb-4">
                                        {post.referencePics &&
                                            post.referencePics.map((pic, index) => (
                                                <img
                                                    key={index}
                                                    src={`http://localhost:3000/uploads/${pic}`}
                                                    alt={`Reference ${index + 1}`}
                                                    className="w-24 h-24 object-cover rounded"
                                                />
                                            ))}
                                    </div>

                                    <div className="flex justify-between mt-auto">
                                        <button
                                            onClick={() => handleEditClick(post)}
                                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => confirmDelete(post._id)}
                                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                {/* Delete Confirmation Popup */}
                {showDeletePopup && (
                    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(5, 5, 5, 0.6)' }}>
                        <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                            <h3 className="text-lg font-semibold mb-4 text-[#1B4965]">Confirm Delete</h3>
                            <p className="mb-6">Are you sure you want to delete this post?</p>
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => setShowDeletePopup(false)}
                                    className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeletePost}
                                    className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ProfilePage2;
