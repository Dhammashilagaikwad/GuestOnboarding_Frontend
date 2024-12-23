import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddHotelForm = ({ hotels = [], setHotels = () => {} }) => {
    const [hotel, setHotel] = useState({ name: '', address: '', logo: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const addHotel = async () => {
        if (!hotel.name || !hotel.address || !hotel.logo) {
            alert('All fields are required.');
            return;
        }

        if (!['image/jpeg', 'image/png', 'image/webp'].includes(hotel.logo.type)) {
            alert('Only JPG, PNG, and WEBP files are allowed for the logo.');
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', hotel.name);
            formData.append('address', hotel.address);
            formData.append('logo', hotel.logo);

            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/hotels/add`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );

            if (setHotels) {
                setHotels((prevHotels) => [...(prevHotels || []), response.data.hotel]);
            }

            alert('Hotel added successfully!');
            setHotel({ name: '', address: '', logo: '' });
            document.querySelector('input[type="file"]').value = '';
            navigate('/admin-dashboard/registered-hotels');
        } catch (error) {
            console.error('Error adding hotel:', error);
            alert(error.response?.data?.message || 'Failed to add hotel. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '500px' }}>
                <h2 className="text-center mb-4">Add a New Hotel</h2>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Hotel Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={hotel.name}
                            onChange={(e) => setHotel({ ...hotel, name: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            value={hotel.address}
                            onChange={(e) => setHotel({ ...hotel, address: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Logo</label>
                        <input
                            type="file"
                            className="form-control"
                            onChange={(e) =>
                                setHotel({ ...hotel, logo: e.target.files[0] })
                            }
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary w-100"
                        onClick={addHotel}
                        disabled={loading}
                    >
                        {loading ? 'Adding...' : 'Add Hotel'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddHotelForm;
