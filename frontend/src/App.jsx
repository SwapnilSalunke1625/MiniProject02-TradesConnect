import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer.jsx';
import UserSignUp from './Pages/UserSignUp';
import SignLog from './Pages/SignLog';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import Services from './Pages/Services';
import SearchService from './Pages/ServiceSearch.jsx';
import LandingPageUser from './Pages/LandingPageUser';
import UserProfile from './Pages/UserProfile';
import ChatPage from './Pages/ChatPage';
import MyBookings from './Pages/MyBookings';
import WorkerSignUp from './Pages/WorkerSignUp';
import ServiceProviderProfile from './Pages/serviceProviderProfile';
import LandingPageSP from './Pages/LandingPageSP';
import LandingPageAdmin from './Pages/LandingPageAdmin';
import EditServiceProfile from './Pages/EditProfile';
import BookJob from "./Pages/BookJob.jsx";
import SPJobs from './Pages/sp-jobs.jsx';
import UserDashboard from './Pages/UserDashboard';
import ProfileAdmin from './Pages/ProfileAdmin.jsx';
import BookingPage from './Pages/BookingPage.jsx';


function App() {
    const location = useLocation();
    const noFooterRoutes = ["/login", "/signup", "/signup-w", "/signlog"];
    const showFooter = !noFooterRoutes.includes(location.pathname);

    return (
        <div>
            <Navbar />
            <Routes>
                {/* Before Login Links */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<UserSignUp />} />
                <Route path="/signlog" element={<SignLog />} />
                <Route path="/services" element={<Services />} />
                <Route path="/signup-w" element={<WorkerSignUp />} />

                {/* After Login Routes */}
                <Route path="/home" element={<LandingPageUser />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/my-bookings" element={<MyBookings />} />
                <Route path="/:id/profile" element={<ServiceProviderProfile />} />
                <Route path="/dashboard" element={<LandingPageSP />} />
                <Route path="/dashboard-admin" element={<LandingPageAdmin />} />
                <Route path="/account/:id" element={<EditServiceProfile />} />
                <Route path="/book/:id" element={<BookJob />} />
                <Route path="/my-jobs" element={<SPJobs />} />
                <Route path="/SearchService" element={<SearchService />} />
                <Route path='/UserProfile' element={<UserProfile />} />
                <Route path='/ProfileAdmin' element={<ProfileAdmin />} />
                <Route path='/BookingPage' element={<BookingPage />} />
            </Routes>

            {/* Conditionally render Footer */}

            {showFooter && <Footer />}

        </div>
    );
}

export default App;