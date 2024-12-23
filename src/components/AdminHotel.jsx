import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AdminHotel = () => {
    const { hotelId } = useParams(); 
    const [hotel, setHotel] = useState(null);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const fetchHotelDetails = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/hotels/${hotelId}`);
                setHotel(response.data.hotel); 
            } catch (error) {
                console.error('Error fetching hotel details:', error);
            }
        };

        fetchHotelDetails();
    }, [hotelId]); 

    if (!hotel) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        ); 
    }

    return (
        <div className="container my-5">

             {/* Button to go back to Admin Dashboard */}
             <button 
                className="btn btn-secondary mt-4"
                onClick={() => navigate('/admin-dashboard')} // Navigate to Admin Dashboard
            >
                Back to Admin Dashboard
            </button>
            
            {/* Header Section */}
            <div
                className="text-white text-center p-5 rounded shadow"
                style={{
                    backgroundImage: `url(${process.env.REACT_APP_API_BASE_URL}${hotel.coverImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <h1 className="display-4 fw-bold">{hotel.name}</h1>
                <p className="fs-5">{hotel.tagline || 'A perfect stay awaits you!'}</p>
            </div>

            {/* Details Section */}
            <div className="row mt-5 gy-4">
                <div className="col-lg-6">
                    <div className="card shadow-sm border-0">
                        <img
                            src={`${process.env.REACT_APP_API_BASE_URL}${hotel.logo}`}
                            alt={hotel.name}
                            className="card-img-top"
                            style={{ height: '300px', objectFit: 'cover' }}
                        />
                        <div className="card-body">
                            <h3 className="card-title text-primary">{hotel.name}</h3>
                            <p className="card-text">{hotel.description}</p>
                            <p className="text-muted">
                                <i className="bi bi-geo-alt-fill"></i> {hotel.address}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

           
        </div>
    );
};

export default AdminHotel;
