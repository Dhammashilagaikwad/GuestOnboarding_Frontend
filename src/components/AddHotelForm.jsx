import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddHotelForm = ({ hotels = [], setHotels = () => {} }) => {
    const [hotel, setHotel] = useState({ name: '', address: '', logo: '' });
    const navigate = useNavigate();

    const addHotel = async () => {
        try {
            const formData = new FormData();
            formData.append('name', hotel.name);
            formData.append('address', hotel.address);
            formData.append('logo', hotel.logo);

            const token = localStorage.getItem('token');
            console.log('Form Data:', formData);
            const response = await axios.post(
                (`${process.env.REACT_APP_API_BASE_URL}/api/hotels/add`),
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );

            console.log('Hotel added successfully:', response.data);

            if (setHotels) {
                setHotels((prevHotels) => [...(prevHotels || []), response.data.hotel]);
            }

            setHotel({ name: '', address: '', logo: '' });
            navigate('/admin-dashboard/registered-hotels');
        } catch (error) {
            console.error('Error adding hotel:', error);
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
                    >
                        Add Hotel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddHotelForm;
