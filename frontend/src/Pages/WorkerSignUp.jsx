import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import bgImage from '../components/Assets/backgroundImage.png'

export default function WorkerSignUp() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        businessName: '',
        password: '',
        userType: 'serviceProvider',
        contact: '',
        zipcode: '',
        state: '',
        city: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('/api/v1/users/register', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) {
                navigate('/login');
            } else {
                setError(response.data.message || 'Registration failed');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <>
            <div
                className=' flex items-center justify-center min-h-[90vh] font-stdFont relative'
            >

                <div
                    className="absolute inset-0 bg-cover bg-center filter blur-[2px]"
                    style={{ backgroundImage: `url(${bgImage})` }}
                />


                <div className="relative z-10">
                    <div className="rounded-2xl w-full max-w-[400px] md:h-[65%] h-auto text-center bg-white py-3">
                        <h1 className='text-3xl md:text-4xl font-bold text-stdBlue'>Register <span className='text-sm text-color1'>as Worker*</span></h1>
                        <form onSubmit={handleSubmit} className='mt-5'>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                placeholder="Full Name"
                                className='h-[40px] w-full max-w-[300px] md:max-w-[320px] rounded-lg pl-3 outline-none border-2 text-sm md:text-base mb-2'
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                                className='h-[40px] w-full max-w-[300px] md:max-w-[320px] rounded-lg pl-3 outline-none border-2 text-sm md:text-base mb-2'
                            />
                            <input
                                type="tel"
                                name="contact"
                                value={formData.contact}
                                onChange={handleInputChange}
                                placeholder="Phone No"
                                className='h-[40px] w-full max-w-[300px] md:max-w-[210px] rounded-lg pl-3 outline-none border-2 text-sm md:text-base mb-2 mr-3'
                            />
                            <input
                                type="text"
                                name="zipcode"
                                value={formData.zipcode}
                                onChange={handleInputChange}
                                placeholder="Zipcode"
                                className='h-[40px] w-full max-w-[300px] md:max-w-[100px] rounded-lg pl-3 outline-none border-2 text-sm md:text-base mb-2'
                            />
                            <input
                                type="text"
                                name="businessName"
                                value={formData.businessName}
                                onChange={handleInputChange}
                                placeholder="Business Name"
                                className='h-[40px] w-full max-w-[300px] md:max-w-[320px] rounded-lg pl-3 outline-none border-2 text-sm md:text-base mb-2'

                            />


                            <select
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                className='h-[40px] max-w-[135px] w-full md:max-w-[140px] rounded-lg pl-2 text-sm md:text-base border-2 outline-none mb-2 mr-5'
                            >
                                <option disabled value="">State</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Tamil Nadu">Tamil Nadu</option>
                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                <option value="West Bengal">West Bengal</option>
                            </select>
                            <select
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                className='h-[40px] max-w-[135px] w-full md:max-w-[140px] rounded-lg pl-2 text-sm md:text-base border-2 outline-none mb-2 ml-5'
                            >
                                <option disabled value="">City</option>
                                <option value="Sambhajinagar">Sambhajinagar</option>
                                <option value="Solapur">Solapur</option>
                                <option value="Beed">Beed</option>
                                <option value="Jalna">Jalna</option>
                                <option value="Dharashiv">Dharashiv</option>
                            </select>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Password"
                                className='h-[40px] w-full max-w-[300px] md:max-w-[320px] rounded-lg pl-3 outline-none border-2 text-sm md:text-base mb-2'
                            />

                            {/* Add confirm password in schema */}

                            <input
                                type="password"
                                name="Confirm"
                                // value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Confirm"
                                className='h-[40px] w-full max-w-[300px] md:max-w-[320px] rounded-lg pl-3 outline-none border-2 text-sm md:text-base mb-2'
                            />

                            {error && <p className='text-red-500 text-xs'>{error}</p>}
                            <div className='flex items-center justify-center w-full'>
                                <p className='text-xs md:text-sm text-center max-w-[300px]'>
                                    By signing up you agree to our <span className='font-bold text-stdBlue'>Terms of Use</span> and <span className='font-bold text-stdBlue'>Privacy Policy.</span>
                                </p>
                            </div>
                            <button
                                type="submit"
                                className='text-white h-[40px] w-full md:w-[150px] max-w-[200px] rounded-full font-bold text-primaryFont bg-color1 mt-3 hover:bg-stdBlue shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105'>
                                Register
                            </button>

                        </form>
                    </div>
                </div>
            </div>

        </>

    );
}