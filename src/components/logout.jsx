import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LogoutPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                
                await axios.post(
                    `${process.env.REACT_APP_API_BASE_URL}/api/roles/logout`,
                    {},
                    {
                        withCredentials: true, 
                    }
                );

               
                localStorage.removeItem("token");
                localStorage.removeItem("isLoggedIn");

               
                navigate("/login");
            } catch (err) {
                console.error("Logout Error:", err.response?.data?.message || err.message);
            }
        };

        handleLogout();
    }, [navigate]);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 col-12 text-center">
                    <div className="card shadow-lg p-4 rounded">
                        <h2 className="text-primary">Logging Out...</h2>
                        <p className="text-muted">Please wait while we log you out.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
