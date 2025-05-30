import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ServiceProviderProfile() {
    const { id } = useParams(); // Assuming the service provider ID is passed as a URL parameter
    const [serviceProvider, setServiceProvider] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const badgeColors = ["bg-blue-200", "bg-green-200", "bg-yellow-200", "bg-pink-200", "bg-purple-200", "bg-teal-200"];
    const colors = ["bg-blue-100", "bg-green-100", "bg-yellow-100", "bg-pink-100", "bg-purple-100", "bg-teal-100"];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [providerResponse, reviewsResponse] = await Promise.all([
                    axios.get(`/api/v1/service-providers/${id}`),
                    axios.get(`/api/v1/service-providers/get-reviews/${id}`)
                ]);

                if (providerResponse.status === 200) {
                    setServiceProvider(providerResponse.data.data);
                } else {
                    throw new Error('Failed to fetch service provider details');
                }

                if (reviewsResponse.status === 200) {
                    setReviews(reviewsResponse.data.data);
                } else {
                    throw new Error('Failed to fetch reviews');
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="loader border-t-4 border-b-4 border-gray-900 rounded-full w-12 h-12"></div>
            </div>
        );
    }

    const getInitials = (name) => {
        return name ? name.split(' ').map((n) => n[0]).join('').toUpperCase() : '';
    };

    const getRandomGradient = () => {
        const gradients = [
            'bg-gradient-to-r from-gray-700 to-gray-900',
            'bg-gradient-to-r from-gray-800 to-gray-600',
            'bg-gradient-to-r from-gray-900 to-gray-700',
        ];
        return gradients[Math.floor(Math.random() * gradients.length)];
    };

    const addReview = async (e) => {
        e.preventDefault();
        const rating = e.target.rating.value;
        const reviewDescription = e.target.reviewDescription.value;
        try {
            const response = await axios.post(`/api/v1/service-providers/set-sp-review`, {
                serviceProviderId: id,
                rating,
                reviewDescription,
            });
            if (response.status === 201) {
                alert('Review added successfully');
                window.location.reload();
            } else {
                throw new Error('Failed to add review');
            }
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen font-sans p-4">
        {/* Cover Image (Only visible for serviceProvider) */}
        {serviceProvider?.userType === 'serviceProvider' && (
            <div className="w-full max-w-[800px] h-[200px] bg-cover bg-center rounded-t-lg relative mt-4">
                {serviceProvider?.coverImage ? (
                    <img
                        src={serviceProvider.coverImage}
                        alt="Cover"
                        className="w-full h-full object-cover rounded-t-lg"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-r from-orange-500 to-blue-900 rounded-t-lg"></div>
                )}

                {/* Avatar Section */}
                {serviceProvider?.avatar ? (
                    <img
                        src={serviceProvider.avatar}
                        alt={`${serviceProvider.fullName}'s avatar`}
                        className="w-24 h-24 rounded-full absolute left-10 transform -translate-x-1/2 -bottom-1 border-4 border-white"
                    />
                ) : (
                    <div
                        className={`w-24 h-24 rounded-full absolute left-20 transform -translate-x-1/2 top-10 flex items-center justify-center text-white text-2xl font-bold border-4 border-white ${getRandomGradient()}`}
                    >
                        {getInitials(serviceProvider?.fullName || '')}
                    </div>
                )}

                {/* Change Cover Image Button */}
                <button
                    className="absolute bottom-3 right-3 bg-white text-blue-900 px-4 py-2 rounded-md shadow-lg hover:bg-orange-500 transition duration-200"
                    onClick={() => alert('Upload cover image')}
                >
                    Change Cover Image
                </button>
            </div>
        )}

        <div className="rounded-lg w-full max-w-[800px] text-center bg-white p-6 shadow-md mt-4">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">{serviceProvider?.fullName}</h1>

            {/* Avatar or Initials */}
            {serviceProvider?.avatar ? (
                <img
                    src={serviceProvider.avatar}
                    alt={`${serviceProvider.fullName}'s avatar`}
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                />
            ) : (
                <div
                    className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold ${getRandomGradient()}`}
                >
                    {getInitials(serviceProvider?.fullName || '')}
                </div>
            )}

            {/* Basic Info */}
            <p className="text-gray-600">
                <strong>Business Name:</strong> {serviceProvider?.businessName}
            </p>
            <p className="text-gray-600">
                <strong>Email:</strong> {serviceProvider?.email}
            </p>
            <p className="text-gray-600">
                <strong>Contact:</strong> {serviceProvider?.contact}
            </p>
            <p className="text-gray-600">
                <strong>Location:</strong> {serviceProvider?.city}, {serviceProvider?.state}
            </p>

            {serviceProvider?.additionalDetails && (
                <div className="text-gray-600 mt-6">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Additional Details</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {serviceProvider.additionalDetails.map((detail, index) => (
                            <div
                                key={index}
                                className={`p-4 border border-gray-300 rounded-lg shadow-sm text-gray-800 ${colors[index % colors.length]}`}
                            >
                                {detail}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Badges */}
            {serviceProvider?.badges && (
                <div className="text-gray-600 mt-6">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Badges</h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        {serviceProvider.badges.map((badge, index) => (
                            <div
                                key={index}
                                className={`flex items-center p-2 rounded-full shadow-sm text-gray-800 ${badgeColors[index % badgeColors.length]}`}
                            >
                                <span className="text-sm font-semibold">{badge}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="mt-8 flex justify-center gap-12">
                <button
                    onClick={() => navigate('/book/' + serviceProvider?.userId)}
                    className="text-orange-500 font-semibold px-6 py-3 rounded-lg border border-orange-500 transition duration-200 ease-in-out hover:bg-orange-500 hover:text-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                    Hire Me
                </button>
                <button
                    onClick={() => navigate('/message')}
                    className="bg-blue-900 font-semibold text-white px-6 py-3 rounded-lg transition duration-200 ease-in-out hover:bg-orange-500 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900"
                >
                    Message
                </button>
            </div>

            <div className="mt-4">
                <h2 className="text-xl font-bold text-gray-700 mb-2">Reviews</h2>
                {reviews.length > 0 ? (
                    <div className="space-y-6">
                        {reviews.map((review) => (
                            <div
                                key={review._id}
                                className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-5 border border-gray-200"
                            >
                                {review.userId?.avatar ? (
                                    <img
                                        src={review.userId.avatar}
                                        alt={`${review.userId.fullName}'s avatar`}
                                        className="w-14 h-14 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-14 h-14 bg-blue-900 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                                        {getInitials(review.userId?.fullName || 'A')}
                                    </div>
                                )}

                                <div className="text-gray-800 w-full">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="font-semibold text-lg">{review.userId?.fullName}</div>
                                        <div className="text-sm text-yellow-500 font-medium">
                                            ⭐ {review.rating} / 5
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {review.reviewDescription}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No reviews yet.</p>
                )}

                <form onSubmit={addReview} className="mt-6 p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">Leave a Review</h2>

                    <textarea
                        name="reviewDescription"
                        rows="4"
                        placeholder="Write your review here..."
                        className="w-full p-4 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-orange-500"
                    ></textarea>

                    <div className="flex items-center gap-4">
                        <input
                            type="number"
                            name="rating"
                            min="1"
                            max="5"
                            placeholder="Rating (1-5)"
                            className="w-20 p-2 border border-gray-300 rounded-md text-center focus:outline-none focus:border-orange-500"
                            required
                        />
                        <button
                            type="submit"
                            className="flex items-center justify-center bg-blue-900 text-white px-5 py-2 rounded-md hover:bg-orange-500 transition-colors duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
);

}
