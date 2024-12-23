import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 
    const [success, setSuccess] = useState(""); 
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(""); 

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/roles/login`, 
                { email, password }, 
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true, 
                }
            );

            
            setSuccess("Login successful! Redirecting...");
            console.log("Login Response:", response.data);

           
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("isLoggedIn", "true"); 
           
            const userRole = response.data.role; 

            if (userRole === "main_admin") {
                
                setTimeout(() => {
                    navigate("/admin-dashboard"); 
                }, 1500);
            } else if (userRole === "guest_admin") {
               
                setTimeout(() => {
                    navigate(`/guest-admin-dashboard`);
                   
                }, 1500);
            } else {
                setError("User role not recognized.");
            }
        } catch (err) {
            console.error("Login Error:", err.response?.data?.message || err.message);
            setError(err.response?.data?.message || "Invalid email or password.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-12">
                    <div className="card shadow-lg p-4 rounded">
                        <h2 className="text-center mb-4 text-primary">Login</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        {success && <div className="alert alert-success">{success}</div>}

                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary w-100 py-2 mt-3"
                                style={{
                                    borderRadius: "25px",
                                    fontSize: "1.1rem",
                                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                Login
                            </button>
                        </form>

                        <div className="text-center mt-3">
                            <p>
                                Don't have an account?{" "}
                                <a href="/signup" className="text-primary fw-bold">
                                    Sign Up
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
