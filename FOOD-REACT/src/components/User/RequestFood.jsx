import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const RequestFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [food, setFood] = useState(null);

  // User inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/food-items/${id}`)
      .then((res) => res.json())
      .then((data) => setFood(data))
      .catch(() => toast.error('Food not found'));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      toast.error('All fields are required!');
      return;
    }

    const requestData = {
      requesterName: name.trim(),
      requesterEmail: email.trim(),
      requesterPhone: phone.trim(),
      requesterAddress: address.trim(),
      requestedQuantity: Number(quantity),
      foodItem: { id: Number(id) },
      status: 'PENDING',
    };

    if (message.trim()) {
      requestData.requesterAddress += ' | Note: ' + message.trim();
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/food-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      if (!res.ok) {
        return toast.error('Request failed. Try again.');
      }

      toast.success('Food request sent successfully!');
      navigate('/my-requests');
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    }
  };

  if (!food)
    return (
      <div style={{ textAlign: 'center', marginTop: '60px', fontSize: '1.3rem', color: '#555' }}>
        Loading...
      </div>
    );

  const maxQty = food.availableQuantity ?? food.quantity ?? 1;

  const styles = {
    container: {
      maxWidth: '720px',
      margin: '40px auto',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#fff',
      borderRadius: '16px',
      boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
      padding: '36px 40px',
      color: '#222',
    },
    header: {
      textAlign: 'center',
      fontSize: '2rem',
      fontWeight: '700',
      marginBottom: '32px',
      color: '#1a1a1a',
    },
    imageWrapper: {
      textAlign: 'center',
      marginBottom: '28px',
    },
    image: {
      width: '320px',
      height: '220px',
      objectFit: 'cover',
      borderRadius: '12px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
    },
    foodTitle: {
      marginTop: '14px',
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#333',
    },
    foodDescription: {
      fontSize: '1rem',
      color: '#555',
      marginBottom: '8px',
      lineHeight: 1.5,
    },
    availableText: {
      fontWeight: '600',
      fontSize: '1.1rem',
      color: '#4a90e2',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '6px',
      fontWeight: '600',
      fontSize: '1rem',
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
    },
    textarea: {
      width: '100%',
      padding: '12px 14px',
      fontSize: '1rem',
      borderRadius: '8px',
      border: '1.8px solid #ced4da',
      outline: 'none',
      resize: 'vertical',
      transition: 'border-color 0.3s',
    },
    inputFocus: {
      borderColor: '#4a90e2',
      boxShadow: '0 0 6px rgba(74,144,226,0.5)',
    },
    buttonGroup: {
      textAlign: 'center',
      marginTop: '32px',
    },
    buttonPrimary: {
      padding: '14px 40px',
      backgroundColor: '#4a90e2',
      color: '#fff',
      border: 'none',
      borderRadius: '10px',
      fontSize: '1.1rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      marginRight: '20px',
    },
    buttonPrimaryHover: {
      backgroundColor: '#3e78c2',
    },
    buttonSecondary: {
      padding: '14px 40px',
      backgroundColor: '#aaa',
      color: '#222',
      border: 'none',
      borderRadius: '10px',
      fontSize: '1.1rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonSecondaryHover: {
      backgroundColor: '#888',
    },
  };

  // Focus state management for inputs (optional)
  // You can add more states for focus if needed

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Request Food</h2>

      <div style={styles.imageWrapper}>
        <img
          src={`http://localhost:8080${food.imagePath || ''}`}
          alt={food.foodType}
          style={styles.image}
        />
        <h4 style={styles.foodTitle}>{food.foodType}</h4>
        <p style={styles.foodDescription}>{food.description}</p>
        <p style={styles.availableText}>
          <strong>Available:</strong> {maxQty} {maxQty === 1 ? 'person' : 'persons'}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: '100%', margin: 'auto' }}
        noValidate
        autoComplete="off"
      >
        {/* Name */}
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>
            Your Name
          </label>
          <input
            id="name"
            type="text"
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>
            Your Email
          </label>
          <input
            id="email"
            type="email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email address"
          />
        </div>

        {/* Phone */}
        <div style={styles.formGroup}>
          <label htmlFor="phone" style={styles.label}>
            Your Phone
          </label>
          <input
            id="phone"
            type="tel"
            style={styles.input}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="Enter your phone number"
          />
        </div>

        {/* Address */}
        <div style={styles.formGroup}>
          <label htmlFor="address" style={styles.label}>
            Your Address
          </label>
          <textarea
            id="address"
            rows="3"
            style={styles.textarea}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder="Enter your full address"
          />
        </div>

        {/* Quantity */}
        <div style={styles.formGroup}>
          <label htmlFor="quantity" style={styles.label}>
            How many persons?
          </label>
          <input
            id="quantity"
            type="number"
            min="1"
            max={maxQty}
            style={styles.input}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
        </div>

        {/* Optional Message */}
        <div style={styles.formGroup}>
          <label htmlFor="message" style={styles.label}>
            Message to Donor (Optional)
          </label>
          <textarea
            id="message"
            rows="4"
            style={styles.textarea}
            placeholder="e.g. I need this for my family..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div style={styles.buttonGroup}>
          <button
            type="submit"
            style={styles.buttonPrimary}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3e78c2')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4a90e2')}
          >
            Send Request
          </button>
          <button
            type="button"
            style={styles.buttonSecondary}
            onClick={() => navigate(-1)}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#888')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#aaa')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestFood;
