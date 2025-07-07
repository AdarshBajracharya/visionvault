import React, { useState } from 'react';
import Navbar from '../../assets/common/navbar';
import { Trash2 } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const [listings, setListings] = useState([
    { id: 1, title: 'Website for College', role: 'Web Designer' },
    { id: 2, title: 'Website for College', role: 'Web Designer' },
    { id: 3, title: 'Website for College', role: 'Web Designer' },
  ]);

  const [contactInfo, setContactInfo] = useState({
    email: 'softwarica@gmail.com',
    phone: '+977 980-1523050',
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [tempInfo, setTempInfo] = useState(contactInfo);

  const handleDelete = (id: number) => {
    setListings((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEditSubmit = () => {
    setContactInfo(tempInfo);
    setShowEditModal(false);
  };

  const handleLogout = () => {
    // Example: Clear localStorage, cookies, auth
    console.log("Logging out...");
    alert("Logged out successfully");
    // Redirect: window.location.href = "/login";
  };

  return (
    <div className="bg-[#e9f9ff] min-h-screen">
      <Navbar />
      <img
                src="src/assets/images/designer_home_bg.png"
                alt="Background"
                className="absolute top-10 left-50 w-150 h-150 object-cover z-0"
            />

      {/* Banner */}
      <div className="flex flex-col items-center text-center py-10 relative">
        <img
          src="/src/assets/images/softwarica_logo.png"
          alt="Softwarica Logo"
          className="w-36 h-36 object-contain mb-4"
        />
        <h1 className="text-white text-5xl font-bold drop-shadow-md">SOFTWARICA COLLEGE</h1>
      </div>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row justify-center gap-12 px-8 pb-20">
        {/* Contact Info */}
        <div className="bg-white p-6 rounded-3xl shadow-xl w-full max-w-md text-center">
          <h2 className="font-semibold text-lg mb-4">Contact Info:</h2>
          <p className="text-gray-700 mb-2">{contactInfo.email}</p>
          <p className="text-gray-700 mb-6">{contactInfo.phone}</p>

          <button
            onClick={() => setShowEditModal(true)}
            className="w-full bg-[#6dbacb] text-white py-2 rounded-lg font-semibold mb-3 hover:bg-[#5aaabc]"
          >
            EDIT
          </button>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600"
          >
            LOGOUT
          </button>
        </div>

        {/* Listings */}
        <div className="bg-white p-6 rounded-3xl shadow-xl w-full max-w-md">
          <h2 className="font-semibold text-lg mb-4 text-center">Current Listings</h2>
          <div className="flex flex-col gap-4">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="border rounded-xl px-4 py-3 flex justify-between items-center shadow-sm bg-white"
              >
                <div>
                  <p className="text-sm text-gray-600">Looking for: {listing.role}</p>
                  <p className="font-bold text-gray-800">{listing.title}</p>
                </div>
                <button
                  onClick={() => handleDelete(listing.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Contact Info</h2>
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg p-2 mb-4"
              value={tempInfo.email}
              onChange={(e) => setTempInfo({ ...tempInfo, email: e.target.value })}
            />
            <label className="block mb-2 text-sm font-medium">Phone</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2 mb-6"
              value={tempInfo.phone}
              onChange={(e) => setTempInfo({ ...tempInfo, phone: e.target.value })}
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
