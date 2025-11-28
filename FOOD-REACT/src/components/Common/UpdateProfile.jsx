import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', city: { id: '' } });
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/cities`).then(res => setCities(res.data));
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`)
      .then(res => {
        setFormData({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
          address: res.data.address,
          city: res.data.city || { id: '' }
        });
        setSearchTerm(res.data.city ? `${res.data.city.name}, ${res.data.city.state.name}` : '');
      });
  }, [id]);

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.state.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCitySelect = (city) => {
    setFormData({ ...formData, city: { id: city.id } });
    setSearchTerm(city.name + ', ' + city.state.name);
    setShowDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.city.id) {
      alert('Please select a city');
      return;
    }
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`, formData);
      alert('Profile updated!');
      navigate('/admin/reg-donors');
    } catch (error) {
      alert('Update failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light" style={{ maxWidth: '600px', margin: 'auto' }}>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" className="form-control" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label>Phone</label>
          <input type="tel" className="form-control" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label>Address</label>
          <textarea className="form-control" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} required />
        </div>
        {/* Searchable City Dropdown */}
        <div className="mb-3">
          <label>City (Search & Select)</label>
          <div className="position-relative">
            <input 
              type="text" 
              className="form-control" 
              value={searchTerm} 
              onChange={(e) => { setSearchTerm(e.target.value); setShowDropdown(true); }} 
              placeholder="Search city or state..." 
              onFocus={() => setShowDropdown(true)}
              required 
            />
            {showDropdown && searchTerm && filteredCities.length > 0 && (
              <ul className="list-group position-absolute w-100" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}>
                {filteredCities.slice(0, 10).map(city => (
                  <li key={city.id} className="list-group-item list-group-item-action" onClick={() => handleCitySelect(city)}>
                    {city.name}, {city.state.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <button type="submit" className="btn btn-success w-100">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;