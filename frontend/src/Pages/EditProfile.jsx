import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function EditServiceProfile() {
    const { id } = useParams();
    const [profileData, setProfileData] = useState({
        businessName: '',
        email: '',
        fullName: '',
        contact: '',
        zipcode: '',
        avatar: '',
        avatarPreview: '',
        coverImage: '',
        coverImagePreview: '',
        state: '',
        city: '',
        professions: '',
        experience: '',
        location: '',
        availability: '',
        additionalDetails: '',
        badges: ''
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [userType, setUserType] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setProfileData({ ...profileData, [name]: files[0], [`${name}Preview`]: URL.createObjectURL(files[0]) });
        }
    };

    const removeImage = (imageType) => {
        setProfileData({ ...profileData, [imageType]: '', [`${imageType}Preview`]: '' });
    };

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`/api/v1/service-providers/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('accessToken')}`
                    }
                });
                if (response.status === 200) {
                    setProfileData(response.data.data);
                    setUserType(response.data.data.userType);
                } else {
                    throw new Error('Failed to fetch profile data');
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setError('Failed to fetch profile data');
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const token = Cookies.get('accessToken');
            const formData = new FormData();
            Object.keys(profileData).forEach(key => {
                formData.append(key, profileData[key]);
            });
            console.log('Profile Data:', profileData);

            const response = await axios.patch(`/api/v1/save-sp-details`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                navigate(`/home-service-provider`);
            } else {
                setError('Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Failed to update profile');
        }
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen font-sans p-4">
            <div className="rounded-lg w-full max-w-[800px] text-center bg-white p-8 shadow-lg">
                <h1 className="text-2xl font-bold text-gray-700 mb-6">Edit Profile</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col items-center mb-4">

                        {/* Cover Image Section */}
                        <div className="relative w-full h-40 bg-orange-300 rounded-md overflow-hidden">
                            {profileData.coverImagePreview ? (
                                <>
                                    <img src={profileData.coverImagePreview} alt="Cover Preview" className="object-cover w-full h-full" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage('coverImage')}
                                        className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-800"
                                    >
                                        Change Image
                                    </button>
                                </>
                            ) : (
                                <label
                                    htmlFor="cover-upload"
                                    className="absolute top-2 right-2 bg-stdBlue text-white px-3 py-1 rounded-md cursor-pointer hover:bg-blue-950"
                                >
                                    Upload Cover Image
                                </label>
                            )}
                            <input
                                type="file"
                                name="coverImage"
                                onChange={handleFileChange}
                                className="hidden"
                                id="cover-upload"
                            />
                        </div>

                        {/* Avatar Section */}
                        <div className="relative -mt-12 mb-4">
                            {profileData.avatarPreview ? (
                                <>
                                    <img src={profileData.avatarPreview} alt="Avatar Preview" className="w-[140px] h-[140px] rounded-full border-4 border-white" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage('avatar')}
                                        className="absolute bottom-0 right-0 bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-800"
                                    >
                                        Change Image
                                    </button>
                                </>
                            ) : (
                                <label
                                    htmlFor="avatar-upload"
                                    className="block w-[140px] h-[140px] rounded-full bg-stdBlue border-4 border-white text-white flex items-center justify-center cursor-pointer hover:bg-blue-950"
                                    style={{ position: "relative", overflow: "hidden" }}
                                >
                                    Upload Image
                                </label>
                            )}
                            <input
                                type="file"
                                name="avatar"
                                onChange={handleFileChange}
                                className="hidden"
                                id="avatar-upload"
                            />
                        </div>
                    </div>

                    {/* Form Fields */}
                    <input type="text" name="fullName" value={profileData.fullName} onChange={handleInputChange} placeholder="Full Name" className="w-full p-3 border border-gray-300 rounded-md" />
                    <input type="email" name="email" value={profileData.email} onChange={handleInputChange} placeholder="Email" className="w-full p-3 border border-gray-300 rounded-md" />
                    <input type="text" name="businessName" value={profileData.businessName} onChange={handleInputChange} placeholder="Business Name" className="w-full p-3 border border-gray-300 rounded-md" />
                    <input type="text" name="contact" value={profileData.contact} onChange={handleInputChange} placeholder="Contact" className="w-full p-3 border border-gray-300 rounded-md" />
                    <input type="text" name="zipcode" value={profileData.zipcode} onChange={handleInputChange} placeholder="Zipcode" className="w-full p-3 border border-gray-300 rounded-md" />
                    <input type="text" name="state" value={profileData.state} onChange={handleInputChange} placeholder="State" className="w-full p-3 border border-gray-300 rounded-md" />
                    <input type="text" name="city" value={profileData.city} onChange={handleInputChange} placeholder="City" className="w-full p-3 border border-gray-300 rounded-md" />

                    {userType === 'serviceProvider' && (
                        <>
                            <select name="professions" value={profileData.professions} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md">
                                <option value="">Select Profession</option>
                                <option value="plumber">Plumber</option>
                                <option value="electrician">Electrician</option>
                                <option value="carpenter">Carpenter</option>
                                <option value="painter">Painter</option>
                                <option value="handyman">Handyman</option>

                            </select>
                            <input type="number" name="experience" value={profileData.experience} onChange={handleInputChange} placeholder="Experience (years)" min="0" className="w-full p-3 border border-gray-300 rounded-md" />
                            <input type="text" name="location" value={profileData.location} onChange={handleInputChange} placeholder="Location" className="w-full p-3 border border-gray-300 rounded-md" />
                            <select name="availability" value={profileData.availability} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md">
                                <option value="">Select Availability</option>
                                <option value="true">Available</option>
                                <option value="false">Not Available</option>
                            </select>
                            <textarea name="additionalDetails" value={profileData.additionalDetails} onChange={handleInputChange} placeholder="Additional Details" className="w-full p-3 border border-gray-300 rounded-md" />
                            <select name="badges" value={profileData.badges || ''} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md">
                                <option value="">Select Badge</option>
                                <option value="elite">Elite</option>
                                <option value="pro">Pro</option>
                                <option value="verified">Verified</option>
                                <option value="featured">Featured</option>
                                <option value="top-rated">Top-Rated</option>
                                <option value="experienced">Experienced</option>
                                <option value="local">Local</option>
                                <option value="onsite">Onsite</option>
                                <option value="emergency">Emergency</option>
                                <option value="24x7">24x7</option>
                            </select>

                        </>
                    )}

                    {error && <p className="text-red-500">{error}</p>}
                    <button type="submit" className="w-full bg-stdBlue text-white py-3 rounded-md hover:bg-blue-950">Save Changes</button>
                </form>
            </div>
        </div>
    );
}
