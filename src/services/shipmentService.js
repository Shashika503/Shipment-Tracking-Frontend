import axios from "axios";

const API_BASE = "http://localhost:8080/api"; // Adjust as per your backend URL

// Track Shipment by Tracking ID
export const trackShipment = async (trackingId, customerId) => {
  return axios.get(`${API_BASE}/shipments/track/${trackingId}`, {
    params: { customerId }, // Add customerId as a query parameter
  });
};


// Reschedule Delivery
export const rescheduleDelivery = async (shipmentId, data) => {
  return axios.put(`${API_BASE}/shipments/${shipmentId}/reschedule`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};