import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function UserHome() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  const styles = {
    container: {
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '40px 20px',
      fontFamily:
        "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#f9fafb',
      color: '#222',
    },
    header: {
      textAlign: 'center',
      fontSize: '3rem',
      fontWeight: '700',
      marginBottom: '40px',
      letterSpacing: '1px',
      color: '#1a1a1a',
    },
    cardsWrapper: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '20px',
      marginBottom: '60px',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '14px',
      boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
      width: '280px',
      padding: '26px 20px',
      textAlign: 'center',
      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
      cursor: 'pointer',
    },
    cardHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 12px 36px rgba(0,0,0,0.12)',
    },
    icon: {
      fontSize: '65px',
      color: '#5b5b5b',
      marginBottom: '18px',
    },
    cardTitle: {
      fontSize: '1.5rem',
      marginBottom: '12px',
      color: '#333',
      fontWeight: '600',
    },
    cardText: {
      fontSize: '1rem',
      marginBottom: '20px',
      color: '#666',
      lineHeight: 1.4,
    },
    button: {
      display: 'inline-block',
      padding: '11px 28px',
      fontSize: '1rem',
      borderRadius: '10px',
      border: 'none',
      backgroundColor: '#4a90e2', // Accent blue
      color: '#fff',
      cursor: 'pointer',
      textDecoration: 'none',
      fontWeight: '600',
      letterSpacing: '0.03em',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#3e78c2',
    },
    milestoneSection: {
      backgroundColor: '#edf4fc',
      borderRadius: '14px',
      padding: '40px 25px',
      display: 'flex',
      justifyContent: 'space-around',
      marginBottom: '60px',
      textAlign: 'center',
    },
    milestoneItem: {
      flex: '1 1 150px',
      margin: '0 15px',
    },
    milestoneNumber: {
      fontSize: '2.7rem',
      fontWeight: '700',
      color: '#4a90e2',
      marginBottom: '6px',
    },
    milestoneLabel: {
      fontSize: '1.1rem',
      color: '#555',
    },
    citiesSection: {
      marginBottom: '70px',
    },
    citiesHeader: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#1a1a1a',
      marginBottom: '24px',
      textAlign: 'center',
    },
    cityScrollWrapper: {
      display: 'flex',
      overflowX: 'auto',
      gap: '14px',
      paddingBottom: '12px',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
    },
    cityScrollWrapperHideScroll: {
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
    },
    cityCard: {
      flex: '0 0 auto',
      backgroundColor: '#fff',
      borderRadius: '25px',
      padding: '14px 28px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
      fontWeight: '600',
      fontSize: '1rem',
      color: '#4a90e2',
      whiteSpace: 'nowrap',
      cursor: 'default',
      userSelect: 'none',
      transition: 'transform 0.3s ease',
    },
    cityCardHover: {
      transform: 'scale(1.1)',
    },
    loginSection: {
      marginTop: '50px',
      padding: '38px 30px',
      backgroundColor: '#fff',
      borderRadius: '14px',
      boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
      textAlign: 'center',
    },
    loginHeader: {
      marginBottom: '24px',
      fontSize: '2rem',
      fontWeight: '700',
      color: '#1a1a1a',
    },
    footer: {
      marginTop: '80px',
      padding: '30px 25px',
      backgroundColor: '#222',
      color: '#ccc',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      fontSize: '0.9rem',
      borderTop: '3px solid #4a90e2',
    },
    footerSection: {
      marginBottom: '10px',
      minWidth: '150px',
    },
    footerLinks: {
      color: '#ccc',
      textDecoration: 'none',
      marginRight: '18px',
      fontWeight: '500',
      letterSpacing: '0.02em',
      cursor: 'pointer',
      transition: 'color 0.3s',
    },
    footerLinksHover: {
      color: '#4a90e2',
    },
    socialIcons: {
      display: 'flex',
      gap: '20px',
      fontSize: '1.3rem',
    },
    socialIconLink: {
      color: '#ccc',
      transition: 'color 0.3s',
      cursor: 'pointer',
    },
    socialIconHover: {
      color: '#4a90e2',
    },
  };

  // City hover state for scroll cards
  const [hoveredCityIndex, setHoveredCityIndex] = useState(null);

  const cards = [
    {
      title: 'Available Food List',
      description: 'Browse donated food items and contribute to reducing waste.',
      link: '/food-available',
    },
    {
      title: 'About Us',
      description: 'Discover our mission to combat food wastage effectively.',
      link: '/about',
    },
    {
      title: 'Contact Us',
      description: 'Get in touch for support or queries.',
      link: '/contact',
    },
  ];

  // Sample milestones
  const milestones = [
    { number: '15+', label: 'Cities Served' },
    { number: '120K', label: 'Meals Saved' },
    { number: '350', label: 'Active Donors' },
    { number: '24/7', label: 'Support Available' },
  ];

  // Sample cities list
  const cities = [
  // Telangana
  'Hyderabad', 'Warangal', 'Nizamabad', 'Khammam', 'Karimnagar',
  'Nalgonda', 'Ramagundam', 'Adilabad', 'Mahbubnagar', 'Siddipet',
  'Suryapet', 'Miryalaguda', 'Jagtial', 'Mancherial', 'Zaheerabad',

  // Andhra Pradesh
  'Vijayawada', 'Visakhapatnam', 'Guntur', 'Nellore', 'Kakinada',
  'Tirupati', 'Rajahmundry', 'Kadapa', 'Kurnool', 'Anantapur',
  'Chittoor', 'Ongole', 'Eluru', 'Vizianagaram', 'Srikakulam',
];


  return (
    <div style={styles.container}>
      {/* Header */}
      <h1 style={styles.header}>Food Waste Management System</h1>

      {/* Cards */}
      <div style={styles.cardsWrapper}>
        {cards.map((card, index) => (
          <div
            key={index}
            style={
              hoveredCard === index ? { ...styles.card, ...styles.cardHover } : styles.card
            }
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <RestaurantIcon style={styles.icon} />
            <h3 style={styles.cardTitle}>{card.title}</h3>
            <p style={styles.cardText}>{card.description}</p>
            <Link
              to={card.link}
              style={
                hoveredBtn === index ? { ...styles.button, ...styles.buttonHover } : styles.button
              }
              onMouseEnter={() => setHoveredBtn(index)}
              onMouseLeave={() => setHoveredBtn(null)}
            >
              View
            </Link>
          </div>
        ))}
      </div>

      {/* Milestones */}
      <section style={styles.milestoneSection}>
        {milestones.map((milestone, idx) => (
          <div key={idx} style={styles.milestoneItem}>
            <div style={styles.milestoneNumber}>{milestone.number}</div>
            <div style={styles.milestoneLabel}>{milestone.label}</div>
          </div>
        ))}
      </section>

      {/* Cities scroller */}
      <section style={styles.citiesSection}>
        <h2 style={styles.citiesHeader}>Cities We Serve</h2>
        <div
          style={{ ...styles.cityScrollWrapper, ...styles.cityScrollWrapperHideScroll }}
          // Optional: disable scrollbars visually for modern browsers
          className="hide-scrollbar"
        >
          {cities.map((city, idx) => (
            <div
              key={idx}
              style={
                hoveredCityIndex === idx
                  ? { ...styles.cityCard, ...styles.cityCardHover }
                  : styles.cityCard
              }
              onMouseEnter={() => setHoveredCityIndex(idx)}
              onMouseLeave={() => setHoveredCityIndex(null)}
            >
              {city}
            </div>
          ))}
        </div>
      </section>

      {/* Login/Register Section */}
      <section style={styles.loginSection}>
        <h2 style={styles.loginHeader}>Already have an account?</h2>
        <Link
          to="/login"
          style={{ ...styles.button, marginRight: '18px' }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#3e78c2')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#4a90e2')}
        >
          Login
        </Link>
        <Link
          to="/register-donor"
          style={styles.button}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#3e78c2')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#4a90e2')}
        >
          Register as Donor
        </Link>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerSection}>
          &copy; {new Date().getFullYear()} Food Waste Management System
        </div>
        <div style={styles.footerSection}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            style={styles.footerLinks}
            onMouseEnter={e => (e.currentTarget.style.color = '#4a90e2')}
            onMouseLeave={e => (e.currentTarget.style.color = '#ccc')}
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            style={styles.footerLinks}
            onMouseEnter={e => (e.currentTarget.style.color = '#4a90e2')}
            onMouseLeave={e => (e.currentTarget.style.color = '#ccc')}
          >
            Twitter
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            style={styles.footerLinks}
            onMouseEnter={e => (e.currentTarget.style.color = '#4a90e2')}
            onMouseLeave={e => (e.currentTarget.style.color = '#ccc')}
          >
            Instagram
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            style={styles.footerLinks}
            onMouseEnter={e => (e.currentTarget.style.color = '#4a90e2')}
            onMouseLeave={e => (e.currentTarget.style.color = '#ccc')}
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
}
