import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const RegFoodDonors = () => {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/donors`)
      .then(res => setDonors(res.data));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`)
      .then(() => setDonors(donors.filter(d => d.id !== id)));
  };

  const styles = {
    container: {
      maxWidth: '1000px',
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
      textAlign: 'center',
    },
    tableWrapper: {
      overflowX: 'auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '1rem',
      minWidth: '800px',
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
    tbody: {},
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
      borderRadius: '6px',
      width: '32px',
      height: '32px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'background-color 0.3s ease',
    },
    btnEdit: {
      backgroundColor: '#f0ad4e',
      color: 'white',
    },
    btnEditHover: {
      backgroundColor: '#ec971f',
    },
    btnDelete: {
      backgroundColor: '#dc3545',
      color: 'white',
    },
    btnDeleteHover: {
      backgroundColor: '#b52b2b',
    },
  };

  const [editHover, setEditHover] = useState(null);
  const [deleteHover, setDeleteHover] = useState(null);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Registered Food Donors</h2>
      <div style={styles.tableWrapper}>
        <table style={styles.table} aria-label="Registered Food Donors Table">
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Address</th>
              <th style={styles.th}>City</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody style={styles.tbody}>
            {donors.map(donor => (
              <tr key={donor.id} style={styles.tr}>
                <td style={styles.td}>{donor.id}</td>
                <td style={styles.td}>{donor.name}</td>
                <td style={styles.td}>{donor.email}</td>
                <td style={styles.td}>{donor.phone}</td>
                <td style={styles.td}>{donor.address}</td>
                <td style={styles.td}>{donor.city ? donor.city.name : ''}</td>
                <td style={{ ...styles.td, ...styles.actionButtons }}>
                  <Link
                    to={`/update-profile/${donor.id}`}
                    style={{
                      ...styles.btn,
                      ...styles.btnEdit,
                      ...(editHover === donor.id ? styles.btnEditHover : {})
                    }}
                    onMouseEnter={() => setEditHover(donor.id)}
                    onMouseLeave={() => setEditHover(null)}
                    aria-label={`Edit ${donor.name}'s profile`}
                  >
                    <EditIcon fontSize="small" />
                  </Link>
                  <button
                    style={{
                      ...styles.btn,
                      ...styles.btnDelete,
                      ...(deleteHover === donor.id ? styles.btnDeleteHover : {})
                    }}
                    onClick={() => handleDelete(donor.id)}
                    onMouseEnter={() => setDeleteHover(donor.id)}
                    onMouseLeave={() => setDeleteHover(null)}
                    aria-label={`Delete ${donor.name}`}
                  >
                    <DeleteIcon fontSize="small" />
                  </button>
                </td>
              </tr>
            ))}
            {donors.length === 0 && (
              <tr>
                <td colSpan="7" style={{ ...styles.td, textAlign: 'center', color: '#999', padding: '24px' }}>
                  No donors registered yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegFoodDonors;
