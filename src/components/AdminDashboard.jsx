import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    
    navigate("/logout");
  };


  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary">Admin Dashboard</h2>

      <div className="text-center mb-4">
        <button
          onClick={() => navigate("/admin-dashboard/add-hotel")}
          className="btn btn-success mx-3"
          style={{
            borderRadius: "25px",
            fontSize: "1.2rem",
            padding: "15px 30px",
          }}
        >
          Add Hotel
        </button>
        <button
          onClick={() => navigate("/admin-dashboard/registered-hotels")}
          className="btn btn-info mx-3"
          style={{
            borderRadius: "25px",
            fontSize: "1.2rem",
            padding: "15px 30px",
          }}
        >
          Registered Hotels List
        </button>

        <button
          onClick={handleLogout}
          className="btn btn-danger mx-3"
          style={{
            borderRadius: "25px",
            fontSize: "1.2rem",
            padding: "15px 30px",
          }}
        >
          Logout
        </button>
      </div>

      <Outlet />
    </div>
  );
};

export default AdminDashboard;
