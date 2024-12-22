import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import '../styles/Header.css'; 

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="navbar-container">
            <nav className="navbar navbar-expand-lg navbar-light px-3">
                <div className="container-fluid">
                    {/* Logo */}
                    <span className="navbar-brand fs-3 fw-bold text-primary">
                        Tour Guide
                    </span>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Navigation Links */}
                    <div
                        className={`collapse navbar-collapse ${
                            isMenuOpen ? "show" : ""
                        }`}
                    >
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-center">
                            <li className="nav-item mx-2">
                                <NavLink to="/" className="nav-link">
                                    <button
                                        className="btn btn-outline-primary fw-bold px-4 py-2"
                                    >
                                        Home
                                    </button>
                                </NavLink>
                            </li>

                            {/* Sign Up Button */}
                            <li className="nav-item mx-2">
                                <NavLink to="/signup" className="nav-link">
                                    <button
                                        className="btn btn-outline-primary fw-bold px-4 py-2"
                                    >
                                        Sign Up
                                    </button>
                                </NavLink>
                            </li>

                            {/* Login Button */}
                            <li className="nav-item mx-2">
                                <NavLink to="/login" className="nav-link">
                                    <button
                                        className="btn btn-outline-primary fw-bold px-4 py-2"
                                    >
                                        Login
                                    </button>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
