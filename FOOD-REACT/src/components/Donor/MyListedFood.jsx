import React, { useEffect, useState } from 'react';

const MyListedFood = () => {
  const [foods, setFoods] = useState([]);
  const donorId = localStorage.getItem('userId');

  useEffect(() => {
    if (!donorId) return;
    fetch(`http://localhost:8080/api/food-items/donor/${donorId}`)
      .then(res => res.json())
      .then(data => {
        setFoods(data);
        console.log("My Food:", data);
      });
  }, [donorId]);

  const styles = {
    container: {
      maxWidth: '960px',
      margin: '40px auto',
      padding: '0 20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#2e2e2e',
    },
    header: {
      color: '#34699a',
      fontSize: '2rem',
      fontWeight: '700',
      marginBottom: '28px',
    },
    noFoodText: {
      textAlign: 'center',
      color: '#999',
      fontSize: '1.3rem',
      marginTop: '80px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '26px',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '14px',
      boxShadow: '0 6px 18px rgba(52, 105, 154, 0.12)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      fontSize: '0.95rem',
      color: '#3e3e3e',
    },
    cardImage: {
      height: '200px',
      width: '100%',
      objectFit: 'cover',
    },
    cardBody: {
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
    foodType: {
      color: '#34699a',
      fontWeight: '700',
      fontSize: '1.3rem',
      marginBottom: '12px',
    },
    description: {
      color: '#555',
      fontSize: '0.9rem',
      marginBottom: '14px',
      lineHeight: 1.5,
      flexGrow: 1,
    },
    quantity: {
      fontWeight: '600',
      fontSize: '1rem',
      color: '#222',
    },
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.header}>My Listed Food ({foods.length})</h3>

      {foods.length === 0 ? (
        <p style={styles.noFoodText}>You haven't listed any food yet.</p>
      ) : (
        <div style={styles.grid}>
          {foods.map(food => (
            <div key={food.id} style={styles.card}>
              <img
                src={`http://localhost:8080${food.imagePath}`}
                alt={food.foodType}
                style={styles.cardImage}
                onError={(e) => e.target.src = "https://i.imgur.com/8RmJty5.png"}
              />
              <div style={styles.cardBody}>
                <h5 style={styles.foodType}>{food.foodType}</h5>
                <p style={styles.description}>{food.description}</p>
                <p style={styles.quantity}>
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

export default MyListedFood;
