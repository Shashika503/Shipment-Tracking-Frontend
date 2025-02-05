import React, { useState } from "react";
import { trackShipment } from "../../services/shipmentService";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Card,
  CardContent,
  Chip,
} from "@mui/material";

const TrackShipment = () => {
  const [trackingId, setTrackingId] = useState("");
  const [shipment, setShipment] = useState(null);
  const [lastSearchedTrackingId, setLastSearchedTrackingId] = useState(null); // Store last searched tracking ID

  // Get logged-in customer ID
  const customerId = localStorage.getItem("customerId");

  const handleTrack = async () => {
    if (trackingId === lastSearchedTrackingId && shipment) {
      return;
    }
    try {
      const response = await trackShipment(trackingId, customerId);
      setShipment(response.data);
      setLastSearchedTrackingId(trackingId); // Store the last searched tracking ID
      toast.success("Shipment tracked successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Tracking ID Field is empty";
      toast.error(errorMessage);
    }
  };

  // Function to determine color based on status
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "in progress":
        return "warning"; // Yellow
      case "shipped":
        return "info"; // Blue
      case "in transit":
        return "secondary"; // Purple
      case "delivered":
        return "success"; // Green
      default:
        return "default"; // Gray
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Track Shipment
        </Typography>
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Tracking ID"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            required
          />
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleTrack}
            >
              Track
            </Button>
          </Box>
        </Box>

        {/* Display Shipment Details */}
        {shipment && (
  <Card sx={{ mt: 4, p: 3, borderRadius: 2, boxShadow: 3 }}>
    <CardContent>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Shipment Details
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="body1">
          <strong>Tracking ID:</strong> {shipment.trackingId}
        </Typography>
      </Box>

      {/* Delivery Date & Reschedule Date */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" fontWeight="bold">
          {shipment.rescheduledDate ? "Original Delivery Date" : "Delivery Date"}:
          <span style={{ fontWeight: "normal" }}> {shipment.createdDate}</span>
        </Typography>

        {shipment.rescheduledDate && (
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", color: "blue", mt: 2, mb: 3 }} // Added more spacing
          >
            Rescheduled Delivery Date: {shipment.estimatedDelivery}
          </Typography>
        )}
      </Box>

      {/* Order Status with Colored Badge */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Typography variant="body1" sx={{ mr: 1, fontWeight: "bold" }}>
          Delivery Status:
        </Typography>
        <Chip
          label={shipment.status}
          color={getStatusColor(shipment.status)}
          sx={{ fontWeight: "bold", px: 1.5, py: 0.5 }}
        />
      </Box>

      {/* Delivery Address */}
      <Typography variant="body1" sx={{ mb: 3 }}>
        <strong>Delivery Address:</strong> {shipment.customer.address}
      </Typography>

      {/* Show "Delivery Note" only if instructions exist */}
      {shipment.instructions && (
        <Typography
          variant="body1"
          sx={{
            backgroundColor: "#f0f0f0",
            p: 2,
            borderRadius: 1,
            fontStyle: "italic",
            mt: 3,
          }}
        >
          <strong>Delivery Note:</strong> {shipment.instructions}
        </Typography>
      )}
    </CardContent>
  </Card>
)}


      </Box>
    </Container>
  );
};

export default TrackShipment;
