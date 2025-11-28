import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContactUs = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/pages/title/Contact Us`)
      .then(res => {
        const fetchedContent = res.data?.content?.trim();
        if (fetchedContent) {
          setContent(fetchedContent);
        } else {
          setContent('<p>No content available at the moment.</p>');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load content. Please try again later.');
        setLoading(false);
      });
  }, []);

  const styles = {
    container: {
      maxWidth: '780px',
      margin: '40px auto',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#2e2e2e',
      backgroundColor: '#f9fafb',
      borderRadius: '14px',
      boxShadow: '0 6px 20px rgba(52, 105, 154, 0.1)',
      lineHeight: 1.6,
      fontSize: '1.05rem',
      minHeight: '300px',
    },
    loadingText: {
      textAlign: 'center',
      color: '#7a9bc9',
      fontSize: '1.2rem',
      paddingTop: '80px',
    },
    errorText: {
      textAlign: 'center',
      color: '#b34747',
      fontWeight: '600',
      fontSize: '1.2rem',
      paddingTop: '80px',
    },
  };

  if (loading) {
    return <div style={styles.container}><p style={styles.loadingText}>Loading content, please wait...</p></div>;
  }

  if (error) {
    return <div style={styles.container}><p style={styles.errorText}>{error}</p></div>;
  }

  return (
    <div style={styles.container} dangerouslySetInnerHTML={{ __html: content }} />
  );
};

export default ContactUs;
