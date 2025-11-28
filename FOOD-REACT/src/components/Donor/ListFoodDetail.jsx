import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListFoodDetail = () => {
  const [formData, setFormData] = useState({
    foodType: '',
    description: '',
    quantity: '',
    expiryDate: ''
  });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const donorId = localStorage.getItem('userId');
    if (!donorId) {
      alert('Please login as donor');
      navigate('/login');
      return;
    }

    const data = new FormData();
    data.append('foodType', formData.foodType);
    data.append('description', formData.description);
    data.append('quantity', formData.quantity);
    data.append('expiryDate', formData.expiryDate);
    data.append('donorId', donorId);
    if (image) data.append('file', image);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/food-items`,
        data,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      alert('Food listed successfully! Now visible to everyone');
      navigate('/food-available');
    } catch (err) {
      alert('Upload failed. Check console.');
      console.error(err);
    }
  };

  const styles = {
    container: {
      maxWidth: '720px',
      margin: '40px auto',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#2e2e2e',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '16px',
      boxShadow: '0 6px 20px rgba(52, 105, 154, 0.1)',
      padding: '40px 36px',
    },
    header: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#34699a',
      textAlign: 'center',
      marginBottom: '32px',
    },
    formGroup: {
      marginBottom: '24px',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '700',
      fontSize: '1.1rem',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '12px 14px',
      fontSize: '1rem',
      borderRadius: '8px',
      border: '1.8px solid #ced4da',
      outline: 'none',
      transition: 'border-color 0.3s',
      boxSizing: 'border-box',
    },
    inputFocus: {
      borderColor: '#34699a',
      boxShadow: '0 0 8px rgba(52,105,154,0.5)',
    },
    row: {
      display: 'flex',
      gap: '20px',
      flexWrap: 'wrap',
    },
    colHalf: {
      flex: '1 1 50%',
      minWidth: '200px',
    },
    fileInfo: {
      marginTop: '8px',
      color: '#388e3c',
      fontSize: '0.9rem',
    },
    buttonWrapper: {
      textAlign: 'center',
      marginTop: '30px',
    },
    button: {
      backgroundColor: '#34699a',
      color: '#fff',
      border: 'none',
      borderRadius: '12px',
      padding: '14px 48px',
      fontSize: '1.2rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#265384',
    },
  };

  const [hoverSubmit, setHoverSubmit] = useState(false);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.header}>List Your Food</h2>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="foodType" style={styles.label}>Food Type</label>
            <input
              id="foodType"
              type="text"
              required
              style={styles.input}
              value={formData.foodType}
              onChange={e => setFormData({ ...formData, foodType: e.target.value })}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="description" style={styles.label}>Description</label>
            <textarea
              id="description"
              rows="3"
              required
              style={{ ...styles.input, resize: 'vertical' }}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div style={styles.row}>
            <div style={styles.colHalf}>
              <label htmlFor="quantity" style={styles.label}>Quantity (persons)</label>
              <input
                id="quantity"
                type="number"
                min="1"
                required
                style={styles.input}
                value={formData.quantity}
                onChange={e => setFormData({ ...formData, quantity: e.target.value })}
              />
            </div>

            <div style={styles.colHalf}>
              <label htmlFor="expiryDate" style={styles.label}>Expiry Date</label>
              <input
                id="expiryDate"
                type="date"
                required
                style={styles.input}
                value={formData.expiryDate}
                onChange={e => setFormData({ ...formData, expiryDate: e.target.value })}
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="image" style={styles.label}>Food Image (Optional)</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              style={styles.input}
              onChange={e => setImage(e.target.files[0])}
            />
            {image && <small style={styles.fileInfo}>Selected: {image.name}</small>}
          </div>

          <div style={styles.buttonWrapper}>
            <button
              type="submit"
              style={hoverSubmit ? { ...styles.button, ...styles.buttonHover } : styles.button}
              onMouseEnter={() => setHoverSubmit(true)}
              onMouseLeave={() => setHoverSubmit(false)}
            >
              List Food Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListFoodDetail;
