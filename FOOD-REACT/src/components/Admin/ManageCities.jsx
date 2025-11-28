import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ManageCities = () => {
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [formData, setFormData] = useState({ name: '', state: { id: '' } });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/states`).then(res => setStates(res.data));
    fetchCities();
  }, []);

  const fetchCities = () => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/cities`)
      .then(res => setCities(res.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      axios.put(`${import.meta.env.VITE_BACKEND_URL}/cities/${editingId}`, formData)
        .then(() => {
          fetchCities();
          setEditingId(null);
          setFormData({ name: '', state: { id: '' } });
        });
    } else {
      axios.post(`${import.meta.env.VITE_BACKEND_URL}/cities`, formData)
        .then(() => {
          fetchCities();
          setFormData({ name: '', state: { id: '' } });
        });
    }
  };

  const handleEdit = (city) => {
    setFormData({ name: city.name, state: { id: city.state ? city.state.id : '' } });
    setEditingId(city.id);
  };

  const handleDelete = (id) => {
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/cities/${id}`)
      .then(fetchCities);
  };

  const styles = {
    container: {
      maxWidth: '700px',
      margin: '40px auto',
      padding: '0 20px 40px',
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
    form: {
      backgroundColor: '#f9fafb',
      padding: '24px',
      borderRadius: '14px',
      boxShadow: '0 6px 20px rgba(52, 105, 154, 0.1)',
      marginBottom: '36px',
    },
    formGroup: {
      marginBottom: '20px',
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      marginBottom: '8px',
      fontWeight: '600',
      fontSize: '1rem',
      color: '#333',
    },
    input: {
      padding: '12px 16px',
      fontSize: '1rem',
      borderRadius: '10px',
      border: '1.8px solid #ced4da',
      outline: 'none',
      boxSizing: 'border-box',
      transition: 'border-color 0.3s',
    },
    select: {
      padding: '12px 14px',
      fontSize: '1rem',
      borderRadius: '10px',
      border: '1.8px solid #ced4da',
      outline: 'none',
      boxSizing: 'border-box',
      transition: 'border-color 0.3s',
      backgroundColor: 'white',
      appearance: 'none',
      cursor: 'pointer',
    },
    inputFocus: {
      borderColor: '#34699a',
      boxShadow: '0 0 8px rgba(52,105,154,0.5)',
    },
    submitBtn: {
      width: '100%',
      padding: '14px',
      fontWeight: '700',
      fontSize: '1.1rem',
      color: 'white',
      backgroundColor: '#34699a',
      borderRadius: '12px',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 8px 20px rgba(52,105,154,0.3)',
      transition: 'background-color 0.3s ease',
    },
    submitBtnHover: {
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
  const [submitHover, setSubmitHover] = useState(false);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Manage Cities</h2>
      <form onSubmit={handleSubmit} style={styles.form} noValidate>
        <div style={styles.formGroup}>
          <label htmlFor="cityName" style={styles.label}>City Name</label>
          <input
            id="cityName"
            type="text"
            required
            style={styles.input}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            onFocus={e => { e.target.style.borderColor = '#34699a'; e.target.style.boxShadow = '0 0 8px rgba(52,105,154,0.5)'; }}
            onBlur={e => { e.target.style.borderColor = '#ced4da'; e.target.style.boxShadow = 'none'; }}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="stateSelect" style={styles.label}>State</label>
          <select
            id="stateSelect"
            required
            style={styles.select}
            value={formData.state.id}
            onChange={(e) => setFormData({ ...formData, state: { id: e.target.value } })}
            onFocus={e => { e.target.style.borderColor = '#34699a'; e.target.style.boxShadow = '0 0 8px rgba(52,105,154,0.5)'; }}
            onBlur={e => { e.target.style.borderColor = '#ced4da'; e.target.style.boxShadow = 'none'; }}
          >
            <option value="">Select State</option>
            {states.map(state => (
              <option key={state.id} value={state.id}>{state.name}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          style={submitHover ? { ...styles.submitBtn, ...styles.submitBtnHover } : styles.submitBtn}
          onMouseEnter={() => setSubmitHover(true)}
          onMouseLeave={() => setSubmitHover(false)}
        >
          {editingId ? 'Update' : 'Add'}
        </button>
      </form>

      <div style={styles.tableWrapper}>
        <table style={styles.table} aria-label="Manage Cities Table">
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>State</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cities.map(city => (
              <tr key={city.id} style={styles.tr}>
                <td style={styles.td}>{city.id}</td>
                <td style={styles.td}>{city.name}</td>
                <td style={styles.td}>{city.state ? city.state.name : ''}</td>
                <td style={{ ...styles.td, ...styles.actionButtons }}>
                  <button
                    style={editHover === city.id ? { ...styles.btn, ...styles.btnEdit, ...styles.btnEditHover } : { ...styles.btn, ...styles.btnEdit }}
                    onClick={() => handleEdit(city)}
                    onMouseEnter={() => setEditHover(city.id)}
                    onMouseLeave={() => setEditHover(null)}
                    aria-label={`Edit city ${city.name}`}
                  >
                    <EditIcon fontSize="small" />
                  </button>
                  <button
                    style={deleteHover === city.id ? { ...styles.btn, ...styles.btnDelete, ...styles.btnDeleteHover } : { ...styles.btn, ...styles.btnDelete }}
                    onClick={() => handleDelete(city.id)}
                    onMouseEnter={() => setDeleteHover(city.id)}
                    onMouseLeave={() => setDeleteHover(null)}
                    aria-label={`Delete city ${city.name}`}
                  >
                    <DeleteIcon fontSize="small" />
                  </button>
                </td>
              </tr>
            ))}
            {cities.length === 0 && (
              <tr>
                <td colSpan="4" style={{ ...styles.td, textAlign: 'center', color: '#999', padding: '24px' }}>
                  No cities found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCities;
