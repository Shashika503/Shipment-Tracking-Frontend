import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Register from "./components/Customer/Register";
import Login from "./components/Customer/Login";
import TrackShipment from "./components/Shipment/TrackShipment";
import RescheduleDelivery from "./components/Shipment/RescheduleDelivery";
import NavigationBar from "./components/NavigationBar"; // Import the navigation bar
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <div>
      <Router>
        <NavigationBar /> {/* Add the NavigationBar component */}
        <Routes>
          {/* Public Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/track"
            element={
              isAuthenticated ? (
                <TrackShipment />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/reschedule"
            element={
              isAuthenticated ? (
                <RescheduleDelivery />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Redirect unknown routes to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
      {/* Add the ToastContainer at the root level */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;
