import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DonorRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let donorId = localStorage.getItem('userId');

    // Fallback donor ID (change as per your DB)
    if (!donorId || donorId === 'null' || donorId === 'undefined') {
      donorId = "2";
      console.log("Demo Mode: Using fallback donor ID =", donorId);
    }

    setLoading(true);

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/food-items/donor/${donorId}`)
      .then(res => {
        if (!res.data || res.data.length === 0) {
          setRequests([]);
          setLoading(false);
          return;
        }

        const foodIds = res.data.map(f => f.id);
        const promises = foodIds.map(id =>
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/food-requests/food-item/${id}`)
        );

        Promise.all(promises)
          .then(responses => {
            const allRequests = responses.flatMap(r => r.data);
            setRequests(allRequests);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      })
      .catch(() => {
        console.log("No food items found for this donor.");
        setRequests([]);
        setLoading(false);
      });
  }, []);

  const styles = {
    container: {
      maxWidth: '960px',
      margin: '40px auto',
      padding: '0 20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#2e2e2e',
    },
    header: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#34699a',
      marginBottom: '24px',
      textAlign: 'center',
    },
    tableContainer: {
      overflowX: 'auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '1rem',
      minWidth: '600px',
    },
    thead: {
      backgroundColor: '#34699a',
      color: 'white',
    },
    th: {
      padding: '12px 16px',
      textAlign: 'left',
      fontWeight: '700',
    },
    tbodyRow: {
      borderBottom: '1px solid #ddd',
    },
    tbodyRowAlternate: {
      backgroundColor: '#f9faff',
    },
    td: {
      padding: '12px 16px',
      verticalAlign: 'middle',
    },
    badge: (status) => {
      let bgColor = '';
      switch (status) {
        case 'ACCEPTED':
          bgColor = '#198754'; // green
          break;
        case 'REJECTED':
          bgColor = '#dc3545'; // red
          break;
        case 'COMPLETED':
          bgColor = '#6c757d'; // gray/dark
          break;
        default:
          bgColor = '#ffc107'; // yellow warning
      }
      return {
        backgroundColor: bgColor,
        color: 'white',
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '0.85rem',
        fontWeight: '600',
        display: 'inline-block',
      };
    },
    button: {
      padding: '6px 12px',
      fontSize: '0.9rem',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'background-color 0.3s',
    },
    buttonAccept: {
      backgroundColor: '#198754',
      color: 'white',
    },
    buttonReject: {
      backgroundColor: '#dc3545',
      color: 'white',
    },
    buttonDelivered: {
      backgroundColor: '#6c757d',
      color: 'white',
    },
    buttonDisabled: {
      backgroundColor: '#dee2e6',
      color: '#6c757d',
      cursor: 'not-allowed',
    }
  };

  // Functions for statuses
  const handleUpdateStatus = (id, status) => {
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/food-requests/${id}/status`,
        `"${status}"`,
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(() => {
        setRequests(prev =>
          prev.map(r => (r.id === id ? { ...r, status } : r))
        );
      })
      .catch(() => alert("Status update failed"));
  };

  if (loading) {
    return (
      <div style={{ ...styles.container, minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            width: '40px', height: '40px',
            border: '4px solid #ccc',
            borderTopColor: '#198754',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ marginTop: '16px', fontSize: '1.2rem', color: '#34699a' }}>Loading your donation requests...</p>
        </div>
        <style>
          {`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}
        </style>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>My Donation Requests</h2>

      {requests.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', borderRadius: '12px', backgroundColor: '#f0f4f9' }}>
          <p style={{ fontSize: '1.5rem', color: '#999' }}>No requests yet</p>
          <p>Once someone requests your food, it will appear here!</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.th}>#</th>
                <th style={styles.th}>Requester</th>
                <th style={styles.th}>Food Item</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, index) => (
                <tr key={req.id} style={index % 2 === 0 ? null : { backgroundColor: '#f9faff' }}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>
                    <strong>{req.requesterName}</strong>
                    <br />
                    <small style={{ color: '#6c757d' }}>{req.requesterPhone}</small>
                  </td>
                  <td style={styles.td}>{req.foodItem?.foodType || 'N/A'}</td>
                  <td style={styles.td}>
                    <span style={styles.badge(req.status)}>{req.status}</span>
                  </td>
                  <td style={styles.td}>
                    {req.status === 'PENDING' && (
                      <>
                        <button
                          style={{ ...styles.button, ...styles.buttonAccept, marginRight: '8px' }}
                          onClick={() => handleUpdateStatus(req.id, 'ACCEPTED')}
                        >
                          Accept
                        </button>
                        <button
                          style={{ ...styles.button, ...styles.buttonReject }}
                          onClick={() => handleUpdateStatus(req.id, 'REJECTED')}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {req.status === 'ACCEPTED' && (
                      <button
                        style={{ ...styles.button, ...styles.buttonDelivered }}
                        onClick={() => handleUpdateStatus(req.id, 'COMPLETED')}
                      >
                        Delivered
                      </button>
                    )}
                    {['REJECTED', 'COMPLETED'].includes(req.status) && (
                      <span style={{ marginLeft: '8px', color: '#28a745', fontSize: '0.9rem' }}>Done</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DonorRequests;
