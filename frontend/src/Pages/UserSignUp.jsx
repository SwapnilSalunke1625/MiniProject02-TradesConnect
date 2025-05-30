import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import bgImage from "../components/Assets/backgroundImage.png"

export default function UserSignUp() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        userType: 'user',
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
            <div className='flex items-center justify-center min-h-screen font-stdFont bg-stdBg p-5'>
                <div className=' rounded-2xl w-full max-w-[420px] h-auto md:h-[65%] text-center bg-white pb-5'>
                    <div id="logo" className='mt-3'>
                        <div className='text-secondaryFont font-bold text-left ml-2'>
                            <button className='bg-stdYellow p-0.5 rounded-l-md text-stdBlue'>Trade</button>
                            <button className='bg-stdBlue p-0.5 rounded-r-md text-stdYellow'>Connect</button>
                        </div>
                        <h1 className='text-3xl md:text-4xl font-bold text-stdBlue mt-2'>Registration</h1>
                    </div>
                    <div id="inputField" className='flex flex-col gap-3 items-center  text-secondaryFont mt-4'>
                        <input type="text" placeholder='Full Name' className='h-[40px]  w-full max-w-[300px] md:max-w-[330px] rounded-lg pl-3 outline-none  border-2 text-sm md:text-base' />
                        <input type="text" placeholder='Email' className='h-[40px]  w-full max-w-[300px] md:max-w-[330px] rounded-lg pl-3 outline-none  border-2 text-sm md:text-base' />
                        <div className='flex gap-1'>
                            <button className='bg-white h-[40px] w-[45px] rounded-l-lg  text-sm md:text-base border-2 outline-none'>+91</button>
                            <input type="phone" placeholder='Phone No' className='h-[40px] md:max-w-[180px] w-full max-w-[160px] rounded-r-lg pl-3 mr-4 text-sm md:text-base  border-2 outline-none' />
                            <input type="text" placeholder='Zip-code' className='md:max-w-[80px] w-full max-w-[70px] h-[40px] rounded-lg pl-1 text-sm md:text-base border-2 outline-none' />
                        </div>
                        <div className='flex gap-7'>
                            <>
                                <select name="" id="" className='h-[40px] w-full max-w-[135px] md:max-w-[150px] rounded-lg pl-3 text-sm md:text-base border-2 outline-none'>
                                    <option value="">State</option>
                                    <option value="">Maharashtra</option>
                                    <option value="">Karnataka</option>
                                    <option value="">Tamil Nadu</option>
                                    <option value="">Uttar Pradesh</option>
                                    <option value="">West Bengal</option>
                                </select>
                                <select
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className='h-[40px] max-w-[135px] w-full md:max-w-[150px] rounded-lg pl-3 text-sm md:text-base border-2 outline-none mb-2 ml-3'
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

                                

                                <input
                                    type="password"
                                    name="Confirm"
                                    // value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Confirm"
                                    className='h-[40px] w-full max-w-[300px] md:max-w-[320px] rounded-lg pl-3 outline-none border-2 text-sm md:text-base mb-2'
                                />

                                {error && <p className='text-red-500 text-xs'>{error}</p>}
                                <div className='flex items-center justify-center w-full mt-1'>
                                    <p className='text-xs md:text-sm text-center max-w-[300px]'>
                                        By signing up you agree to our <span className='font-bold text-stdBlue'>Terms of Use</span> and <span className='font-bold text-stdBlue'>Privacy Policy.</span>
                                    </p>
                                </div>
                                <button type="submit"className='text-white h-[40px] w-full md:w-[150px] max-w-[200px] rounded-full font-bold text-primaryFont bg-color1 mt-3 hover:bg-stdBlue shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105'>
                                    Register
                                </button>
                            </>
                        </div>
                    </div>

                </div>
            </div>



        </>
    );
}