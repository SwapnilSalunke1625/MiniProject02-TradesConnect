import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import checkLogin from '../utils/checkLogin';

export default function LandingPageUser() {
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [serviceProviders, setServiceProviders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            checkLogin(navigate);

            try {
                const token = Cookies.get('accessToken');
                const response = await axios.get('/api/v1/users/current-user', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                });
                if (response.status === 200) {
                    const user = response.data.data;
                    setUserName(user.fullName);
                    fetchServiceProviders(user.city);
                } else {
                    throw new Error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        const fetchServiceProviders = async (city) => {
            try {
                const response = await axios.get(`/api/v1/service-providers/get-by-city?city=${city}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (response.status === 200) {
                    setServiceProviders(response.data.data);
                } else {
                    throw new Error('Failed to fetch service providers');
                }
            } catch (error) {
                console.error('Error fetching service providers:', error);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.get(`/api/v1/search?query=${searchQuery}`);
            setSearchResults(response.data.results);
        } catch (error) {
            console.error('Error performing search:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-center text-lg">Loading...</div>;
    }

    const getInitials = (name) => {
        const names = name.split(' ');
        const initials = names.map(n => n[0]).join('');
        return initials.toUpperCase();
    };

    const getGradient = () => {
        const gradients = [
            'bg-gradient-to-r from-gray-700 to-gray-900',
            'bg-gradient-to-r from-indigo-500 to-purple-700',
            'bg-gradient-to-r from-green-400 to-blue-600', 
            'bg-gradient-to-r from-yellow-400 to-red-500', 
            'bg-gradient-to-r from-pink-500 to-rose-700', 
            'bg-gradient-to-r from-teal-400 to-cyan-600',
            'bg-gradient-to-r from-orange-400 to-yellow-600', 
        ];
        return gradients[Math.floor(Math.random() * gradients.length)];
    };
    

    const getGradient2 = () => {
        const gradients = [
            'bg-gradient-to-r from-yellow-400 to-blue-500',      
            'bg-gradient-to-r from-orange-500 to-pink-600',      
            'bg-gradient-to-r from-teal-500 to-green-400',       
            'bg-gradient-to-r from-purple-600 to-indigo-500',   
            'bg-gradient-to-r from-red-400 to-yellow-500',    
            'bg-gradient-to-r from-cyan-500 to-blue-600',      
            'bg-gradient-to-r from-gray-300 to-gray-500',       
        ];
        return gradients[Math.floor(Math.random() * gradients.length)];
    };

    return (
        <>
        <div className='bg-stdBg'>
            <div className=' flex flex-col gap-6 items-center justify-center min-h-screen font-stdFont p-4'>
                {/* Main Container */}
                <div className="max-w-7xl w-full flex flex-col items-center">

                    {/* Welcome Section */}
                    <div className="rounded-tl-2xl rounded-2xl w-full md:h-[160px] h-[300px] text-center bg-white p-2 shadow-lg max-w-3xl mx-auto">
                        <h1 className='text-3xl font-bold text-stdYellow'>Welcome, {userName}!</h1>

                        <form onSubmit={handleSearchSubmit} className='mt-8 flex items-center justify-center'>
                            <div className='relative w-full max-w-[500px]'>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchInputChange}
                                    placeholder="Enter your services you want"
                                    className='w-full h-[50px] p-3 pl-10 border border-gray-300 rounded-l-full shadow-md transition duration-200 focus:outline-none focus:ring-1 focus:ring-stdBlue'
                                />
                            </div>
                            <button
                                type="submit"
                                className=' h-[50px] bg-stdBlue rounded-r-full  w-[50px] font-bold text-white shadow-md hover:bg-stdYellow transition duration-200'
                            >
                                <i className="fas fa-search"></i> {/* Search icon in button */}
                            </button>
                        </form>

                        {searchResults.length > 0 && (
                            <div className='mt-6'>
                                <h2 className='text-3xl font-bold'>Search Results:</h2>
                                <ul className='mt-4 space-y-2'>
                                    {searchResults.map((result, index) => (
                                        <li key={index} className='text-lg text-left'>{result}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Service Providers Section */}
                    <h2 className='text-3xl font-bold text-stdBlue m-2'>Service Providers in Your City:</h2>
                    <ul className='grid grid-cols-1 md:grid-cols-4 gap-10 mt-8'>
                        {serviceProviders.map((provider, index) => (
                            <li key={index} className='w-full bg-white rounded-lg hover:shadow-xl '>
                                <div className=' p-6 transition'>
                                    {
                                        provider.coverImage ? (
                                            <img
                                                src={provider.coverImage}
                                                alt={`${provider.fullName}'s cover`}
                                                className='cover-image h-32 w-full rounded-t-md object-cover'
                                            />
                                        ) : (
                                            <div className={`cover-image h-32 w-full ${getGradient2()} rounded-t-md`}></div>
                                        )
                                    }
                                    {provider.avatar ? (
                                        <img
                                            src={provider.avatar}
                                            alt={`${provider.fullName}'s avatar`}
                                            className='w-28 h-28 rounded-full mx-auto mt-[-4rem] border-4 border-white'
                                        />
                                    ) : (
                                        <div className={`avatar w-28 h-28 rounded-full mx-auto mt-[-4rem] border-4 border-white flex items-center justify-center text-white text-3xl font-bold ${getGradient()}`}>
                                            {getInitials(provider.fullName || '')}
                                        </div>
                                    )}
                                    <div className='mt-6'>
                                        <h3 className=' text-2xl font-semibold'>{provider.fullName}</h3>
                                        <p className='text-lg'>{provider.businessName}</p>
                                        <p className='text-sm text-gray-600'>{provider.email}</p>
                                        <div className='flex gap-6 mt-4 justify-center'>
                                            <Link to={`/${provider._id}/profile`}>
                                                <button className='bg-stdBlue text-white px-6 py-2 rounded-md hover:bg-black hover:text-white transition'>
                                                    Profile
                                                </button>
                                            </Link>
                                            <Link to={`/${provider._id}/message`}>
                                                <button className='bg-stdYellow text-white px-6 py-2 rounded-md hover:bg-black hover:text-white transition'>
                                                    Message
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        </>
    );
}