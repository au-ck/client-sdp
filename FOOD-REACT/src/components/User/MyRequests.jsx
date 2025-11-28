import React, { useEffect, useState } from 'react';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [source, setSource] = useState('');

  const phone = (localStorage.getItem('userPhone') || '').trim();
  const userIdRaw = (localStorage.getItem('userId') || '').trim();
  const userId = userIdRaw ? Number(userIdRaw) : null;

  const backendBase = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080/api';

  const loadRequests = async () => {
    setLoading(true);
    setError(null);
    setRequests([]);

    try {
      if (phone) {
        setSource(`phone:${phone}`);
        const res = await fetch(`${backendBase}/food-requests/my?phone=${encodeURIComponent(phone)}`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setRequests(Array.isArray(data) ? data : []);
        setLoading(false);
        return;
      }
      if (userId) {
        setSource(`userId:${userId}`);
        const res = await fetch(`${backendBase}/food-requests/user/${userId}`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setRequests(Array.isArray(data) ? data : []);
        setLoading(false);
        return;
      }
      setSource('all');
      const res = await fetch(`${backendBase}/food-requests`);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      setRequests(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      console.error('Load requests error:', err);
      setError('Failed to load requests. Check backend or network.');
      setRequests([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
    const interval = setInterval(loadRequests, 10000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (d) => {
    if (!d) return '—';
    try {
      return new Date(d).toLocaleDateString('en-IN');
    } catch {
      return d;
    }
  };

  const badgeStyle = (status = '') => {
    const s = (status || '').toUpperCase();
    let backgroundColor = '#abcee6'; // default pastel blue
    let color = '#222';
    if (s === 'COMPLETED') {
      backgroundColor = '#34699a'; // dark blue
      color = '#fff';
    } else if (s === 'REJECTED') {
      backgroundColor = '#dc4c46'; // red
      color = '#fff';
    } else if (s === 'PENDING') {
      backgroundColor = '#9fc5e8'; // lighter blue
    } else {
      backgroundColor = '#cbdde9'; // neutral blue-gray
    }
    return {
      backgroundColor,
      color,
      padding: '6px 16px',
      borderRadius: '20px',
      textTransform: 'uppercase',
      fontWeight: '700',
      fontSize: '0.9rem',
      display: 'inline-block',
    };
  };

  const styles = {
    container: {
      maxWidth: '960px',
      margin: '40px auto',
      padding: '0 20px 40px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#2e2e2e',
    },
    headerRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '28px',
      flexWrap: 'wrap',
    },
    header: {
      fontSize: '2.4rem',
      fontWeight: '700',
      color: '#34699a',
      margin: '0 0 10px 0',
    },
    sourceInfo: {
      fontSize: '0.9rem',
      color: '#7a9bc9',
      marginRight: '12px',
      whiteSpace: 'nowrap',
    },
    button: {
      padding: '8px 18px',
      fontSize: '1rem',
      borderRadius: '8px',
      border: '2px solid #34699a',
      backgroundColor: 'transparent',
      color: '#34699a',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'background-color 0.3s, color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#34699a',
      color: '#fff',
    },
    loadingWrapper: {
      textAlign: 'center',
      padding: '80px 0',
      color: '#7a9bc9',
      fontSize: '1.2rem',
    },
    noRequestsWrapper: {
      textAlign: 'center',
      padding: '60px 0',
      color: '#999',
    },
    noRequestsButton: {
      marginTop: '20px',
      padding: '10px 26px',
      borderRadius: '10px',
      border: 'none',
      backgroundColor: '#9fc5e8',
      color: '#222',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '1rem',
      textDecoration: 'none',
      display: 'inline-block',
      transition: 'background-color 0.3s',
    },
    noRequestsBtnHover: {
      backgroundColor: '#34699a',
      color: '#fff',
    },
    errorBox: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      borderRadius: '14px',
      padding: '16px 22px',
      marginBottom: '20px',
      fontWeight: '600',
      textAlign: 'center',
    },
    requestsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '20px',
    },
    card: {
      backgroundColor: 'white',
      boxShadow: '0 6px 18px rgba(52, 105, 154, 0.12)',
      borderRadius: '14px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      color: '#3e3e3e',
      fontSize: '0.95rem',
    },
    cardImage: {
      height: '200px',
      width: '100%',
      objectFit: 'cover',
    },
    cardBody: {
      padding: '24px 20px',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
    cardTitle: {
      marginBottom: '12px',
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#34699a',
    },
    smallText: {
      fontSize: '0.85rem',
      color: '#7a9bc9',
      marginBottom: '4px',
    },
    textLine: {
      marginBottom: '6px',
      color: '#555',
    },
    dateText: {
      marginBottom: '10px',
      fontSize: '0.8rem',
      color: '#999',
    },
    badgeWrapper: {
      marginTop: 'auto',
      display: 'flex',
      justifyContent: 'flex-start',
    },
  };

  const [hoverRefresh, setHoverRefresh] = useState(false);
  const [hoverNoReqBtn, setHoverNoReqBtn] = useState(false);

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h2 style={styles.header}>My Food Requests</h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <small style={styles.sourceInfo}>
            source: <strong>{source || 'loading...'}</strong>
          </small>
          <button
            onClick={loadRequests}
            style={{
              ...styles.button,
              ...(hoverRefresh ? styles.buttonHover : {}),
            }}
            onMouseEnter={() => setHoverRefresh(true)}
            onMouseLeave={() => setHoverRefresh(false)}
          >
            Refresh
          </button>
        </div>
      </div>

      {loading && (
        <div style={styles.loadingWrapper} role="status" aria-live="polite">
          Loading requests...
        </div>
      )}

      {!loading && requests.length === 0 && !error && (
        <div style={styles.noRequestsWrapper}>
          <h4>No requests yet</h4>
          <a
            href="/food-available"
            style={{
              ...styles.noRequestsButton,
              ...(hoverNoReqBtn ? styles.noRequestsBtnHover : {}),
            }}
            onMouseEnter={() => setHoverNoReqBtn(true)}
            onMouseLeave={() => setHoverNoReqBtn(false)}
          >
            Browse Available Food
          </a>
        </div>
      )}

      {error && <div style={styles.errorBox}>{error}</div>}

      {!loading && requests.length > 0 && (
        <div style={styles.requestsGrid}>
          {requests.map((req) => {
            const food = req.foodItem || {};
            const imgSrc = food.imagePath
              ? `http://localhost:8080${food.imagePath}`
              : 'https://i.imgur.com/8RmJty5.png';

            return (
              <div key={req.id} style={styles.card} aria-label={`Request for ${food.foodType || 'Food'}`}>
                <img
                  src={imgSrc}
                  alt={food.foodType || 'Food'}
                  style={styles.cardImage}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://i.imgur.com/8RmJty5.png';
                  }}
                />
                <div style={styles.cardBody}>
                  <h5 style={styles.cardTitle}>{food.foodType || 'Unknown Food'}</h5>

                  <p style={styles.smallText}>
                    Requested by: <strong>{req.requesterName || ''}</strong>
                  </p>
                  <p style={styles.textLine}>
                    <strong>Phone:</strong> {req.requesterPhone || ''}
                  </p>
                  <p style={styles.textLine}>
                    <strong>Quantity:</strong>{' '}
                    {req.requestedQuantity ? `${req.requestedQuantity} persons` : '—'}
                  </p>
                  <p style={styles.dateText}>
                    <strong>Date:</strong> {formatDate(req.createdDate)}
                  </p>

                  <div style={styles.badgeWrapper}>
                    <span style={badgeStyle(req.status)}>{req.status || 'PENDING'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyRequests;
