import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterHotelList.css';

const RegisteredHotels = () => {
    const [hotels, setHotels] = useState([]);
    const [editingHotel, setEditingHotel] = useState(null);
    const [newName, setNewName] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [newLogo, setNewLogo] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/hotels/all`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setHotels(response.data.hotels);

                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                setIsAdmin(decodedToken.role === 'admin');
            } catch (error) {
                console.error('Error fetching hotels:', error);
                if (error.response && error.response.status === 401) {
                    alert('Unauthorized. Please log in again.');
                }
            }
        };
        fetchHotels();
    }, []);

    const handleEdit = (hotel) => {
        setEditingHotel(hotel);
        setNewName(hotel.name);
        setNewAddress(hotel.address);
        setNewLogo(null);
    };

    const handleSaveEdit = async () => {
        try {
            const formData = new FormData();
            formData.append('name', newName);
            formData.append('address', newAddress);
            if (newLogo) formData.append('logo', newLogo);

            const token = localStorage.getItem('token');
            await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/hotels/edit-hotel/${editingHotel._id}`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const updatedHotels = hotels.map((hotel) =>
                hotel._id === editingHotel._id ? { ...hotel, name: newName, address: newAddress } : hotel
            );
            setHotels(updatedHotels);
            setEditingHotel(null);
            setSuccessMessage('Hotel updated successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Error saving hotel details:', error);
            alert('Error saving hotel details.');
        }
    };

    const handleDelete = async (hotelId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/hotels/delete-hotel/${hotelId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setHotels(hotels.filter((hotel) => hotel._id !== hotelId));
        } catch (error) {
            console.error('Error deleting hotel:', error);
            alert('Error deleting hotel.');
        }
    };

    const handleQrCodeClick = (hotelId) => {
        navigate(`/admin-dashboard/admin-hotel/${hotelId}`);
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-header bg-primary text-white text-center py-4">
                    <h2>Registered Hotels</h2>
                </div>
                <div className="card-body">
                    {successMessage && (
                        <div className="alert alert-success text-center">{successMessage}</div>
                    )}
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th className="text-center">Logo</th>
                                    <th className="text-center">Hotel Name</th>
                                    <th className="text-center">Address</th>
                                    <th className="text-center">QR Code</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hotels.map((hotel) => (
                                    <tr key={hotel._id}>
                                        <td className="text-center">
                                            <img
                                                src={`${process.env.REACT_APP_API_BASE_URL}${hotel.logo}`}
                                                alt="Logo"
                                                className="img-thumbnail"
                                                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                            />
                                        </td>
                                        <td className="text-center">{hotel.name}</td>
                                        <td className="text-center">{hotel.address}</td>
                                        <td className="text-center">
                                            {hotel.qrCode && !isAdmin ? (
                                                <img
                                                    src={hotel.qrCode}
                                                    alt="QR Code"
                                                    className="img-fluid"
                                                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                                                    onClick={() => handleQrCodeClick(hotel._id)}
                                                />
                                            ) : (
                                                <span>No QR</span>
                                            )}
                                        </td>
                                        <td className="text-center">
                                            <button
                                                className="btn btn-warning btn-sm"
                                                onClick={() => handleEdit(hotel)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm ml-2"
                                                onClick={() => handleDelete(hotel._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {editingHotel && (
                <div
                    className="modal"
                    style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                    <div className="modal-content p-4 rounded shadow-lg" style={{ backgroundColor: '#f8f9fa' }}>
                        <h3 className="text-center mb-4">Edit Hotel</h3>
                        <form>
                            <div className="form-group mb-3">
                                <label>Hotel Name:</label>
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter hotel name"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Address:</label>
                                <input
                                    type="text"
                                    value={newAddress}
                                    onChange={(e) => setNewAddress(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter hotel address"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label>Logo:</label>
                                <input
                                    type="file"
                                    onChange={(e) => setNewLogo(e.target.files[0])}
                                    className="form-control"
                                />
                            </div>
                            <div className="d-flex justify-content-between">
                                <button
                                    type="button"
                                    onClick={handleSaveEdit}
                                    className="btn btn-success btn-block"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditingHotel(null)}
                                    className="btn btn-secondary btn-block"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegisteredHotels;
