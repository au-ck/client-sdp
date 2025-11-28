import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AvailableFood = () => {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/food-items`)
      .then(res => res.json())
      .then(data => setFoods(data.filter(f => (f.availableQuantity || f.quantity) > 0)));
  }, []);

  const handleRequest = (foodId) => {
    navigate(`/request-food/${foodId}`);
  };

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
      fontSize: '2.8rem',
      fontWeight: '700',
      color: '#34699a',
      marginBottom: '40px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '28px',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '14px',
      boxShadow: '0 6px 20px rgba(52, 105, 154, 0.12)',
      display: 'flex',
      flexDirection: 'column',
      color: '#3e3e3e',
      fontSize: '0.95rem',
      height: '100%',
      overflow: 'hidden',
    },
    cardImage: {
      height: '240px',
      width: '100%',
      objectFit: 'cover',
      borderTopLeftRadius: '14px',
      borderTopRightRadius: '14px',
    },
    cardBody: {
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
    foodTitle: {
      fontSize: '1.4rem',
      fontWeight: '700',
      color: '#34699a',
      marginBottom: '12px',
    },
    description: {
      flexGrow: 1,
      color: '#555',
      marginBottom: '18px',
      lineHeight: 1.5,
    },
    availability: {
      fontWeight: '600',
      marginBottom: '8px',
      color: '#333',
    },
    donorInfo: {
      fontSize: '0.85rem',
      color: '#7a9bc9',
      marginBottom: '18px',
    },
    button: {
      backgroundColor: '#34699a',
      color: '#fff',
      border: 'none',
      borderRadius: '10px',
      padding: '14px',
      fontWeight: '700',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      width: '100%',
    },
    buttonHover: {
      backgroundColor: '#265384',
    },
    noFoodMessage: {
      textAlign: 'center',
      padding: '80px 20px',
      color: '#999',
      fontSize: '1.2rem',
    },
  };

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>
        Available Food Donations ({foods.length})
      </h2>
      {foods.length > 0 ? (
        <div style={styles.grid}>
          {foods.map((food, index) => (
            <div key={food.id} style={styles.card}>
              <img
                src={`http://192.168.1.73:30025${food.imagePath}`}

                alt={food.foodType}
                style={styles.cardImage}
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://i.imgur.com/8RmJty5.png'; }}
              />
              <div style={styles.cardBody}>
                <h5 style={styles.foodTitle}>{food.foodType}</h5>
                <p style={styles.description}>{food.description}</p>
                <p style={styles.availability}>
                  <strong>Available:</strong> {food.availableQuantity || food.quantity} { (food.availableQuantity || food.quantity) === 1 ? 'person' : 'persons' }
                </p>
                <p style={styles.donorInfo}>
                  Donor: {food.donor?.name || 'Anonymous'}
                </p>
                <button
                  style={hoveredIndex === index ? { ...styles.button, ...styles.buttonHover } : styles.button}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => handleRequest(food.id)}
                >
                  Request This Food
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.noFoodMessage}>No food available right now. Check back later!</div>
      )}
    </div>
  );
};

export default AvailableFood;
