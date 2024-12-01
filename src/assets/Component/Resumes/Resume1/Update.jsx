import { useState, useEffect } from 'react';
import axios from 'axios';
import { Url } from '../../../../url';
import { useAuth } from '../../../ContaxtApi/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Update = ({ resumeId, onClose }) => {
    const { token } = useAuth();
    const [resume, setResume] = useState(null); // Store resume data
    const [formData, setFormData] = useState({
        name: '',
        jobTitle: '',
        yourinfo: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const response = await axios.get(`${Url}/api/v1/resume1`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setResume(response.data); // Set resume data
            } catch (error) {
                console.error('Error fetching resume:', error);
                toast.error('Failed to fetch resume data.');
            }
        };

        fetchResume();
    }, [resumeId, token]);

    // Set form data when resume data is fetched
    useEffect(() => {
        if (resume) {
            setFormData({
                name: resume.name || '',
                jobTitle: resume.jobTitle || '',
                yourinfo: resume.yourinfo || '',
                phone: resume.contact?.phone || '',
                email: resume.contact?.email || '',
                address: resume.contact?.address || '',
                city: resume.contact?.city || '',
                state: resume.contact?.state || '',
            });
        }
    }, [resume]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async () => {
        setLoading(true);
        try {
            // Wrap contact information inside the contact object
            const updatedData = {
                ...formData,
                contact: {
                    phone: formData.phone,
                    email: formData.email,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                }
            };

            // Send the updated data to the backend
            const response = await axios.put(`${Url}/api/v1/resume1/${resumeId}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log("response:", response);

            toast.success('Resume updated successfully!');
            setResume(response.data); // Optionally update the resume state with the updated resume

            onClose(); // Close modal after successful update

        } catch (error) {
            console.error('Error updating resume:', error);
            toast.error('Failed to update the resume. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (!resume) {
        return <div>Loading...</div>; // Show loading state if resume data is not fetched yet
    }

    return (
        <div className="update-modal-container fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="update-form-container p-6 bg-white shadow-lg rounded-md w-[800px]">
                <h2 className="text-2xl font-bold mb-4">Update Resume</h2>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Name */}
                    <div className="form-group">
                        <label htmlFor="name" className="block font-medium mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full border border-gray-300 p-2 rounded-md"
                            value={formData.name || ''}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>

                    {/* Job Title */}
                    <div className="form-group">
                        <label htmlFor="jobTitle" className="block font-medium mb-2">Job Title</label>
                        <input
                            type="text"
                            id="jobTitle"
                            name="jobTitle"
                            className="w-full border border-gray-300 p-2 rounded-md"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>

                    {/* Your Info */}
                    <div className="form-group">
                        <label htmlFor="yourinfo" className="block font-medium mb-2">Your Info</label>
                        <textarea
                            id="yourinfo"
                            name="yourinfo"
                            className="w-full border border-gray-300 p-2 rounded-md"
                            rows="4"
                            value={formData.yourinfo}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>

                    {/* Contact Info */}
                    <div className="form-group">
                        <label htmlFor="phone" className="block font-medium mb-2">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            className="w-full border border-gray-300 p-2 rounded-md"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="block font-medium mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full border border-gray-300 p-2 rounded-md"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address" className="block font-medium mb-2">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            className="w-full border border-gray-300 p-2 rounded-md"
                            value={formData.address}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="city" className="block font-medium mb-2">City</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            className="w-full border border-gray-300 p-2 rounded-md"
                            value={formData.city}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="state" className="block font-medium mb-2">State</label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            className="w-full border border-gray-300 p-2 rounded-md"
                            value={formData.state}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>
                </div>

                <div className="flex justify-around">
                    <button
                        onClick={handleUpdate}
                        disabled={loading}
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                    >
                        {loading ? 'Updating...' : 'Update Resume'}
                    </button>

                    <button
                        onClick={onClose}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                        Close
                    </button>
                </div>


                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            </div>
        </div>
    );
};

export default Update;
