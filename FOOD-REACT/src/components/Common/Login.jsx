import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/login`, formData)
      .then(res => {
        localStorage.setItem('userId', res.data.id);
        localStorage.setItem('userRole', res.data.role);
        if (res.data.role === 'ADMIN') {
          navigate('/admin/dashboard');
        } else if (res.data.role === 'DONOR') {
          navigate('/donor/dashboard');
        }
      })
      .catch(() => alert('Invalid credentials'));
  };

  const styles = {
    container: {
      maxWidth: '400px',
      margin: '60px auto',
      padding: '32px 28px',
      backgroundColor: '#f9fafb',
      borderRadius: '14px',
      boxShadow: '0 6px 24px rgba(52,105,154,0.1)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#2e2e2e',
    },
    header: {
      fontSize: '2rem',
      fontWeight: '700',
      marginBottom: '36px',
      color: '#34699a',
      textAlign: 'center',
    },
    formGroup: {
      marginBottom: '24px',
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      marginBottom: '8px',
      fontWeight: '600',
      fontSize: '1rem',
      color: '#333',
    },
    input: {
      padding: '12px 16px',
      fontSize: '1rem',
      borderRadius: '10px',
      border: '1.8px solid #ced4da',
      outline: 'none',
      boxSizing: 'border-box',
      transition: 'border-color 0.3s',
    },
    inputFocus: {
      borderColor: '#34699a',
      boxShadow: '0 0 8px rgba(52,105,154,0.5)',
    },
    button: {
      width: '100%',
      padding: '14px',
      fontWeight: '700',
      fontSize: '1.1rem',
      color: 'white',
      backgroundColor: '#34699a',
      borderRadius: '12px',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 8px 20px rgba(52,105,154,0.3)',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#265384',
    },
  };

  const [hoverBtn, setHoverBtn] = useState(false);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Login</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email</label>
          <input
            id="email"
            type="email"
            required
            style={styles.input}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            onFocus={e => e.target.style.borderColor = '#34699a'}
            onBlur={e => e.target.style.borderColor = '#ced4da'}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>Password</label>
          <input
            id="password"
            type="password"
            required
            style={styles.input}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            onFocus={e => e.target.style.borderColor = '#34699a'}
            onBlur={e => e.target.style.borderColor = '#ced4da'}
          />
        </div>
        <button
          type="submit"
          style={hoverBtn ? { ...styles.button, ...styles.buttonHover } : styles.button}
          onMouseEnter={() => setHoverBtn(true)}
          onMouseLeave={() => setHoverBtn(false)}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
