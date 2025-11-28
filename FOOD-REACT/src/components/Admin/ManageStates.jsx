import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ManageStates = () => {
  const [states, setStates] = useState([]);
  const [formData, setFormData] = useState({ name: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = () => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/states`)
      .then(res => setStates(res.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      axios.put(`${import.meta.env.VITE_BACKEND_URL}/states/${editingId}`, formData)
        .then(() => {
          fetchStates();
          setEditingId(null);
          setFormData({ name: '' });
        });
    } else {
      axios.post(`${import.meta.env.VITE_BACKEND_URL}/states`, formData)
        .then(() => {
          fetchStates();
          setFormData({ name: '' });
        });
    }
  };

  const handleEdit = (state) => {
    setFormData({ name: state.name });
    setEditingId(state.id);
  };

  const handleDelete = (id) => {
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/states/${id}`)
      .then(fetchStates);
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
      transition: 'border-color 0.3s',
      boxSizing: 'border-box',
    },
    inputFocus: {
      borderColor: '#34699a',
      boxShadow: '0 0 8px rgba(52,105,154,0.5)',
    },
    submitBtn: {
      padding: '14px 0',
      backgroundColor: '#34699a',
      color: 'white',
      fontWeight: '700',
      fontSize: '1.1rem',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      width: '100%',
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
      minWidth: '500px',
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
      <h2 style={styles.header}>Manage States</h2>
      <form onSubmit={handleSubmit} style={styles.form} noValidate>
        <div style={styles.formGroup}>
          <label htmlFor="stateName" style={styles.label}>State Name</label>
          <input
            id="stateName"
            type="text"
            required
            style={styles.input}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            onFocus={e => e.target.style.borderColor = '#34699a'}
            onBlur={e => e.target.style.borderColor = '#ced4da'}
          />
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
        <table style={styles.table} aria-label="Manage States Table">
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {states.map(state => (
              <tr key={state.id} style={styles.tr}>
                <td style={styles.td}>{state.id}</td>
                <td style={styles.td}>{state.name}</td>
                <td style={{ ...styles.td, ...styles.actionButtons }}>
                  <button
                    style={editHover === state.id ? { ...styles.btn, ...styles.btnEdit, ...styles.btnEditHover } : { ...styles.btn, ...styles.btnEdit }}
                    onClick={() => handleEdit(state)}
                    onMouseEnter={() => setEditHover(state.id)}
                    onMouseLeave={() => setEditHover(null)}
                    aria-label={`Edit state ${state.name}`}
                  >
                    <EditIcon fontSize="small" />
                  </button>

                  <button
                    style={deleteHover === state.id ? { ...styles.btn, ...styles.btnDelete, ...styles.btnDeleteHover } : { ...styles.btn, ...styles.btnDelete }}
                    onClick={() => handleDelete(state.id)}
                    onMouseEnter={() => setDeleteHover(state.id)}
                    onMouseLeave={() => setDeleteHover(null)}
                    aria-label={`Delete state ${state.name}`}
                  >
                    <DeleteIcon fontSize="small" />
                  </button>
                </td>
              </tr>
            ))}
            {states.length === 0 && (
              <tr>
                <td style={{ ...styles.td, textAlign: 'center', color: '#999', padding: '24px' }} colSpan="3">
                  No states found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageStates;
