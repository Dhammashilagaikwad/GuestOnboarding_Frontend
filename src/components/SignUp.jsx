import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "guest_admin", 
    });

    const [error, setError] = useState(""); 
    const [success, setSuccess] = useState(""); 
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); 
        setSuccess(""); 

        try {
            const response = await axios.post("http://localhost:5000/api/roles/signup", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true, 
            });

            setSuccess("Signup successful! Redirecting...");
            console.log("Signup Response:", response.data);

            
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (err) {
            console.error("Signup Error:", err.response?.data?.message || err.message);
            setError(err.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-12">
                    <div className="card shadow-lg p-4 rounded">
                        <h2 className="text-center mb-4 text-primary">Sign Up</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        {success && <div className="alert alert-success">{success}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Role</label>
                                <select
                                    name="role"
                                    className="form-select"
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="guest_admin">Guest Admin</option>
                                    <option value="main_admin">Main Admin</option>
                                </select>
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
                                Register
                            </button>
                        </form>
                        <div className="text-center mt-3">
                            <p>
                                Already have an account?{" "}
                                <a href="/login" className="text-primary fw-bold">
                                    Login
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
