import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DonorProfile = () => {
  const [profile, setProfile] = useState({
    name: '', email: '', phone: '', address: '', city: { name: '', state: { name: '' } }
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`)
      .then(res => {
        setProfile(res.data);
        setEditForm(res.data);
      })
      .catch(() => alert('Failed to load profile'));
  }, [userId, navigate]);

  const handleUpdate = () => {
    axios.put(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`, editForm)
      .then(res => {
        setProfile(res.data);
        setIsEditing(false);
        alert('Profile updated successfully!');
      })
      .catch(() => alert('Update failed'));
  };

  const styles = {
    container: {
      maxWidth: '700px',
      margin: '40px auto',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#2e2e2e',
      backgroundColor: '#f9fafb',
      borderRadius: '16px',
      boxShadow: '0 6px 20px rgba(52, 105, 154, 0.1)',
      padding: '36px',
    },
    header: {
      backgroundColor: '#34699a',
      color: 'white',
      borderRadius: '12px 12px 0 0',
      padding: '20px',
      textAlign: 'center',
      fontSize: '1.9rem',
      fontWeight: '700',
      marginBottom: '36px',
    },
    avatarCircle: {
      backgroundColor: '#e6ecf9',
      width: '120px',
      height: '120px',
      fontSize: '56px',
      fontWeight: '700',
      color: '#34699a',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '0 auto 32px',
      userSelect: 'none',
      boxShadow: '0 4px 14px rgba(52,105,154,0.2)',
      letterSpacing: '2px',
    },
    row: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '24px',
      marginBottom: '8px',
    },
    colFull: {
      flex: '1 1 100%',
      fontSize: '1.05rem',
    },
    label: {
      fontWeight: '600',
      marginRight: '6px',
      color: '#555',
    },
    strongText: {
      fontWeight: '700',
      color: '#34699a',
    },
    textCenter: {
      textAlign: 'center',
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      marginTop: '40px',
    },
    button: {
      padding: '12px 34px',
      fontSize: '1.1rem',
      fontWeight: '700',
      borderRadius: '10px',
      cursor: 'pointer',
      border: 'none',
      transition: 'background-color 0.3s ease',
    },
    buttonEdit: {
      backgroundColor: '#f0ad4e',
      color: 'white',
    },
    buttonEditHover: {
      backgroundColor: '#ec971f',
    },
    buttonSave: {
      backgroundColor: '#34699a',
      color: 'white',
    },
    buttonSaveHover: {
      backgroundColor: '#265384',
    },
    buttonCancel: {
      backgroundColor: '#6c757d',
      color: 'white',
    },
    buttonCancelHover: {
      backgroundColor: '#565e64',
    },
    formRow: {
      display: 'flex',
      gap: '20px',
      flexWrap: 'wrap',
      marginBottom: '24px',
    },
    formColHalf: {
      flex: '1 1 48%',
      minWidth: '150px',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      fontSize: '1rem',
      color: '#555',
    },
    input: {
      padding: '10px 14px',
      borderRadius: '8px',
      border: '1.8px solid #ced4da',
      outline: 'none',
      fontSize: '1rem',
      transition: 'border-color 0.3s',
    },
    textarea: {
      padding: '10px 14px',
      borderRadius: '8px',
      border: '1.8px solid #ced4da',
      outline: 'none',
      fontSize: '1rem',
      resize: 'vertical',
      minHeight: '80px',
      transition: 'border-color 0.3s',
    },
  };

  const [hoverEdit, setHoverEdit] = useState(false);
  const [hoverSave, setHoverSave] = useState(false);
  const [hoverCancel, setHoverCancel] = useState(false);

  return (
    <div style={styles.container}>
      <div style={styles.header}>My Profile</div>

      {!isEditing ? (
        <>
          <div style={styles.avatarCircle}>
            {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
          </div>

          <div style={styles.row}>
            <div style={styles.colFull}><span style={styles.label}>Name:</span> <span style={styles.strongText}>{profile.name}</span></div>
            <div style={styles.colFull}><span style={styles.label}>Email:</span> {profile.email}</div>
            <div style={styles.colFull}><span style={styles.label}>Phone:</span> {profile.phone}</div>
            <div style={styles.colFull}><span style={styles.label}>Address:</span> {profile.address}</div>
            <div style={styles.colFull}><span style={styles.label}>Location:</span> {profile.city?.name}, {profile.city?.state?.name}</div>
            <div style={styles.colFull}><span style={styles.label}>User ID:</span> {userId}</div>
          </div>

          <div style={styles.buttonGroup}>
            <button
              style={hoverEdit ? { ...styles.button, ...styles.buttonEditHover } : { ...styles.button, ...styles.buttonEdit }}
              onClick={() => setIsEditing(true)}
              onMouseEnter={() => setHoverEdit(true)}
              onMouseLeave={() => setHoverEdit(false)}
              aria-label="Edit Profile"
            >
              Edit Profile
            </button>
          </div>
        </>
      ) : (
        <>
          <h4 style={{ textAlign: 'center', marginBottom: '32px', color: '#34699a' }}>Edit Profile</h4>

          <div style={styles.formRow}>
            <div style={styles.formColHalf}>
              <div style={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  style={styles.input}
                  value={editForm.name || ''}
                  onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                />
              </div>
            </div>

            <div style={styles.formColHalf}>
              <div style={styles.formGroup}>
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  type="text"
                  style={styles.input}
                  value={editForm.phone || ''}
                  onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              rows="3"
              style={styles.textarea}
              value={editForm.address || ''}
              onChange={e => setEditForm({ ...editForm, address: e.target.value })}
            />
          </div>

          <div style={styles.buttonGroup}>
            <button
              style={hoverSave ? { ...styles.button, ...styles.buttonSaveHover } : { ...styles.button, ...styles.buttonSave }}
              onClick={handleUpdate}
              onMouseEnter={() => setHoverSave(true)}
              onMouseLeave={() => setHoverSave(false)}
            >
              Save Changes
            </button>
            <button
              style={hoverCancel ? { ...styles.button, ...styles.buttonCancelHover } : { ...styles.button, ...styles.buttonCancel }}
              onClick={() => setIsEditing(false)}
              onMouseEnter={() => setHoverCancel(true)}
              onMouseLeave={() => setHoverCancel(false)}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DonorProfile;
