import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {
  const [formData, setFormData] = useState({ email: '', newPassword: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`${import.meta.env.VITE_BACKEND_URL}/users/update-password`, formData)
      .then(() => alert('Password updated'));
  };

  return (
    <div className="container mt-5">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label>New Password</label>
          <input type="password" className="form-control" value={formData.newPassword} onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })} required />
        </div>
        <button type="submit" className="btn btn-success">Update</button>
      </form>
    </div>
  );
};

export default ChangePassword;