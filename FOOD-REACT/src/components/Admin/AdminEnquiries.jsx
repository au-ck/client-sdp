import React, { useEffect, useState } from "react";

const AdminEnquiries = () => {
  const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080/api";
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState("backend"); // backend | mock
  const [error, setError] = useState(null);

  useEffect(() => {
    const tryFetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const endpoints = [`${BACKEND}/enquiries`, `${BACKEND}/admin/enquiries`];
        let got = null;
        for (const ep of endpoints) {
          try {
            const res = await fetch(ep);
            if (res.ok) {
              const data = await res.json();
              got = data;
              break;
            }
          } catch {
            // ignore and try next
          }
        }
        if (!got) {
          setSource("mock");
          setEnquiries([
            { id: 1, name: "Ravi", email: "ravi@example.com", message: "How do I donate?", resolved: false },
            { id: 2, name: "Sita", email: "sita@example.com", message: "My request was not approved", resolved: false }
          ]);
        } else {
          setSource("backend");
          setEnquiries(Array.isArray(got) ? got : [got]);
        }
      } catch (err) {
        console.error("Enquiries load failed:", err);
        setError("Failed to load enquiries; using local mock.");
        setSource("mock");
        setEnquiries([
          { id: 1, name: "Ravi", email: "ravi@example.com", message: "How do I donate?", resolved: false },
          { id: 2, name: "Sita", email: "sita@example.com", message: "My request was not approved", resolved: false }
        ]);
      } finally {
        setLoading(false);
      }
    };
    tryFetch();
  }, [BACKEND]);

  const toggleResolved = (id) => {
    setEnquiries(prev => prev.map(q => q.id === id ? { ...q, resolved: !q.resolved } : q));
  };

  const deleteEnquiry = (id) => {
    setEnquiries(prev => prev.filter(q => q.id !== id));
  };

  const styles = {
    container: {
      maxWidth: "900px",
      margin: "40px auto",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#2e2e2e",
      padding: "0 20px 40px",
    },
    header: {
      fontSize: "2rem",
      fontWeight: "700",
      color: "#34699a",
      marginBottom: "24px",
      textAlign: "center",
    },
    loadingWrapper: {
      textAlign: "center",
      padding: "40px 0",
      fontSize: "1.2rem",
      color: "#7a9bc9",
    },
    infoBox: {
      backgroundColor: "#d1ecf1",
      color: "#0c5460",
      padding: "16px 20px",
      borderRadius: "12px",
      fontWeight: "600",
      marginBottom: "20px",
      textAlign: "center",
      fontSize: "1.1rem",
    },
    dataSourceText: {
      fontSize: "0.9rem",
      color: "#7a9bc9",
      marginBottom: "8px",
    },
    errorBox: {
      backgroundColor: "#fff3cd",
      color: "#856404",
      padding: "12px 18px",
      borderRadius: "12px",
      marginBottom: "20px",
      textAlign: "center",
      fontWeight: "600",
      fontSize: "1rem",
    },
    listGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    listItem: (resolved) => ({
      padding: "16px 20px",
      borderRadius: "12px",
      backgroundColor: resolved ? "#d4edda" : "#fff3cd",
      boxShadow: '0 4px 10px rgba(52, 105, 154, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }),
    listHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontWeight: "700",
      fontSize: "1.1rem",
      marginBottom: "6px",
      color: "#2e2e2e",
    },
    nameEmailGroup: {
      display: "flex",
      flexDirection: "column",
    },
    name: {
      fontWeight: "700",
      color: '#34699a',
    },
    email: {
      fontSize: "0.9rem",
      color: "#6c757d",
    },
    message: {
      fontSize: "1rem",
      color: "#2e2e2e",
      whiteSpace: "pre-wrap",
    },
    badge: (resolved) => ({
      backgroundColor: resolved ? "#198754" : "#ffc107",
      color: resolved ? "white" : "#212529",
      padding: "6px 14px",
      borderRadius: "20px",
      fontWeight: "700",
      fontSize: "0.85rem",
      textAlign: "center",
      userSelect: "none",
      minWidth: "70px",
    }),
    buttonGroup: {
      display: "flex",
      gap: "12px",
      marginTop: "10px",
      flexWrap: "wrap",
    },
    button: {
      padding: "8px 16px",
      fontSize: "0.9rem",
      fontWeight: "600",
      borderRadius: "10px",
      cursor: "pointer",
      border: "2px solid transparent",
      transition: "background-color 0.3s ease, color 0.3s ease",
      userSelect: "none",
    },
    btnPrimary: {
      backgroundColor: "transparent",
      borderColor: "#34699a",
      color: "#34699a",
    },
    btnPrimaryHover: {
      backgroundColor: "#34699a",
      color: "white",
    },
    btnDanger: {
      backgroundColor: "transparent",
      borderColor: "#dc3545",
      color: "#dc3545",
    },
    btnDangerHover: {
      backgroundColor: "#dc3545",
      color: "white",
    },
    btnSecondary: {
      backgroundColor: "transparent",
      borderColor: "#6c757d",
      color: "#6c757d",
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
    }
  };

  const [hoverBtn, setHoverBtn] = useState(null);
  const [hoverDel, setHoverDel] = useState(null);
  const [hoverReply, setHoverReply] = useState(null);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Admin Enquiries</h2>

      {loading && (
        <div style={styles.loadingWrapper}>Loading enquiries...</div>
      )}

      {!loading && (
        <>
          <div style={styles.dataSourceText}>
            Data source: <strong>{source}</strong>
          </div>
          {error && <div style={styles.errorBox}>{error}</div>}

          {enquiries.length === 0 ? (
            <div style={styles.infoBox}>No enquiries found.</div>
          ) : (
            <div style={styles.listGroup}>
              {enquiries.map(q => (
                <div 
                  key={q.id} 
                  style={styles.listItem(q.resolved)}
                  aria-live="polite"
                >
                  <div style={styles.listHeader}>
                    <div style={styles.nameEmailGroup}>
                      <h6 style={styles.name}>{q.name || q.requesterName || "Anonymous"}</h6>
                      <small style={styles.email}>{q.email || q.requesterEmail || "—"}</small>
                    </div>

                    <span style={styles.badge(q.resolved)}>
                      {q.resolved ? "Resolved" : "Open"}
                    </span>
                  </div>

                  <p style={styles.message}>{q.message || q.msg || q.requesterAddress || "No message"}</p>

                  <div style={styles.buttonGroup}>
                    <button
                      style={hoverBtn === q.id ? {...styles.button, ...styles.btnPrimaryHover } : {...styles.button, ...styles.btnPrimary }}
                      onClick={() => toggleResolved(q.id)}
                      onMouseEnter={() => setHoverBtn(q.id)}
                      onMouseLeave={() => setHoverBtn(null)}
                      aria-label={q.resolved ? `Re-open enquiry by ${q.name}` : `Mark enquiry by ${q.name} as resolved`}
                    >
                      {q.resolved ? "Re-open" : "Mark Resolved"}
                    </button>
                    <button
                      style={hoverDel === q.id ? {...styles.button, ...styles.btnDangerHover } : {...styles.button, ...styles.btnDanger }}
                      onClick={() => deleteEnquiry(q.id)}
                      onMouseEnter={() => setHoverDel(q.id)}
                      onMouseLeave={() => setHoverDel(null)}
                      aria-label={`Delete enquiry by ${q.name}`}
                    >
                      Delete
                    </button>
                    <a
                      href={`mailto:${q.email || ""}`}
                      style={styles.btnSecondary}
                      onMouseEnter={() => setHoverReply(q.id)}
                      onMouseLeave={() => setHoverReply(null)}
                      aria-label={`Reply to enquiry by ${q.name}`}
                    >
                      Reply
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminEnquiries;
