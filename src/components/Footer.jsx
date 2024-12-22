import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Footer.css'; 

const Footer = () => {
    return (
        <footer className="footer bg-dark text-white py-4 mt-5">
            <div className="container text-center">
                <p>&copy; 2024 Tour Guide. All rights reserved.</p>
                <div className="social-links">
                <NavLink to="/" className="text-white mx-3">Home</NavLink>
                    <NavLink to="/" className="text-white mx-3">About</NavLink>
                    <NavLink to="/" className="text-white mx-3">Contact</NavLink>
                    <NavLink to="/" className="text-white mx-3">Privacy Policy</NavLink>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
