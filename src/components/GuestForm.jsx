import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const GuestForm = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    mobileNumber: '',
    address: '',
    purposeOfVisit: 'Business',
    stayFrom: '',
    stayTo: '',
    email: '',
    idProof: '',
  });

  const [hotelName, setHotelName] = useState('');

  
  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/hotels/${hotelId}`);
        setHotelName(response.data.hotel.name);
      } catch (error) {
        console.error('Error fetching hotel details:', error);
      }
    };

    fetchHotelDetails();
  }, [hotelId]);



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { fullName, mobileNumber, address, purposeOfVisit, stayFrom, stayTo, email, idProof } = form;
  
    const guestData = {
      hotelId,
      fullName,
      mobileNumber,
      address,
      purposeOfVisit,
      stayFrom,
      stayTo,
      email,
      idProof,
    };
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/guests/guest-details`, guestData);
      console.log('Guest added successfully:', response.data);
      navigate('/thank-you');
    } catch (error) {
      console.error('Error adding guest:', error.response?.data || error.message);
    }
  };
  
  

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 ">
      <div className="bg-white shadow rounded p-4 w-100" style={{ maxWidth: '500px' }}>
        <h2 className="text-center mb-4">
          <span
            className="d-block fw-bold text-primary"
            style={{
              fontSize: '1.8rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
            }}
          >
            Guest Form 
          </span>
          <span
            className="d-block text-muted"
            style={{
              fontSize: '1.4rem',
              fontStyle: 'italic',
            }}
          >
            for "{hotelName || 'Loading...'} "
          </span>
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              required
            />
          </div>
          {/* Mobile Number */}
          <div className="mb-3">
            <label className="form-label">Mobile Number</label>
            <input
              type="text"
              className="form-control"
              value={form.mobileNumber}
              onChange={(e) => setForm({ ...form, mobileNumber: e.target.value })}
              required
            />
          </div>
          {/* Address */}
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              required
            />
          </div>
          {/* Purpose of Visit */}
          <div className="mb-3">
            <label className="form-label">Purpose of Visit</label>
            <select
              className="form-select"
              value={form.purposeOfVisit}
              onChange={(e) => setForm({ ...form, purposeOfVisit: e.target.value })}
              required
            >
              <option value="Business">Business</option>
              <option value="Personal">Personal</option>
              <option value="Tourist">Tourist</option>
            </select>
          </div>
          {/* Stay Dates */}
          <div className="mb-3">
            <label className="form-label">Stay From</label>
            <input
              type="date"
              className="form-control"
              value={form.stayFrom}
              onChange={(e) => setForm({ ...form, stayFrom: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Stay To</label>
            <input
              type="date"
              className="form-control"
              value={form.stayTo}
              onChange={(e) => setForm({ ...form, stayTo: e.target.value })}
              required
            />
          </div>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email ID</label>
            <input
              type="email"
              className="form-control"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          {/* ID Proof Number */}
          <div className="mb-3">
            <label className="form-label">ID Proof Number</label>
            <input
              type="text"
              className="form-control"
              value={form.idProof}
              onChange={(e) => setForm({ ...form, idProof: e.target.value })}
              required
            />
          </div>
          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default GuestForm;
