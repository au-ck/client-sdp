import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterDonor = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    city: ''          // ← SIMPLE TEXT FIELD NOW
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.city.trim()) {
      alert("Please enter your city");
      return;
    }

    try {
      const payload = {
        ...formData,
        city: { name: formData.city }   // backend expects city object → sending name
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/register-donor`,
        payload
      );

      localStorage.setItem('userId', response.data.id);
      alert('Registration successful!');
      navigate('/donor/dashboard');

    } catch (error) {
      alert('Registration failed: ' + error.response?.data);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register as Donor</h2>

      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light" style={{ maxWidth: '600px', margin: 'auto' }}>

        <div className="mb-3">
          <label>Name</label>
          <input 
            type="text" 
            className="form-control" 
            value={formData.name} 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required 
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input 
            type="email" 
            className="form-control" 
            value={formData.email} 
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required 
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input 
            type="password" 
            className="form-control" 
            value={formData.password} 
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required 
          />
        </div>

        <div className="mb-3">
          <label>Phone</label>
          <input 
            type="tel" 
            className="form-control" 
            value={formData.phone} 
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required 
          />
        </div>

        <div className="mb-3">
          <label>Address</label>
          <textarea 
            className="form-control" 
            value={formData.address} 
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required 
          />
        </div>

        {/* SIMPLE TEXT CITY FIELD */}
        <div className="mb-3">
          <label>City</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
};

export default RegisterDonor;
