import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function BookJob() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        id,
        jobType: "",
        additionalDetails: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const token = Cookies.get("accessToken");
            // console.log('Form Data:', formData);
            const response = await axios.post("/api/v1/users/job-post", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 201) {
                navigate("/my-bookings");
            } else {
                setError("Failed to submit job request");
            }
        } catch (error) {
            console.error("Error submitting job request:", error);
            setError("Failed to submit job request");
        }
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen font-sans p-6">
        <div className="rounded-lg w-full max-w-[800px] text-center bg-white p-8 shadow-lg relative">
            <Link to={`/${id}/profile`}>
                <button className="absolute top-4 left-4 bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200">
                    Back
                </button>
            </Link>
            <h1 className="text-3xl font-bold text-stdBlue mb-6">Book Job</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Job Type Selection */}
                <div className="text-left">
                    <label className="block text-bla font-medium mb-2">Job Type</label>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {["plumber", "electrician", "handyman", "mover", "cleaning", "painting"].map((job) => (
                            <label
                                key={job}
                                className={`flex items-center justify-center w-full h-12 border rounded-md cursor-pointer transition-all duration-150 ${
                                    formData.jobType === job ? 'bg-stdBlue text-white' : 'bg-gray-50 border-gray-300 text-gray-700'
                                } hover:border-stdBlue`}
                            >
                                <input
                                    type="radio"
                                    name="jobType"
                                    value={job}
                                    onChange={handleInputChange}
                                    className="hidden"
                                />
                                <span className="font-semibold">{job.charAt(0).toUpperCase() + job.slice(1)}</span>
                            </label>
                        ))}
                    </div>
                </div>
    
                {/* Additional Details Textarea */}
                <textarea
                    name="additionalDetails"
                    value={formData.additionalDetails}
                    onChange={handleInputChange}
                    placeholder="Additional Details"
                    className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400 transition duration-150"
                ></textarea>
    
                {/* Error Message */}
                {error && <p className="text-red-500 font-medium">{error}</p>}
    
                {/* Submit Button */}
                <button
                    type="submit"
                    className="mt-4 w-full bg-stdYellow text-white font-semibold py-3 rounded-md shadow-md hover:bg-blue-950 transition duration-200"
                >
                    Submit Job Request
                </button>
            </form>
        </div>
    </div>
    
    );
}