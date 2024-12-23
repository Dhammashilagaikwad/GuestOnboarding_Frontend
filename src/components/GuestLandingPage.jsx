import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import '../styles/GuestLandingPage.css';

const GuestLandingPage = () => {
    const [hotels, setHotels] = useState([]); 

    
    useEffect(() => {
        const fetchHotels = async () => {
            try {
              
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/hotels/guest-all`);
                setHotels(response.data.hotels || []); 
            } catch (error) {
                console.error('Error fetching hotels:', error);
            }
        };

        fetchHotels(); 
    }, []); 

    const handleQrCodeClick = () => {
        
        localStorage.setItem('cameFromQRCode', 'true');
    };

    return (
        <div className="container mt-5">
            
    <h2 className="tagline">"Stay in Style, Relax in Comfort – Your Perfect Hotel Awaits"</h2>

            <div className="row justify-content-center">
                {hotels.map((hotel) => (
                    <div className="col-md-4 mb-4" key={hotel._id}>
                        <div className="card shadow-lg rounded-lg overflow-hidden hotel-card">
                            <div className="hotel-logo-container">
                                <img
                                    src={`${process.env.REACT_APP_API_BASE_URL}${hotel.logo}`}
                                    alt="Hotel Logo"
                                    className="hotel-logo"
                                />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title text-center text-dark font-weight-bold mb-3">{hotel.name}</h5>
                                <p className="card-text text-center text-muted">{hotel.address}</p>
                                <div className="text-center mt-3">
                                   
                                    <Link 
                                        to={`/hotel/${hotel._id}`} 
                                        className="qr-code-link" 
                                        onClick={handleQrCodeClick} 
                                    >
                                        <img
                                            src={hotel.qrCode}
                                            alt="QR Code"
                                            className="border"
                                            style={{ width: '120px', height: '120px', borderColor: '#007bff' }}
                                        />
                                    </Link>
                                </div>
                            </div>
                            <div className="card-footer text-center">
                                <a href={`/hotel/${hotel._id}`} className="btn btn-primary btn-sm view-details-btn">
                                    View Details
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GuestLandingPage;
