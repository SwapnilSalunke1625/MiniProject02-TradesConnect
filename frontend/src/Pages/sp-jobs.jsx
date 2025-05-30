import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { FaUserCircle, FaCheck, FaTimes } from 'react-icons/fa';
import BackButton from '../components/BackButton';
export default function SPJobs() {
    const [error, setError] = useState('');
    const [jobPosts, setJobPosts] = useState([]);
    const [filter, setFilter] = useState('New'); // Default filter set to 'New'
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobPosts = async () => {
            try {
                const response = await axios.get('/api/v1/users/get-job-posts-for-sp', {
                    headers: {
                        'Authorization': `Bearer ${Cookies.get('accessToken')}`,
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

    const filteredJobPosts = jobPosts.filter((job) => job.status === filter);
    const [isAccepted, setIsAccepted] = useState(false);

    const handleAccept = async (jobId) => {
        try {
            console.log(jobId);
          const response = await axios.post(`/api/v1/users/${jobId}/accept`, { status: 'new' });
          if (response.data && response.data.job) {
            const updatedJob = response.data.job;
            setJobPosts(prevJobs => prevJobs.map(job => job._id === jobId ? updatedJob : job));
          } else {
            setIsAccepted(true);
          }
        } catch (error) {
          console.error('Error accepting job:', error);
        }
      };

    const handleReject = async (jobId) => {
        try {
            await axios.delete(`/api/v1/users/${jobId}/reject`);
        } catch (error) {
            console.error('Error rejecting job:', error);
        }
    };

    return (
        <>
            <BackButton />
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-3xl mx-auto">
                    {/* Error message */}
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                    {/* Filter buttons */}
                    <div className="flex justify-center mb-4">
                        <button
                            onClick={() => setFilter('new')}
                            className={`mx-2 px-4 py-2 rounded-full ${filter === 'new' ? 'bg-orange-500 border-b-4 border-gray-800' : 'bg-gradient-to-r from-orange-400 to-orange-500'
                                } text-white shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out backdrop-blur-sm bg-opacity-70`}
                        >
                            New
                        </button>
                        <button
                            onClick={() => setFilter('pending')}
                            className={`mx-2 px-4 py-2 rounded-full ${filter === 'pending' ? 'bg-yellow-500 border-b-4 border-gray-800' : 'bg-gradient-to-r from-yellow-400 to-yellow-500'
                                } text-white shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out backdrop-blur-sm bg-opacity-70`}
                        >
                            Pending
                        </button>
                        <button
                            onClick={() => setFilter('completed')}
                            className={`mx-2 px-4 py-2 rounded-full ${filter === 'completed' ? 'bg-green-500 border-b-4 border-gray-800' : 'bg-gradient-to-r from-green-400 to-green-500'
                                } text-white shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out backdrop-blur-sm bg-opacity-70`}
                        >
                            Completed
                        </button>
                    </div>


                    <div className="mt-4 space-y-6">
                        {filteredJobPosts.length > 0 ? (
                            filteredJobPosts.map((job) => (
                                <div key={job._id} className="bg-white bg-opacity-90 backdrop-blur-lg p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out flex items-start gap-4 border border-gray-200">
                                    {/* User Icon */}
                                    <div className="flex-shrink-0">
                                        <FaUserCircle className="text-5xl text-stdBlue" />
                                    </div>

                                    {/* Job Details */}
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-semibold text-stdBlue mb-1">
                                            {job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1)} Job
                                        </h3>
                                        <p className="text-gray-700 mb-2">{job.additionalDetails}</p>
                                        <div className="text-gray-600 space-y-1">
                                            <p className="text-sm">Status: <span className="font-semibold">{job.status}</span></p>
                                            <p className="text-sm">Progress: <span className="font-semibold">{job.jobProgress}</span></p>
                                            <p className="text-sm">Time: <span className="font-semibold">{new Date(job.time).toLocaleString()}</span></p>
                                        </div>
                                    </div>

                                    {/* Job Actions */}
                                    <div className="ml-6 flex flex-col items-center justify-between">
                                        <div className="mt-4 flex flex-col space-y-2">
                                            <button
                                                className={`flex items-center justify-center gap-2 px-5 py-2 rounded-full shadow-md transition-transform transform hover:scale-105 ${isAccepted ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-green-400 to-green-500 text-white'
                                                }`}
                                                onClick={() => handleAccept(job._id)}
                                                disabled={isAccepted}
                                            >
                                                <FaCheck className="text-lg" />
                                                Accept
                                            </button>
                                            <button
                                                className="flex items-center justify-center gap-2 px-5 py-2 bg-gradient-to-r from-red-400 to-red-500 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                                                onClick={() => handleReject(job._id)}
                                            >
                                                <FaTimes className="text-lg" />
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No job posts available for "{filter}" status.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
