import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster } from 'react-hot-toast';

// Import your components...
import UserHome from "./components/User/UserHome";
import AboutUs from "./components/User/AboutUs";
import ContactUs from "./components/User/ContactUs";
import AvailableFood from "./components/User/AvailableFood";
import RequestFood from "./components/User/RequestFood";
import MyRequests from "./components/User/MyRequests";

import Login from "./components/Common/Login";
import RegisterDonor from "./components/Common/RegisterDonor";
import UpdateProfile from "./components/Common/UpdateProfile";
import ChangePassword from "./components/Common/ChangePassword";

import AdminDashboard from "./components/Admin/AdminDashboard";
import ListedFood from "./components/Admin/ListedFood";
import ManageStates from "./components/Admin/ManageStates";
import ManageCities from "./components/Admin/ManageCities";
import RegFoodDonors from "./components/Admin/RegFoodDonors";
import FoodRequests from "./components/Admin/FoodRequests";
import Reports from "./components/Admin/Reports";
import AdminSearchListedFood from "./components/Admin/AdminSearchListedFood";
import AdminEnquiries from "./components/Admin/AdminEnquiries";

import DonorDashboard from "./components/Donor/DonorDashboard";
import DonorRequests from "./components/Donor/DonorRequests";
import ListFoodDetail from "./components/Donor/ListFoodDetail";
import MyListedFood from "./components/Donor/MyListedFood";
import DonorProfile from "./components/Donor/DonorProfile";


const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState(localStorage.getItem("userRole") || "");

  useEffect(() => {
    setRole(localStorage.getItem("userRole") || "");
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const styles = {
    nav: {
      padding: '14px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      fontSize: '1rem',
      fontWeight: '600',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    brand: {
      fontWeight: 'bold',
      fontSize: '1.5rem',
      color: 'inherit',
      cursor: 'pointer',
      textDecoration: 'none',
    },
    navLinks: {
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
    },
    navLink: {
      color: 'inherit',
      textDecoration: 'none',
      cursor: 'pointer',
      padding: '6px 10px',
      borderRadius: '6px',
      transition: 'background-color 0.3s ease',
    },
    navLinkHover: {
      backgroundColor: 'rgba(255,255,255,0.15)',
    },
    btnLogout: {
      border: '2px solid currentColor',
      backgroundColor: 'transparent',
      color: 'inherit',
      borderRadius: '6px',
      padding: '6px 14px',
      cursor: 'pointer',
      fontWeight: '700',
      transition: 'background-color 0.3s ease, color 0.3s ease',
    },
    btnLogoutHover: {
      backgroundColor: '#0a3c78',
      color: 'white',
    },
  };

  // Hover states for links and button
  const [hoveredLink, setHoveredLink] = useState(null);
  const [hoverLogout, setHoverLogout] = useState(false);

  // Define color themes based on role
  const themeColors = {
    PUBLIC: {
      backgroundColor: '#34699a',
      color: 'white',
    },
    ADMIN: {
      backgroundColor: '#bf3f3f',
      color: 'white',
    },
    DONOR: {
      backgroundColor: '#3f6fbf',
      color: 'white',
    },
  };

  let theme = themeColors.PUBLIC;
  let brandText = "Food Waste Management";
  if (role === "ADMIN") {
    theme = themeColors.ADMIN;
    brandText = "ADMIN PANEL";
  } else if (role === "DONOR") {
    theme = themeColors.DONOR;
    brandText = "DONOR PANEL";
  }

  const publicLinks = [
    { to: '/', label: 'Home' },
    { to: '/food-available', label: 'Available Food' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/login', label: 'Login' },
    { to: '/register-donor', label: 'Register as Donor' },
    { to: '/my-requests', label: 'My Requests' },
  ];

  const adminLinks = [
    { to: '/admin/dashboard', label: 'Dashboard' },
    { to: '/admin/states', label: 'States' },
    { to: '/admin/cities', label: 'Cities' },
    { to: '/admin/reg-donors', label: 'Donors' },
    { to: '/admin/listed-food', label: 'Listed Food' },
    { to: '/admin/search-listed-food', label: 'Search Listed Food' },
    { to: '/admin/food-requests', label: 'Food Requests' },
    { to: '/admin/enquiries', label: 'Enquiries' },
    { to: '/admin/reports', label: 'Reports' },
  ];

  const donorLinks = [
    { to: '/donor/dashboard', label: 'Dashboard' },
    { to: '/donor/list-food', label: 'List Food' },
    { to: '/donor/my-listed-food', label: 'My Listed Food' },
    { to: '/food-available', label: 'Available Food' },
    { to: '/donor/profile', label: 'My Profile' },
    { to: '/donor/requests', label: 'Requests' },
    { to: '/my-requests', label: 'My Requests' },
  ];

  const links = role === "ADMIN" ? adminLinks : role === "DONOR" ? donorLinks : publicLinks;

  return (
    <nav style={{ ...styles.nav, ...theme }}>
      <div style={styles.container}>
        <Link to={role === "ADMIN" ? "/admin/dashboard" : role === "DONOR" ? "/donor/dashboard" : "/"} style={styles.brand}>
          {brandText}
        </Link>
        <div style={styles.navLinks}>
          {links.map(({ to, label }, index) => (
            <Link
              key={to}
              to={to}
              style={{
                ...styles.navLink,
                ...(hoveredLink === index ? styles.navLinkHover : {}),
              }}
              onMouseEnter={() => setHoveredLink(index)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {label}
            </Link>
          ))}
          {(role === 'ADMIN' || role === 'DONOR') && (
            <button
              style={{
                ...styles.btnLogout,
                ...(hoverLogout ? styles.btnLogoutHover : {}),
              }}
              onClick={handleLogout}
              onMouseEnter={() => setHoverLogout(true)}
              onMouseLeave={() => setHoverLogout(false)}
              aria-label="Logout"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    const path = window.location.pathname;

    if (role === "ADMIN" && !path.startsWith("/admin")) {
      navigate("/admin/dashboard");
    } else if (
      role === "DONOR" &&
      !path.startsWith("/donor") &&
      path !== "/food-available" &&
      path !== "/my-requests"
    ) {
      navigate("/donor/dashboard");
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <Toaster position="top-right" />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<UserHome />} />
        <Route path="/food-available" element={<AvailableFood />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-donor" element={<RegisterDonor />} />
        <Route path="/request-food/:id" element={<RequestFood />} />
        <Route path="/my-requests" element={<MyRequests />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/states" element={<ManageStates />} />
        <Route path="/admin/cities" element={<ManageCities />} />
        <Route path="/admin/reg-donors" element={<RegFoodDonors />} />
        <Route path="/admin/listed-food" element={<ListedFood />} />
        <Route path="/admin/search-listed-food" element={<AdminSearchListedFood />} />
        <Route path="/admin/food-requests" element={<FoodRequests />} />
        <Route path="/admin/enquiries" element={<AdminEnquiries />} />
        <Route path="/admin/reports" element={<Reports />} />

        {/* DONOR ROUTES */}
        <Route path="/donor/dashboard" element={<DonorDashboard />} />
        <Route path="/donor/list-food" element={<ListFoodDetail />} />
        <Route path="/donor/my-listed-food" element={<MyListedFood />} />
        <Route path="/donor/profile" element={<DonorProfile />} />
        <Route path="/donor/requests" element={<DonorRequests />} />

        {/* COMMON ROUTES */}
        <Route path="/update-profile/:id" element={<UpdateProfile />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
