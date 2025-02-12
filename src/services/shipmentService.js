import axios from "axios";

const API_BASE = "http://localhost:8080/api"; // Adjust as per your backend URL

// Track Shipment by Tracking ID
export const trackShipment = async (trackingId, customerId) => {
  try {
    const response = await axios.get(`${API_BASE}/shipments/track/${trackingId}`, {
      params: { customerId }, // Add customerId as a query parameter
    });
    return response.data; // Return the JSON response data
  } catch (error) {
    // Handle errors and return the error response in JSON format
    const errorMessage = error.response?.data?.message || "Tracking ID not found.";
    throw new Error(errorMessage);
  }
};

// Reschedule Delivery
export const rescheduleDelivery = async (trackingId, data) => {
  try {
    const response = await axios.put(`${API_BASE}/shipments/${trackingId}/reschedule`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // Return the JSON response data
  } catch (error) {
    // Handle errors and return the error response in JSON format
    const errorMessage = error.response?.data?.message || "Failed to reschedule delivery.";
    throw new Error(errorMessage);
  }
};
