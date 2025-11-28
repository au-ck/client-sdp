import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const FoodAvailableList = () => {
  const [foodItems, setFoodItems] = useState([]);
  const userId = localStorage.getItem('userId');

  const loadFood = () => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/food-items`)
      .then(res => {
        const available = res.data.filter(item => item.status === 'AVAILABLE');
        setFoodItems(available);
      });
  };

  useEffect(() => {
    loadFood();
    const interval = setInterval(() => {
      if (userId) {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/food-requests/user/${userId}`)
          .then(res => {
            res.data.forEach(req => {
              if (req.status === 'ACCEPTED' && !req.notified) {
                toast.success(`Your request for "${req.foodItem.foodType}" has been ACCEPTED!`, {
                  duration: 8000,
                  icon: '🍽️',
                });
                // Optional: mark as notified in DB or local cache
              }
            });
          });
      }
      loadFood();
    }, 5000);

    return () => clearInterval(interval);
  }, [userId]);

  const styles = {
    container: {
      maxWidth: '960px',
      margin: '40px auto',
      padding: '0 20px 40px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#2e2e2e',
    },
    header: {
      textAlign: 'center',
      fontSize: '2.4rem',
      fontWeight: '700',
      color: '#34699a',
      marginBottom: '32px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '14px',
      boxShadow: '0 6px 20px rgba(52, 105, 154, 0.12)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      color: '#3e3e3e',
      fontSize: '0.95rem',
      overflow: 'hidden',
    },
    cardImage: {
      height: '220px',
      width: '100%',
      objectFit: 'cover',
    },
    noImagePlaceholder: {
      backgroundColor: '#f0f4fb',
      color: '#7a9bc9',
      textAlign: 'center',
      padding: '72px 0',
      fontSize: '1.1rem',
      borderRadius: '14px 14px 0 0',
    },
    cardBody: {
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
    foodTitle: {
      fontSize: '1.3rem',
      fontWeight: '700',
      color: '#34699a',
      marginBottom: '10px',
    },
    description: {
      flexGrow: 1,
      color: '#555',
      marginBottom: '14px',
      lineHeight: 1.5,
    },
    quantity: {
      fontWeight: '600',
      marginBottom: '20px',
      color: '#333',
    },
    linkButton: {
      alignSelf: 'flex-start',
      backgroundColor: '#34699a',
      color: '#fff',
      padding: '12px 28px',
      borderRadius: '10px',
      textDecoration: 'none',
      fontWeight: '600',
      fontSize: '1rem',
      boxShadow: '0 6px 14px rgba(52,105,154,0.3)',
      transition: 'background-color 0.3s ease',
      cursor: 'pointer',
    },
    linkHover: {
      backgroundColor: '#265384',
    },
  };

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Available Food</h2>
      <div style={styles.grid}>
        {foodItems.map((item, index) => (
          <div key={item.id} style={styles.card}>
            {item.imagePath ? (
              <img
                src={`http://localhost:8080${item.imagePath}`}
                alt={item.foodType}
                style={styles.cardImage}
              />
            ) : (
              <div style={styles.noImagePlaceholder}>No Image</div>
            )}
            <div style={styles.cardBody}>
              <h5 style={styles.foodTitle}>{item.foodType}</h5>
              <p style={styles.description}>{item.description}</p>
              <p style={styles.quantity}>
                <strong>Quantity:</strong> {item.quantity} {item.quantity === 1 ? 'person' : 'persons'}
              </p>
              <Link
                to={`/request-food/${item.id}`}
                style={hoveredIndex === index ? { ...styles.linkButton, ...styles.linkHover } : styles.linkButton}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                Request Food
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodAvailableList;
