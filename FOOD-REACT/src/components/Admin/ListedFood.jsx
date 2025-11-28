import React, { useEffect, useState } from 'react';

const ListedFood = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/food-items')
      .then(res => res.json())
      .then(data => {
        setFoods(data);
        console.log("Admin Food Loaded:", data);
      })
      .catch(err => console.log("Error:", err));
  }, []);

  const styles = {
    container: {
      maxWidth: '980px',
      margin: '40px auto',
      padding: '0 20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#2e2e2e',
    },
    header: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#c0392b', // danger red accent
      marginBottom: '32px',
      textAlign: 'center',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '28px',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '14px',
      boxShadow: '0 6px 20px rgba(52, 105, 154, 0.12)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
      color: '#3e3e3e',
      fontSize: '0.95rem',
    },
    cardImage: {
      height: '200px',
      width: '100%',
      objectFit: 'cover',
      borderTopLeftRadius: '14px',
      borderTopRightRadius: '14px',
    },
    cardBody: {
      padding: '20px',
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    foodType: {
      color: '#34699a',
      fontWeight: '700',
      fontSize: '1.3rem',
      marginBottom: '12px',
    },
    description: {
      color: '#555',
      marginBottom: '14px',
      lineHeight: 1.5,
      flexGrow: 1,
    },
    textLine: {
      fontWeight: '600',
      marginBottom: '8px',
      color: '#222',
    },
    noFoodText: {
      textAlign: 'center',
      color: '#999',
      fontSize: '1.3rem',
      marginTop: '80px',
    },
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.header}>All Listed Food ({foods.length})</h3>

      {foods.length === 0 ? (
        <p style={styles.noFoodText}>No food listed yet.</p>
      ) : (
        <div style={styles.grid}>
          {foods.map(food => (
            <div key={food.id} style={styles.card}>
              <img
                src={`http://localhost:8080${food.imagePath}`}
                alt={food.foodType}
                style={styles.cardImage}
                onError={e => { e.target.onerror = null; e.target.src = "https://i.imgur.com/8RmJty5.png"; }}
              />
              <div style={styles.cardBody}>
                <h5 style={styles.foodType}>{food.foodType}</h5>
                <p style={styles.description}>{food.description}</p>
                <p style={styles.textLine}><strong>Donor:</strong> {food.donor?.name || "Unknown"}</p>
                <p style={styles.textLine}>
                  <strong>Available:</strong> {food.availableQuantity || food.quantity} / {food.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListedFood;
