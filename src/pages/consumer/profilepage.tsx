import React, { useEffect, useState } from 'react';
import Navbar from '../../assets/common/navbar';
import { Trash2, Edit2 } from 'lucide-react';
import axios from 'axios';

interface JobListing {
  _id: string;
  title: string;
  description: string;
  role?: string;
  type?: string;
  referencePics?: string[];
}

interface Profile {
  name?: string;
  email?: string;
  phone?: string;
  image?: string;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [listings, setListings] = useState<JobListing[]>([]);
  const [contactInfo, setContactInfo] = useState({ email: '', phone: '' });
  const [showEditModal, setShowEditModal] = useState(false);
  const [tempInfo, setTempInfo] = useState({ email: '', phone: '' });

  // For editing job posts
  const [editingJob, setEditingJob] = useState<JobListing | null>(null);
  const [editJobForm, setEditJobForm] = useState({
    title: '',
    description: '',
    type: '',
  });
  const [showEditJobModal, setShowEditJobModal] = useState(false);

  // Images state for edit modal
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [editJobImages, setEditJobImages] = useState<File[]>([]);

  // For delete confirmation modal
  const [jobToDelete, setJobToDelete] = useState<JobListing | null>(null);

  const userId = localStorage.getItem('designerId') || localStorage.getItem('consumerId');

  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        const isDesigner = !!localStorage.getItem('designerId');
        const profileEndpoint = isDesigner
          ? `http://localhost:3000/api/v1/designer/${userId}`
          : `http://localhost:3000/api/v1/consumer/${userId}`;

        const res = await axios.get(profileEndpoint);
        const data = res.data?.data;

        setProfile(data);
        setContactInfo({ email: data.email || '', phone: data.phone || '' });
        setTempInfo({ email: data.email || '', phone: data.phone || '' });

        // Fetch job posts created by this user (consumer or designer)
        const jobsEndpoint = isDesigner
          ? `http://localhost:3000/api/v1/job/designer/${userId}`
          : `http://localhost:3000/api/v1/job/consumer/${userId}`;

