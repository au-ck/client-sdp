import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';

const DonorDashboard = () => {
  const [data, setData] = useState({ totalListedFood: 0, totalTakeAway: 0 });

  useEffect(() => {
    const donorId = localStorage.getItem('userId');
    if (donorId) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/food-items/donor/${donorId}`)
        .then(res => {
          const listed = res.data.length;
          const takeAway = res.data.filter(f => f.status === 'COMPLETED').length;
          setData({ totalListedFood: listed, totalTakeAway: takeAway });
        });
    }
  }, []);

  const styles = {
    container: {
      maxWidth: '960px',
      margin: '40px auto',
      padding: '0 20px 40px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#2e2e2e',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      fontSize: '2.4rem',
      fontWeight: '700',
      color: '#2c3e50',
      marginBottom: '40px',
    },
    row: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '28px',
      justifyContent: 'center',
    },
    card: {
      flex: '1 1 300px',
      borderRadius: '16px',
      boxShadow: '0 12px 25px rgba(52, 105, 154, 0.15)',
      color: 'white',
      padding: '28px 36px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '160px',
      transition: 'transform 0.3s ease',
      cursor: 'default',
    },
    cardHover: {
      transform: 'translateY(-8px)',
      boxShadow: '0 18px 40px rgba(52, 105, 154, 0.25)',
    },
    cardTitle: {
      fontSize: '1.4rem',
      fontWeight: '600',
      marginBottom: '16px',
      letterSpacing: '0.03em',
    },
    cardNumber: {
      fontSize: '3.6rem',
      fontWeight: '700',
      lineHeight: 1,
    },
    cardListedFood: {
      background: 'linear-gradient(135deg, #4a90e2, #357ABD)',
    },
    cardTakeAway: {
      background: 'linear-gradient(135deg, #50c8f0, #1a99d8)',
    },
    buttonsContainer: {
      marginTop: '44px',
      display: 'flex',
      justifyContent: 'center',
      gap: '24px',
      flexWrap: 'wrap',
    },
    buttonLink: {
      backgroundColor: '#34699a',
      color: 'white',
      borderRadius: '10px',
      padding: '14px 36px',
      fontSize: '1.1rem',
      fontWeight: '700',
      textDecoration: 'none',
      boxShadow: '0 8px 20px rgba(52,105,154,0.3)',
      transition: 'background-color 0.3s ease',
      cursor: 'pointer',
      display: 'inline-block',
      textAlign: 'center',
      minWidth: '180px',
    },
    buttonHover: {
      backgroundColor: '#265384',
    },
  };

  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>
        <DashboardIcon fontSize="large" style={{ color: '#34699a' }} />
        Donor Dashboard
      </h2>
      <div style={styles.row}>
        <div
          style={{
            ...styles.card,
            ...styles.cardListedFood,
            ...(hoveredCard === 0 ? styles.cardHover : {}),
          }}
          onMouseEnter={() => setHoveredCard(0)}
          onMouseLeave={() => setHoveredCard(null)}
          aria-label="Total Listed Food"
        >
          <div style={styles.cardTitle}>Total Listed Food</div>
          <div style={styles.cardNumber}>{data.totalListedFood}</div>
        </div>

        <div
          style={{
            ...styles.card,
            ...styles.cardTakeAway,
            ...(hoveredCard === 1 ? styles.cardHover : {}),
          }}
          onMouseEnter={() => setHoveredCard(1)}
          onMouseLeave={() => setHoveredCard(null)}
          aria-label="Total Food Take Away"
        >
          <div style={styles.cardTitle}>Total Food Take Away</div>
          <div style={styles.cardNumber}>{data.totalTakeAway}</div>
        </div>
      </div>

      <div style={styles.buttonsContainer}>
        {['/donor/list-food', '/donor/requests', '/donor/search'].map((link, idx) => {
          const labels = ['List Your Food Detail', 'Request', 'Search'];
          return (
            <Link
              key={link}
              to={link}
              style={hoveredButton === idx ? { ...styles.buttonLink, ...styles.buttonHover } : styles.buttonLink}
              onMouseEnter={() => setHoveredButton(idx)}
              onMouseLeave={() => setHoveredButton(null)}
            >
              {labels[idx]}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DonorDashboard;
