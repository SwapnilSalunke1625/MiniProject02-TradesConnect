import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import SevaSetuLogo from "../components/Assets/SevaSetuLogo.png";
import { FiMenu } from 'react-icons/fi';
import LoadingBar from 'react-top-loading-bar';

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();
  const loadingBarRef = useRef(null);

  useEffect(() => {
    loadingBarRef.current?.continuousStart();
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/v1/users/current-user', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('accessToken')}`,
          },
        });
        if (response.status === 200) {
          setIsAuthenticated(true);
          setUserType(response.data.data.userType);
          setUserId(response.data.data._id);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUserType('unauthorized');
      } finally {
        loadingBarRef.current?.complete();
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    loadingBarRef.current?.continuousStart();
    try {
      const token = Cookies.get('accessToken');
      await axios.post('/api/v1/users/logout', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      Cookies.set('accessToken', '', { expires: 0 });
      setIsAuthenticated(false);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      loadingBarRef.current?.complete();
    }
  };

  const getHomeLink = () => {
    switch (userType) {
      case 'user':
        return '/home';
      case 'serviceProvider':
        return '/dashboard';
      case 'admin':
        return '/dashboard-admin';
      default:
        return '/';
    }
  };

  return (
    <>
      <nav className='flex justify-between items-center h-[70px] border-b-2 px-5 w-full font-stdFont bg-white shadow-md relative'>
        <Link to={getHomeLink()}>
          <div className="flex ml-5" id='Logo'>
            <img src={SevaSetuLogo} alt="Logo" className='h-[65px] outline-none border-none' />
          </div>
        </Link>

        <div className="flex items-center space-x-8">
          {isAuthenticated ? (
            <>
              {userType === 'user' && (
                <>
                  <NavLink to="/home" className={({ isActive }) => `text-[18px] font-semibold transition ${isActive ? 'underline' : ''}`}>Home</NavLink>
                  <NavLink to="/my-bookings" className={({ isActive }) => `text-[18px] font-semibold transition ${isActive ? 'underline' : ''}`}>My Bookings</NavLink>
                  <NavLink to="/chat" className={({ isActive }) => `text-[18px] font-semibold transition ${isActive ? 'underline' : ''}`}>Chat</NavLink>
                </>
              )}
              {userType === 'serviceProvider' && (
                <>
                  <NavLink to="/dashboard" className={({ isActive }) => `text-[18px] font-semibold transition ${isActive ? 'underline' : ''}`}>Dashboard</NavLink>
                  <NavLink to="/my-jobs" className={({ isActive }) => `text-[18px] font-semibold transition ${isActive ? 'underline' : ''}`}>My Jobs</NavLink>
                  <NavLink to="/chat" className={({ isActive }) => `text-[18px] font-semibold transition ${isActive ? 'underline' : ''}`}>Chat</NavLink>
                </>
              )}
              {userType === 'admin' && (
                <>
                  <NavLink to="/dashboard-admin" className={({ isActive }) => `text-[18px] font-semibold transition ${isActive ? 'underline' : ''}`}>Admin Dashboard</NavLink>
                  <NavLink to="/manage-users" className={({ isActive }) => `text-[18px] font-semibold transition ${isActive ? 'underline' : ''}`}>Manage Users</NavLink>
                  <NavLink to="/manage-services" className={({ isActive }) => `text-[18px] font-semibold transition ${isActive ? 'underline' : ''}`}>Manage Services</NavLink>
                </>
              )}
              <Link to={`/account/${userId}`}>
                <button className='text-sm font-semibold p-2 bg-stdYellow text-white rounded-lg hover:bg-yellow hover:text-white transition'>
                  Account
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className='text-sm font-semibold p-2 bg-stdBlue text-white rounded-lg'
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <div className='flex md:gap-8 gap-4  items-center '>
                <NavLink to="/services" className={({ isActive }) => `text-lg font-semibold transition ${isActive ? 'underline' : ''} hidden md:block`}>Service</NavLink>
                <NavLink to="/signup-w">
                  <button className='text-lg font-semibold p-2 text-stdBlue hover:text-stdYellow transition hidden md:block'>
                    Become a Pro
                  </button>
                </NavLink>
                <NavLink to="/signlog">
                  <button className='text-lg font-semibold h-[40px] w-[100px] bg-stdBlue text-white rounded-full hover:bg-color1 shadow-md hover:shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hidden md:block'>
                    Sign Up
                  </button>
                </NavLink>
                <FiMenu size={30} className="md:hidden" />
              </div>
            </>
          )}
        </div>
        
        <LoadingBar
          ref={loadingBarRef}
          height={4}
          color='#FF3D00'
          style={{ position: 'absolute', top: '70px', left: 0, right: 0 }}
        />
      </nav>
    </>
  );
}