        const postRes = await axios.get(jobsEndpoint);
        setListings(postRes.data.data || []);
      } catch (err) {
        console.error('Error fetching profile or job posts:', err);
      }
    };

    fetchProfile();
  }, [userId]);

  // Contact info edit handlers
  const handleEditSubmit = () => {
    setContactInfo(tempInfo);
    setShowEditModal(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    alert('Logged out successfully');
    window.location.href = '/';
  };

  // Show confirm dialog before delete
  const confirmDelete = (job: JobListing) => {
    setJobToDelete(job);
  };

  // Actually delete after confirmation
  const handleConfirmDelete = async () => {
    if (!jobToDelete) return;

    try {
      await axios.delete(`http://localhost:3000/api/v1/job/${jobToDelete._id}`);
      setListings((prev) => prev.filter((item) => item._id !== jobToDelete._id));
      setJobToDelete(null);
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete job post.');
      setJobToDelete(null);
    }
  };

  // Cancel delete modal
  const handleCancelDelete = () => {
    setJobToDelete(null);
  };

  // Open job edit modal
  const openEditJobModal = (job: JobListing) => {
    setEditingJob(job);
    setEditJobForm({
      title: job.title,
      description: job.description,
      type: job.type || '',
    });
    setExistingImages(job.referencePics || []);
    setEditJobImages([]);
    setShowEditJobModal(true);
  };

  // Handle job edit form change
  const handleEditJobChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditJobForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle new image file input
  const handleNewImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    setEditJobImages((prev) => [...prev, ...filesArray]);
  };

  // Remove existing image from existingImages list
  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Remove a newly added image before submit
  const removeNewImage = (index: number) => {
    setEditJobImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit job edit with images
  const handleEditJobSubmit = async () => {
    if (!editingJob) return;

    try {
      const formData = new FormData();
      formData.append('title', editJobForm.title);
      formData.append('description', editJobForm.description);
      formData.append('type', editJobForm.type);

      // Send existing images filenames to keep as JSON string
      formData.append('existingImages', JSON.stringify(existingImages));

      // Append new image files
      editJobImages.forEach((file) => {
        formData.append('newImages', file);
      });

      const res = await axios.put(
        `http://localhost:3000/api/v1/job/${editingJob._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Update listings state with updated job
      setListings((prev) =>
        prev.map((job) => (job._id === editingJob._id ? res.data.data : job))
      );

      // Reset modal states
      setShowEditJobModal(false);
      setEditingJob(null);
      setEditJobImages([]);
      setExistingImages([]);
    } catch (err) {
      console.error('Error updating job post:', err);
      alert('Failed to update job post.');
    }
  };

  return (
    <div className="bg-[#e9f9ff] min-h-screen">
      <Navbar />

      {/* Banner */}
      <div className="flex flex-col items-center text-center py-10 relative">
        {profile?.image ? (
          <img
            src={`http://localhost:3000/uploads/${profile.image}`}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-blue-300 shadow-md"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4 text-gray-400 text-lg">
            No Image
          </div>
        )}
        <h1 className="text-white text-5xl font-bold drop-shadow-md text-stroke">
          {profile?.name?.toUpperCase() || 'PROFILE'}
        </h1>
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
        <div className="bg-white p-6 rounded-3xl shadow-xl w-full max-w-2xl">
          <h2 className="font-semibold text-lg mb-4 text-center">Current Listings</h2>
          <div className="flex flex-col gap-6">
            {listings.length > 0 ? (
              listings.map((listing) => (
                <div
                  key={listing._id}
                  className="border rounded-xl p-4 flex flex-col sm:flex-row items-center sm:items-start gap-4 shadow-sm bg-white"
                >
                  {/* Thumbnails if available */}
                  {listing.referencePics && listing.referencePics.length > 0 ? (
                    <img
                      src={`http://localhost:3000/uploads/${listing.referencePics[0]}`}
                      alt="Preview"
                      className="w-32 h-32 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                      No Image
                    </div>
                  )}

                  {/* Info + Delete + Edit */}
                  <div className="flex-1 flex flex-col justify-between">
                    <p className="text-sm text-gray-600 mb-1">
                      Looking for: {listing.role || listing.type}
                    </p>
                    <p className="font-bold text-lg text-gray-800">{listing.title}</p>
                    <p className="text-gray-700 mb-2">{listing.description}</p>

                    <div className="flex gap-4 mt-2">
                      <button
                        onClick={() => openEditJobModal(listing)}
                        className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
                      >
                        <Edit2 size={18} /> Edit
                      </button>

                      <button
                        onClick={() => confirmDelete(listing)}
                        className="text-red-500 hover:text-red-700 flex items-center gap-1"
                      >
                        <Trash2 size={18} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No listings yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Edit Contact Info Modal */}
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

      {/* Edit Job Modal */}
      {showEditJobModal && editingJob && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 overflow-auto p-4">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Edit Job Post</h2>

            <label className="block mb-2 text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              className="w-full border rounded-lg p-2 mb-4"
              value={editJobForm.title}
              onChange={handleEditJobChange}
            />

            <label className="block mb-2 text-sm font-medium">Description</label>
            <textarea
              name="description"
              className="w-full border rounded-lg p-2 mb-4"
              value={editJobForm.description}
              onChange={handleEditJobChange}
              rows={4}
            />

            <label className="block mb-2 text-sm font-medium">Type</label>
            <input
              type="text"
              name="type"
              className="w-full border rounded-lg p-2 mb-6"
              value={editJobForm.type}
              onChange={handleEditJobChange}
            />

            {/* Existing Images */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">Existing Images</label>
              <div className="flex flex-wrap gap-2">
                {existingImages.length > 0 ? (
                  existingImages.map((img, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={`http://localhost:3000/uploads/${img}`}
                        alt={`Existing ${idx}`}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(idx)}
                        className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-700"
                        aria-label="Remove image"
                      >
                        ×
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No existing images.</p>
                )}
              </div>
            </div>

            {/* New Images Upload */}
            <div className="mb-6">
              <label className="block mb-2 font-medium">Add New Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleNewImagesChange}
              />
              {editJobImages.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {editJobImages.map((file, idx) => {
                    const url = URL.createObjectURL(file);
                    return (
                      <div key={idx} className="relative">
                        <img
                          src={url}
                          alt={`New ${idx}`}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeNewImage(idx)}
                          className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-700"
                          aria-label="Remove new image"
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowEditJobModal(false);
                  setEditingJob(null);
                  setEditJobImages([]);
                  setExistingImages([]);
                }}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleEditJobSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {jobToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm text-center">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-6">
              Are you sure you want to delete the job post: <strong>{jobToDelete.title}</strong>?
            </p>
            <div className="flex justify-center gap-6">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
