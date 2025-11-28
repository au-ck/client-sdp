import React, { useState } from "react";
import axios from "axios";

const Reports = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [donatedFood, setDonatedFood] = useState([]); 
  const [donatedRaw, setDonatedRaw] = useState(null); 
  const [registeredDonors, setRegisteredDonors] = useState([]);
  const [loadingDonated, setLoadingDonated] = useState(false);
  const [loadingDonors, setLoadingDonors] = useState(false);
  const [error, setError] = useState(null);

  const backend = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080/api";

  function normalizeDonatedResponse(data) {
    if (!Array.isArray(data)) return [];
    if (data.length === 0) return [];

    const first = data[0];

    if (Array.isArray(first)) {
      return data.map(row => ({
        id: row[0],
        foodType: row[1],
        donorName: row[2],
        donatedDate: row[3],
        quantity: row[4],
      }));
    }

    return data.map(item => ({
      id: item.id ?? item[0] ?? null,
      foodType: item.foodType ?? item.food_type ?? item[1] ?? item.foodTypeName ?? item[1],
      donorName: item.donorName ?? item.donor_name ?? item[2] ?? item.donor ?? null,
      donatedDate: item.donatedDate ?? item.createdDate ?? item.date ?? item[3] ?? null,
      quantity: item.quantity ?? item.qty ?? item[4] ?? null,
      _raw: item,
    }));
  }

  const handleFetchDonatedFood = async (e) => {
    e?.preventDefault?.();
    setError(null);
    setDonatedFood([]);
    setDonatedRaw(null);

    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }

    setLoadingDonated(true);
    try {
      const res = await axios.get(`${backend}/admin/reports/donated-food`, {
        params: { start: startDate, end: endDate },
        validateStatus: status => status >= 200 && status < 500,
      });

      setDonatedRaw(res.data);

      let payload = res.data;
      if (payload && payload.data && Array.isArray(payload.data)) payload = payload.data;

      const rows = normalizeDonatedResponse(payload);
      setDonatedFood(rows);
      if ((rows.length === 0) && Array.isArray(payload) && payload.length > 0) {
        setError("Received data but couldn't normalize to rows — see raw JSON below.");
      }
    } catch (err) {
      console.error("Donated food fetch error:", err);
      setError("Failed to fetch donated-food report. See console for details.");
      setDonatedRaw(err?.response?.data ?? String(err));
    } finally {
      setLoadingDonated(false);
    }
  };

  const handleFetchRegisteredDonors = async () => {
    setError(null);
    setRegisteredDonors([]);
    setLoadingDonors(true);
    try {
      const res = await axios.get(`${backend}/admin/reports/registered-donors`, {
        validateStatus: status => status >= 200 && status < 500
      });
      setRegisteredDonors(Array.isArray(res.data) ? res.data : []);
      if (!Array.isArray(res.data)) {
        setDonatedRaw(res.data);
        setError("Registered donors endpoint returned unexpected shape — see raw JSON.");
      }
    } catch (err) {
      console.error("Registered donors error:", err);
      setError("Failed to fetch registered donors. See console for details.");
    } finally {
      setLoadingDonors(false);
    }
  };

  const styles = {
    container: {
      maxWidth: "960px",
      margin: "40px auto",
      padding: "0 20px 40px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#2e2e2e",
    },
    header: {
      fontSize: "2rem",
      fontWeight: "700",
      marginBottom: "24px",
      color: "#34699a",
      textAlign: "center",
    },
    card: {
      backgroundColor: "#f9fafb",
      borderRadius: "14px",
      boxShadow: "0 6px 20px rgba(52, 105, 154, 0.1)",
      padding: "24px",
      marginBottom: "36px",
    },
    cardTitle: {
      fontSize: "1.6rem",
      fontWeight: "600",
      color: "#2c3e50",
      marginBottom: "20px",
    },
    form: {
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
      alignItems: "center",
      marginBottom: "20px",
    },
    input: {
      flex: "1 1 140px",
      padding: "10px 14px",
      fontSize: "1rem",
      borderRadius: "10px",
      border: "1.8px solid #ced4da",
      outline: "none",
      boxSizing: "border-box",
      transition: "border-color 0.3s",
    },
    inputFocus: {
      borderColor: "#34699a",
      boxShadow: "0 0 8px rgba(52,105,154,0.5)",
    },
    buttonPrimary: {
      padding: "10px 28px",
      backgroundColor: "#34699a",
      color: "#fff",
      borderRadius: "12px",
      fontWeight: "700",
      fontSize: "1rem",
      border: "none",
      cursor: "pointer",
      boxShadow: "0 8px 20px rgba(52,105,154,0.3)",
      transition: "background-color 0.3s ease",
    },
    buttonPrimaryDisabled: {
      backgroundColor: "#8eaacf",
      cursor: "not-allowed",
    },
    buttonSecondary: {
      padding: "10px 28px",
      backgroundColor: "transparent",
      border: "2px solid #34699a",
      borderRadius: "12px",
      fontWeight: "700",
      fontSize: "1rem",
      color: "#34699a",
      cursor: "pointer",
      transition: "background-color 0.3s ease, color 0.3s ease",
    },
    buttonSecondaryHover: {
      backgroundColor: "#34699a",
      color: "#fff",
    },
    backendInfo: {
      marginLeft: "20px",
      color: "#7a9bc9",
      fontSize: "0.9rem",
      whiteSpace: "nowrap",
    },
    tableWrapper: {
      overflowX: "auto",
      marginTop: "16px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: "1rem",
      minWidth: "600px",
    },
    th: {
      backgroundColor: "#34699a",
      color: "white",
      padding: "12px 16px",
      fontWeight: "700",
      textAlign: "left",
    },
    td: {
      padding: "12px 16px",
      borderBottom: "1px solid #ddd",
      color: "#2e2e2e",
    },
    noDataRow: {
      color: "#999",
      textAlign: "center",
      padding: "24px",
    },
    rawJson: {
      maxHeight: 300,
      overflow: "auto",
      background: "#f8f9fa",
      padding: 12,
      fontSize: "0.9rem",
      whiteSpace: "pre-wrap",
      borderRadius: "8px",
      marginTop: "12px",
      fontFamily: "'Courier New', Courier, monospace",
      color: "#333",
    },
    errorBox: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      borderRadius: '10px',
      padding: '12px 16px',
      marginBottom: '20px',
      fontWeight: '600',
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Admin Reports</h2>

      {error && <div style={styles.errorBox}>{error}</div>}

      {/* Donated Food Report */}
      <div style={styles.card}>
        <h4 style={styles.cardTitle}>Donated Food Report</h4>

        <form onSubmit={handleFetchDonatedFood} style={styles.form}>
          <input
            type="date"
            style={styles.input}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            onFocus={e => { e.target.style.borderColor = '#34699a'; e.target.style.boxShadow = '0 0 8px rgba(52,105,154,0.5)'; }}
            onBlur={e => { e.target.style.borderColor = '#ced4da'; e.target.style.boxShadow = 'none'; }}
          />
          <input
            type="date"
            style={styles.input}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            onFocus={e => { e.target.style.borderColor = '#34699a'; e.target.style.boxShadow = '0 0 8px rgba(52,105,154,0.5)'; }}
            onBlur={e => { e.target.style.borderColor = '#ced4da'; e.target.style.boxShadow = 'none'; }}
          />
          <button
            type="submit"
            disabled={loadingDonated}
            style={
              loadingDonated
                ? { ...styles.buttonPrimary, ...styles.buttonPrimaryDisabled }
                : styles.buttonPrimary
            }
          >
            {loadingDonated ? "Fetching..." : "Fetch"}
          </button>
          <button
            type="button"
            style={styles.buttonSecondary}
            onClick={() => {
              setDonatedFood([]);
              setDonatedRaw(null);
              setError(null);
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#34699a'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#34699a'; }}
          >
            Clear
          </button>
          <div style={styles.backendInfo}>
            Backend: <code>{backend}/admin/reports/donated-food</code>
          </div>
        </form>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Food Type</th>
                <th style={styles.th}>Donor</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {donatedFood.length === 0 ? (
                <tr>
                  <td style={{ ...styles.td, ...styles.noDataRow }} colSpan={5}>
                    {loadingDonated ? "Loading..." : "No donated food found for selected dates."}
                  </td>
                </tr>
              ) : (
                donatedFood.map((r, i) => (
                  <tr key={r.id ?? i}>
                    <td style={styles.td}>{r.id}</td>
                    <td style={styles.td}>{r.foodType}</td>
                    <td style={styles.td}>{r.donorName ?? "—"}</td>
                    <td style={styles.td}>{r.donatedDate ? new Date(r.donatedDate).toLocaleDateString() : "—"}</td>
                    <td style={styles.td}>{r.quantity ?? "—"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {donatedRaw && (
          <div>
            <h6>Raw response (debug)</h6>
            <pre style={styles.rawJson}>
              {typeof donatedRaw === "string" ? donatedRaw : JSON.stringify(donatedRaw, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Registered donors */}
      <div style={styles.card}>
        <h4 style={styles.cardTitle}>Registered Donors</h4>

        <div style={{ marginBottom: '16px' }}>
          <button
            style={
              loadingDonors
                ? { ...styles.buttonPrimary, ...styles.buttonPrimaryDisabled, marginRight: '12px' }
                : { ...styles.buttonPrimary, marginRight: '12px' }
            }
            onClick={handleFetchRegisteredDonors}
            disabled={loadingDonors}
          >
            {loadingDonors ? "Fetching..." : "Fetch Donors"}
          </button>
          <button
            style={styles.buttonSecondary}
            onClick={() => setRegisteredDonors([])}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#34699a'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#34699a'; }}
          >
            Clear
          </button>
        </div>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
              </tr>
            </thead>
            <tbody>
              {registeredDonors.length === 0 ? (
                <tr>
                  <td style={{ ...styles.td, ...styles.noDataRow }} colSpan={3}>
                    No donors loaded
                  </td>
                </tr>
              ) : (
                registeredDonors.map(d => (
                  <tr key={d.id}>
                    <td style={styles.td}>{d.id}</td>
                    <td style={styles.td}>{d.name}</td>
                    <td style={styles.td}>{d.email}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export default Reports;
