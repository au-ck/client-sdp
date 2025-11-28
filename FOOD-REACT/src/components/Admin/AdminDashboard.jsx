import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';

const AdminDashboard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/dashboard`)
      .then(res => setData(res.data))
      .catch(() => setData({}));
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
      fontSize: '2.8rem',
      fontWeight: '700',
      color: '#34699a',
      marginBottom: '40px',
      gap: '12px',
    },
    row: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '24px',
      justifyContent: 'center',
    },
    card: {
      flex: '1 1 280px',
      borderRadius: '16px',
      color: 'white',
      padding: '32px 20px',
      boxShadow: '0 12px 25px rgba(52, 105, 154, 0.15)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      cursor: 'default',
      minHeight: '150px',
      transition: 'transform 0.3s ease',
      userSelect: 'none',
    },
    cardHover: {
      transform: 'translateY(-10px)',
      boxShadow: '0 20px 36px rgba(52, 105, 154, 0.3)',
    },
    cardTitle: {
      fontSize: '1.4rem',
      fontWeight: '600',
      marginBottom: '16px',
      letterSpacing: '0.04em',
    },
    cardNumber: {
      fontSize: '3.6rem',
      fontWeight: '700',
      lineHeight: 1,
    },
    cardPrimary: {
      background: 'linear-gradient(135deg, #4a90e2, #357ABD)',
    },
    cardSecondary: {
      background: 'linear-gradient(135deg, #9b9b9b, #6e6e6e)',
    },
    cardSuccess: {
      background: 'linear-gradient(135deg, #198754, #146634)',
    },
    cardInfo: {
      background: 'linear-gradient(135deg, #50c8f0, #1a99d8)',
    },
    cardWarning: {
      background: 'linear-gradient(135deg, #f0ad4e, #d48806)',
      color: '#222',
    },
    cardDanger: {
      background: 'linear-gradient(135deg, #dc3545, #a52e33)',
    },
    cardDark: {
      background: 'linear-gradient(135deg, #343a40, #1a1e21)',
    },
    buttonsContainer: {
      marginTop: '44px',
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      flexWrap: 'wrap',
    },
    buttonLink: {
      backgroundColor: '#34699a',
      color: 'white',
      borderRadius: '10px',
      padding: '14px 38px',
      fontSize: '1.15rem',
      fontWeight: '700',
      textDecoration: 'none',
      boxShadow: '0 8px 20px rgba(52,105,154,0.3)',
      transition: 'background-color 0.3s ease',
      cursor: 'pointer',
      display: 'inline-block',
      textAlign: 'center',
      minWidth: '160px',
    },
    buttonLinkHover: {
      backgroundColor: '#265384',
    },
  };

  const [hoveredCard, setHoveredCard] = React.useState(null);
  const [hoveredButton, setHoveredButton] = React.useState(null);

  const cards = [
    { title: 'Total States', number: data.totalStates || 0, style: styles.cardPrimary },
    { title: 'Total Cities', number: data.totalCities || 0, style: styles.cardSecondary },
    { title: 'Total Food Donor', number: data.totalDonors || 0, style: styles.cardSuccess },
    { title: 'Total Listed Food', number: data.totalFoodItems || 0, style: styles.cardInfo },
    { title: 'New Food Request', number: data.newRequests || 0, style: styles.cardWarning },
    { title: 'Rejected Food Request', number: data.rejectedRequests || 0, style: styles.cardDanger },
    { title: 'Completed Food Request', number: data.completedRequests || 0, style: styles.cardDark },
  ];

  const links = [
    { to: '/admin/states', label: 'State' },
    { to: '/admin/cities', label: 'City' },
    { to: '/admin/reg-donors', label: 'Reg Food Donor' },
    { to: '/admin/listed-food', label: 'Listed Food' },
    { to: '/admin/food-requests', label: 'Food Request' },
    { to: '/admin/enquiries', label: 'Enquiry' },
    { to: '/admin/search-listed-food', label: 'Search Listed Food' },
    { to: '/admin/reports', label: 'Reports' },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>
        <DashboardIcon fontSize="large" style={{ color: '#34699a' }} />
        Admin Dashboard
      </h2>
      <div style={styles.row}>
        {cards.map((card, index) => (
          <div
            key={card.title}
            style={{
              ...styles.card,
              ...card.style,
              ...(hoveredCard === index ? styles.cardHover : {}),
            }}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
            aria-label={`${card.title}: ${card.number}`}
          >
            <div style={styles.cardTitle}>{card.title}</div>
            <div style={styles.cardNumber}>{card.number}</div>
          </div>
        ))}
      </div>

      <div style={styles.buttonsContainer}>
        {links.map((link, idx) => (
          <Link
            key={link.to}
            to={link.to}
            style={hoveredButton === idx ? { ...styles.buttonLink, ...styles.buttonLinkHover } : styles.buttonLink}
            onMouseEnter={() => setHoveredButton(idx)}
            onMouseLeave={() => setHoveredButton(null)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
