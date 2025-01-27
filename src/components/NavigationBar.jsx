import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"; // Check if authenticated
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // Clear authentication
    localStorage.removeItem("customerId"); // Clear customerId
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#333",
        color: "#fff",
      }}
    >
      <div>
        {!isAuthenticated && ( // Show Log In and Register links if not authenticated
          <>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "#fff", marginRight: "15px" }}
            >
              Log In
            </Link>
            <Link to="/register" style={{ textDecoration: "none", color: "#fff" }}>
              Register
            </Link>
          </>
        )}
        {isAuthenticated && ( // Show Logout button if authenticated
          <>
            <Link
              to="/track"
              style={{
                textDecoration: "none",
                color: "#fff",
                marginRight: "15px",
              }}
            >
              Track Shipments
            </Link>
            <Link
              to="/reschedule"
              style={{
                textDecoration: "none",
                color: "#fff",
                marginRight: "15px",
              }}
            >
              Reschedule Delivery
            </Link>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "transparent",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
