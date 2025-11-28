import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminSearchListedFood = () => {
  const [foods, setFoods] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");
  const [requestNumber, setRequestNumber] = useState("");
  const [requestResult, setRequestResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080/api";

  useEffect(() => {
    setLoading(true);
    fetch(`${BACKEND}/food-items`)
      .then(res => res.json())
      .then(data => {
        setFoods(Array.isArray(data) ? data : []);
        setFiltered(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error("Could not load food items:", err);
        setFoods([]);
        setFiltered([]);
      })
      .finally(() => setLoading(false));
  }, [BACKEND]);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setFiltered(foods);
      return;
    }
    setFiltered(
      foods.filter(f =>
        (f.foodType || "").toLowerCase().includes(q) ||
        (f.description || "").toLowerCase().includes(q) ||
        (f.donor?.name || "").toLowerCase().includes(q)
      )
    );
  }, [query, foods]);

  const handleRequestSearch = async () => {
    if (!requestNumber) return;
    try {
      const res = await fetch(`${BACKEND}/admin/search-food-request?requestNumber=${encodeURIComponent(requestNumber)}`);
      if (!res.ok) {
        const text = await res.text().catch(() => null);
        throw new Error(text || `Status ${res.status}`);
      }
      const data = await res.json();
      setRequestResult(data);
    } catch (err) {
      console.error("Request lookup failed:", err);
      setRequestResult({ error: "Not found or server error. See console." });
    }
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
      fontSize: '2rem',
      fontWeight: '700',
      color: '#34699a',
      marginBottom: '24px',
    },
    searchRow: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px',
      marginBottom: '24px',
    },
    input: {
      flex: '1 1 300px',
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
    buttonPrimary: {
      padding: '12px 20px',
      fontSize: '1rem',
      borderRadius: '10px',
      border: 'none',
      backgroundColor: '#34699a',
      color: 'white',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      flex: '1 1 120px',
    },
    buttonPrimaryHover: {
      backgroundColor: '#265384',
    },
    buttonOutline: {
      padding: '12px 20px',
      fontSize: '1rem',
      borderRadius: '10px',
      border: '2px solid #34699a',
      backgroundColor: 'transparent',
      color: '#34699a',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, color 0.3s ease',
      flex: '1 1 120px',
    },
    buttonOutlineHover: {
      backgroundColor: '#34699a',
      color: 'white',
    },
    requestResult: {
      marginBottom: '24px',
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 6px 20px rgba(52, 105, 154, 0.1)',
    },
    alertWarning: {
      backgroundColor: '#fff3cd',
      color: '#856404',
      padding: '10px 16px',
      borderRadius: '10px',
      marginBottom: '12px',
    },
    card: {
      backgroundColor: '#f9fafb',
      borderRadius: '12px',
      padding: '16px',
      boxShadow: '0 4px 14px rgba(52,105,154,0.1)',
      marginBottom: '24px',
    },
    horizontalRule: {
      border: 'none',
      borderTop: '1px solid #ddd',
      margin: '32px 0',
    },
    resultsHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px',
    },
    resultLabel: {
      fontSize: '1.2rem',
      fontWeight: '600',
    },
    mutedText: {
      color: '#6c757d',
      fontSize: '0.9rem',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
      gap: '24px',
    },
    cardItem: {
      backgroundColor: 'white',
      borderRadius: '14px',
      boxShadow: '0 6px 18px rgba(52,105,154,0.12)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      color: '#3e3e3e',
      fontSize: '0.95rem',
    },
    cardImg: {
      height: '200px',
      objectFit: 'cover',
      width: '100%',
      borderTopLeftRadius: '14px',
      borderTopRightRadius: '14px',
    },
    noImage: {
      backgroundColor: '#f0f4fb',
      padding: '72px 0',
      textAlign: 'center',
      fontSize: '1.1rem',
      color: '#7a9bc9',
      borderTopLeftRadius: '14px',
      borderTopRightRadius: '14px',
    },
    cardBody: {
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
    cardTitle: {
      fontSize: '1.3rem',
      fontWeight: '700',
      color: '#34699a',
      marginBottom: '10px',
    },
    cardDescription: {
      flexGrow: 1,
      color: '#555',
      marginBottom: '14px',
      lineHeight: 1.5,
    },
    cardQuantity: {
      fontWeight: '600',
      marginBottom: '6px',
      color: '#333',
    },
    cardDonor: {
      color: '#7a9bc9',
      fontSize: '0.85rem',
      marginBottom: '12px',
    },
    buttonGroup: {
      marginTop: 'auto',
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap',
    },
    btnOutlinePrimary: {
      flex: '1 1 auto',
      padding: '8px 16px',
      fontSize: '0.9rem',
      fontWeight: '700',
      color: '#34699a',
      border: '2px solid #34699a',
      backgroundColor: 'transparent',
      borderRadius: '10px',
      cursor: 'pointer',
      textDecoration: 'none',
      textAlign: 'center',
      transition: 'background-color 0.3s ease, color 0.3s ease',
    },
    btnOutlinePrimaryHover: {
      backgroundColor: '#34699a',
      color: 'white',
    },
  };

  const [hoverReset, setHoverReset] = useState(false);
  const [hoverFind, setHoverFind] = useState(false);
  const [hoverOpen, setHoverOpen] = useState(null);
  const [hoverContact, setHoverContact] = useState(null);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Search Listed Food</h2>

      <div style={styles.searchRow}>
        <input
          type="text"
          placeholder="Search by food type, description, or donor name..."
          style={styles.input}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={e => e.target.style.borderColor = '#34699a'}
          onBlur={e => e.target.style.borderColor = '#ced4da'}
        />
        <input
          type="text"
          placeholder="Search by request number (admin)"
          style={styles.input}
          value={requestNumber}
          onChange={e => setRequestNumber(e.target.value)}
          onFocus={e => e.target.style.borderColor = '#34699a'}
          onBlur={e => e.target.style.borderColor = '#ced4da'}
        />
        <button
          style={hoverReset ? { ...styles.buttonOutlinePrimary, ...styles.btnOutlinePrimaryHover } : styles.buttonOutlinePrimary}
          onClick={() => { setQuery(""); setRequestResult(null); }}
          onMouseEnter={() => setHoverReset(true)}
          onMouseLeave={() => setHoverReset(false)}
          type="button"
        >
          Reset
        </button>
        <button
          style={hoverFind ? { ...styles.buttonOutlinePrimary, ...styles.btnOutlinePrimaryHover } : styles.buttonOutlinePrimary}
          onClick={handleRequestSearch}
          onMouseEnter={() => setHoverFind(true)}
          onMouseLeave={() => setHoverFind(false)}
          type="button"
        >
          Find Request
        </button>
      </div>

      {requestResult && (
        <div style={{ marginBottom: '24px' }}>
          <h5>Request Lookup Result</h5>
          {requestResult.error ? (
            <div style={{ backgroundColor: '#fff3cd', color: '#856404', padding: '12px 16px', borderRadius: '10px' }}>
              {requestResult.error}
            </div>
          ) : (
            <div style={styles.card}>
              <p><strong>Request ID:</strong> {requestResult.id}</p>
              <p><strong>Requester:</strong> {requestResult.requesterName} ({requestResult.requesterPhone})</p>
              <p><strong>Quantity:</strong> {requestResult.requestedQuantity}</p>
              <p><strong>Status:</strong> {requestResult.status}</p>
              <p><strong>Food:</strong> {requestResult.foodItem?.foodType} — {requestResult.foodItem?.description}</p>
              <p><strong>Donor:</strong> {requestResult.foodItem?.donor?.name || "N/A"}</p>
            </div>
          )}
        </div>
      )}

      <hr style={styles.horizontalRule} />

      <div style={styles.resultsHeader}>
        <h5 style={styles.resultLabel}>Results ({filtered.length})</h5>
        <small style={styles.mutedText}>Click food type to open donor or request pages</small>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <div style={{
            width: 40,
            height: 40,
            border: "4px solid #ced4da",
            borderTopColor: "#34699a",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto"
          }} />
          <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ backgroundColor: '#d1ecf1', color: '#0c5460', padding: '14px 24px', borderRadius: '10px' }}>
          No items found.
        </div>
      ) : (
        <div style={styles.grid}>
          {filtered.map(item => (
            <div key={item.id} style={styles.cardItem}>
              {item.imagePath ? (
                <img src={`http://localhost:8080${item.imagePath}`} alt={item.foodType} style={styles.cardImg} onError={(e) => e.target.src = "https://i.imgur.com/8RmJty5.png"} />
              ) : (
                <div style={styles.noImage}>No Image</div>
              )}
              <div style={styles.cardBody}>
                <h5 style={styles.cardTitle}>
                  <Link to={`/admin/listed-food`} style={{ color: '#28a745', textDecoration: 'none', cursor: 'pointer' }}>{item.foodType}</Link>
                </h5>
                <p style={styles.cardDescription}>{item.description}</p>
                <p style={styles.cardQuantity}><strong>Available:</strong> {item.availableQuantity ?? item.quantity}</p>
                <p style={styles.cardDonor}>Donor: {item.donor?.name || "Anonymous"}</p>
                <div style={styles.buttonGroup}>
                  <Link
                    to={`/admin/listed-food`}
                    style={{ ...styles.btnOutlinePrimary, flex: '1 1 48%' }}
                    onMouseEnter={() => setHoverOpen(item.id)}
                    onMouseLeave={() => setHoverOpen(null)}
                  >
                    Open
                  </Link>
                  <a
                    href={`mailto:${item.donor?.email || ""}`}
                    style={{ ...styles.btnOutlinePrimary, flex: '1 1 48%' }}
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminSearchListedFood;
