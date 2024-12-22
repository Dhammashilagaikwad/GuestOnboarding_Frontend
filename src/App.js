import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SignUp from './components/SignUp';
import LoginPage from './components/LoginPage';
import LogoutPage from './components/logout.jsx';
import AddHotelForm from './components/AddHotelForm';
import RegisteredHotels from './components/RegisterdHotelList';
import AdminHotel from './components/AdminHotel';
import GuestAdminDashboard from './components/GuestAdminDashboard.jsx';
import AdminDashboard from './components/AdminDashboard';
import HotelDetailsPage from './components/HotelDetailsPage';
import Home from './components/Home';
import Header from './components/Header';
import ThankYou from './components/ThankYou';
import Footer from './components/Footer';

const App = () => {
  const [hotels, setHotels] = useState([]);

  const location = useLocation();

  
  const excludedPaths = [
    '/admin-dashboard',
    '/admin-dashboard/add-hotel',
    '/admin-dashboard/registered-hotels',
    '/guest-admin-dashboard',
  ];

  return (
    <>
    
      {!excludedPaths.some((path) => location.pathname.startsWith(path)) && <Header />}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />}>
            <Route path="add-hotel" element={<AddHotelForm />} />
            <Route path="registered-hotels" element={<RegisteredHotels />} />
          </Route>
          <Route path="/admin-dashboard/admin-hotel/:hotelId" element={<AdminHotel />} />
          <Route path="/guest-admin-dashboard" element={<GuestAdminDashboard />} />
          <Route path="/hotel/:hotelId" element={<HotelDetailsPage />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
