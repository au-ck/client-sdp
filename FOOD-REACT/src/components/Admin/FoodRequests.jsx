import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const FoodRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/food-requests`)
      .then(res => setRequests(res.data));
  }, []);

  const handleUpdateStatus = (id, status) => {
    axios.put(`${import.meta.env.VITE_BACKEND_URL}/food-requests/${id}/status`, status, { headers: { 'Content-Type': 'text/plain' } })
      .then(() => setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r)));
  };

  const styles = {
    container: {
      maxWidth: '1000px',
      margin: '40px auto',
      padding: '0 20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#2e2e2e',
    },
    header: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#34699a',
      marginBottom: '32px',
      textAlign: 'center',
    },
    tableWrapper: {
      overflowX: 'auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      minWidth: '900px',
      fontSize: '1rem',
    },
    thead: {
      backgroundColor: '#34699a',
      color: 'white',
    },
    th: {
      padding: '12px 16px',
      textAlign: 'left',
      fontWeight: '700',
      borderBottom: '2px solid #2d527d',
    },
    tr: {
      borderBottom: '1px solid #ddd',
    },
    td: {
      padding: '12px 16px',
      verticalAlign: 'middle',
      color: '#3a3a3a',
    },
    actionButtons: {
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
    },
    btn: {
      cursor: 'pointer',
      border: 'none',
      borderRadius: '8px',
      width: '36px',
      height: '36px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '24px',
      transition: 'background-color 0.3s ease',
      color: 'white',
    },
    btnCompleted: {
      backgroundColor: '#198754', // green
    },
    btnCompletedHover: {
      backgroundColor: '#136937',
    },
    btnRejected: {
      backgroundColor: '#dc3545', // red
    },
    btnRejectedHover: {
      backgroundColor: '#a32b2b',
    },
  };

  const [hoverCompletedId, setHoverCompletedId] = React.useState(null);
  const [hoverRejectedId, setHoverRejectedId] = React.useState(null);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Food Requests</h2>
      <div style={styles.tableWrapper}>
        <table style={styles.table} aria-label="Food Requests Table">
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Address</th>
              <th style={styles.th}>Food Item</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(request => (
              <tr key={request.id} style={styles.tr}>
                <td style={styles.td}>{request.id}</td>
                <td style={styles.td}>{request.requesterName}</td>
                <td style={styles.td}>{request.requesterEmail}</td>
                <td style={styles.td}>{request.requesterPhone}</td>
                <td style={styles.td}>{request.requesterAddress}</td>
                <td style={styles.td}>{request.foodItem ? request.foodItem.description : ''}</td>
                <td style={styles.td}>{request.status}</td>
                <td style={{ ...styles.td, ...styles.actionButtons }}>
                  <button
                    style={hoverCompletedId === request.id
                      ? { ...styles.btn, ...styles.btnCompletedHover }
                      : { ...styles.btn, ...styles.btnCompleted }}
                    onMouseEnter={() => setHoverCompletedId(request.id)}
                    onMouseLeave={() => setHoverCompletedId(null)}
                    onClick={() => handleUpdateStatus(request.id, 'COMPLETED')}
                    aria-label={`Mark request ${request.id} as completed`}
                  >
                    <CheckIcon style={{ fontSize: 20 }} />
                  </button>
                  <button
                    style={hoverRejectedId === request.id
                      ? { ...styles.btn, ...styles.btnRejectedHover }
                      : { ...styles.btn, ...styles.btnRejected }}
                    onMouseEnter={() => setHoverRejectedId(request.id)}
                    onMouseLeave={() => setHoverRejectedId(null)}
                    onClick={() => handleUpdateStatus(request.id, 'REJECTED')}
                    aria-label={`Reject request ${request.id}`}
                  >
                    <CloseIcon style={{ fontSize: 20 }} />
                  </button>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td style={{ ...styles.td, textAlign: 'center', color: '#999', padding: '24px' }} colSpan="8">
                  No food requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FoodRequests;
