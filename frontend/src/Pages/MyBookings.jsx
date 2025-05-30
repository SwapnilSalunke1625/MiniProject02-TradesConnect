import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';

export default function BookJob() {
    const [error, setError] = useState('');
    const [jobPosts, setJobPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobPosts = async () => {
            try {
                const response = await axios.get('/api/v1/users/get-job-posts', {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('accessToken')}`,
                        'Content-Type': 'application/json'
                    }
                });
                setJobPosts(response.data.data);
            } catch (error) {
                console.error('Error fetching job posts:', error);
                setError('Failed to fetch job posts');
            }
        };

        fetchJobPosts();
    }, [navigate]);

    const handleCancelBooking = async (jobId) => {
        try {
            await axios.delete(`/api/v1/users/cancel-job/${jobId}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`,
                }
            });
            // Remove job from state after successful deletion
            setJobPosts(prevJobs => prevJobs.filter(job => job._id !== jobId));
        } catch (error) {
            console.error('Error canceling booking:', error);
            setError('Failed to cancel booking');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-3xl mx-auto">
                {/* Error message */}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {/* Job Posts */}
                <div className="mt-4 space-y-4">
                    {jobPosts.length > 0 ? (
                        jobPosts.map((job) => (
                            <div key={job._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 flex items-start gap-6 border border-gray-200">
                                {/* Service Provider Icon */}
                                <FaUserCircle className="text-5xl text-stdBlue opacity-90" />

                                {/* Job Details */}
                                <div className="flex-1 space-y-3">
                                    <h3 className="text-2xl font-semibold text-stdBlue">
                                        {`${job.jobType.charAt(0).toUpperCase()}${job.jobType.slice(1)} Job`}
                                    </h3>

                                    <p className="text-gray-700 text-base">
                                        {job.additionalDetails}
                                    </p>

                                    <div className="flex items-center text-gray-600 text-sm">
                                        <span className="font-semibold mr-2">Status:</span> {job.status}
                                    </div>

                                    <div className="flex items-center text-gray-600 text-sm">
                                        <span className="font-semibold mr-2">Progress:</span> {job.jobProgress}
                                    </div>

                                    <div className="flex items-center text-gray-600 text-sm">
                                        <span className="font-semibold mr-2">Time:</span> {new Date(job.time).toLocaleString()}
                                    </div>
                                </div>

                                {/* Cancel Booking Button */}
                                <div className="ml-4">
                                    <button
                                        onClick={() => handleCancelBooking(job._id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-150"
                                    >
                                        Cancel Booking
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No job posts available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
