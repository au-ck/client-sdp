import React, { useState } from 'react';
import axios from 'axios';

const DonorSearch = () => {
  const [requestNumber, setRequestNumber] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/search-food-request?requestNumber=${requestNumber}`)
      .then(res => setResults(res.data))
      .catch(err => {
        console.error(err);
        setResults([]);
      });
  };

  const styles = {
    container: {
      maxWidth: '900px',
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
    form: {
      marginBottom: '32px',
      display: 'flex',
      gap: '12px',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    input: {
      flex: '1 1 200px',
      padding: '12px 14px',
      fontSize: '1rem',
      borderRadius: '8px',
      border: '1.8px solid #ced4da',
      outline: 'none',
      transition: 'border-color 0.3s',
      boxSizing: 'border-box',
      minWidth: '200px',
    },
    inputFocus: {
      borderColor: '#34699a',
      boxShadow: '0 0 6px rgba(52,105,154,0.5)',
    },
    button: {
      padding: '12px 28px',
      fontSize: '1rem',
      borderRadius: '10px',
      border: 'none',
      backgroundColor: '#34699a',
      color: '#fff',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      minWidth: '120px',
    },
    buttonHover: {
      backgroundColor: '#265384',
    },
    tableWrapper: {
      overflowX: 'auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '1rem',
      minWidth: '600px',
    },
    th: {
      backgroundColor: '#34699a',
      color: 'white',
      padding: '12px 16px',
      textAlign: 'left',
      fontWeight: '700',
    },
    td: {
      borderBottom: '1px solid #ddd',
      padding: '12px 16px',
      color: '#333',
    },
    trStriped: {
      backgroundColor: '#f9faff',
    },
    trHover: {
      backgroundColor: '#e5efff',
    },
  };

  const [hoveredButton, setHoveredButton] = React.useState(false);
  const [hoveredRowIndex, setHoveredRowIndex] = React.useState(null);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Search</h2>
      <form onSubmit={handleSearch} style={styles.form}>
        <input
          type="number"
          required
          placeholder="Enter Request Number"
          style={styles.input}
          value={requestNumber}
          onChange={(e) => setRequestNumber(e.target.value)}
          onFocus={e => e.target.style.borderColor = '#34699a'}
          onBlur={e => e.target.style.borderColor = '#ced4da'}
        />
        <button
          type="submit"
          style={hoveredButton ? { ...styles.button, ...styles.buttonHover } : styles.button}
          onMouseEnter={() => setHoveredButton(true)}
          onMouseLeave={() => setHoveredButton(false)}
        >
          Search
        </button>
      </form>
      <div style={styles.tableWrapper}>
        <table style={styles.table} aria-label="Search Results">
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Requester Name</th>
              <th style={styles.th}>Food Item</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {results.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ ...styles.td, textAlign: 'center' }}>
                  No results found.
                </td>
              </tr>
            ) : (
              results.map((result, index) => (
                <tr
                  key={result.id}
                  style={index % 2 === 0 ? styles.trStriped : null}
                  onMouseEnter={() => setHoveredRowIndex(index)}
                  onMouseLeave={() => setHoveredRowIndex(null)}
                  // Highlight hovered row
                  {...(hoveredRowIndex === index ? { style: { ...styles.trStriped, ...styles.trHover } } : {})}
                >
                  <td style={styles.td}>{result.id}</td>
                  <td style={styles.td}>{result.requesterName}</td>
                  <td style={styles.td}>{result.foodItem?.description || 'N/A'}</td>
                  <td style={styles.td}>{result.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonorSearch;
