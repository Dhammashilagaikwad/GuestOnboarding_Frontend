import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import "../styles/GuestAdminDashboard.css";

const GuestAdminDashboard = () => {
  const [guests, setGuests] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [viewGuest, setViewGuest] = useState(null);
  const [editGuest, setEditGuest] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized access. No token found.");
      setLoading(false);
      return;
    }

    axios
      .get(`https://guest-onboarding-gilt.vercel.app/api/guests/getAllGuests`, { withCredentials: true } ,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const fetchedGuests = response.data.data || [];
        setGuests(fetchedGuests);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load guest details.");
        setLoading(false);
      });
  }, []);

  const handleViewClick = (guest) => {
    setViewGuest(guest);
  };

  const handleEditClick = (guest) => {
    setEditGuest(guest);
    setUpdatedDetails({
      hotelName: guest.hotelName || "",
      fullName: guest.fullName || "",
      email: guest.email || "",
      mobileNumber: guest.mobileNumber || "",
      stayFrom: guest.stayFrom ? new Date(guest.stayFrom).toISOString().split("T")[0] : "",
      stayTo: guest.stayTo ? new Date(guest.stayTo).toISOString().split("T")[0] : "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails({ ...updatedDetails, [name]: value });
  };

  const handleEditSubmit = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized access. No token found.");
      return;
    }

    axios
      .put(
        `${process.env.REACT_APP_API_BASE_URL}/api/guests/updateGuest/${editGuest._id}`,
        updatedDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        alert("Guest details updated successfully!");
        setGuests((prevGuests) =>
          prevGuests.map((guest) =>
            guest._id === editGuest._id ? { ...guest, ...updatedDetails } : guest
          )
        );
        setEditGuest(null);
      })
      .catch((err) => {
        alert("Failed to update guest details.");
      });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    navigate("/logout"); 
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Guest Admin Dashboard</h2>
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </div>

      {error && (
        <div className="alert text-center">
          <strong>Error: </strong>{error}
        </div>
      )}

      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Hotel Name</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Stay From</th>
              <th>Stay To</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {guests.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">No guests found.</td>
              </tr>
            ) : (
              guests.map((guest) => (
                <tr key={guest._id}>
                  <td>{guest.hotelName || "N/A"}</td>
                  <td>{guest.fullName || "N/A"}</td>
                  <td>{guest.email || "N/A"}</td>
                  <td>{guest.mobileNumber || "N/A"}</td>
                  <td>{guest.stayFrom ? new Date(guest.stayFrom).toLocaleDateString() : "N/A"}</td>
                  <td>{guest.stayTo ? new Date(guest.stayTo).toLocaleDateString() : "N/A"}</td>
                  <td className="text-center">
                    <button
                      className="action-button view"
                      onClick={() => handleViewClick(guest)}
                    >
                      <FaEye /> View
                    </button>
                    <button
                      className="action-button edit"
                      onClick={() => handleEditClick(guest)}
                    >
                      <FaEdit /> Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {viewGuest && (
        <div className="modal">
          <div className="modal-content">
            <h4>Guest Details</h4>
            <p><strong>Full Name:</strong> {viewGuest.fullName || "N/A"}</p>
            <p><strong>Email:</strong> {viewGuest.email || "N/A"}</p>
            <p><strong>Phone:</strong> {viewGuest.mobileNumber || "N/A"}</p>
            <p><strong>Hotel Name:</strong> {viewGuest.hotelName || "N/A"}</p>
            <p><strong>Stay From:</strong> {viewGuest.stayFrom ? new Date(viewGuest.stayFrom).toLocaleDateString() : "N/A"}</p>
            <p><strong>Stay To:</strong> {viewGuest.stayTo ? new Date(viewGuest.stayTo).toLocaleDateString() : "N/A"}</p>
            <button onClick={handlePrint} className="btn btn-primary">Print</button>
            <button onClick={() => setViewGuest(null)} className="btn btn-secondary">Close</button>
          </div>
        </div>
      )}

      {editGuest && (
        <div className="modal">
          <div className="modal-content">
            <h4>Edit Guest</h4>
            <div className="form-group">
              <label>Hotel Name</label>
              <input
                type="text"
                name="hotelName"
                value={updatedDetails.hotelName}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={updatedDetails.fullName}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={updatedDetails.email}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="text"
                name="mobileNumber"
                value={updatedDetails.mobileNumber}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Stay From</label>
              <input
                type="date"
                name="stayFrom"
                value={updatedDetails.stayFrom}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Stay To</label>
              <input
                type="date"
                name="stayTo"
                value={updatedDetails.stayTo}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <button onClick={handleEditSubmit} className="btn btn-success">Save</button>
            <button onClick={() => setEditGuest(null)} className="btn btn-secondary">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestAdminDashboard;
