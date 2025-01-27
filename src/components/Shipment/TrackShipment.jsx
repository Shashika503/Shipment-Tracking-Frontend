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
  
} from "@mui/material";

const TrackShipment = () => {
  const [trackingId, setTrackingId] = useState("");
  const [shipment, setShipment] = useState(null);

  // Assuming the logged-in customer's ID is available (e.g., from local storage)
  const customerId = localStorage.getItem("customerId");

  const handleTrack = async () => {
    try {
      const response = await trackShipment(trackingId, customerId);
      setShipment(response.data);
      toast.success("Shipment tracked successfully!");
    } catch (error) {
      const errorMessage =
      error.response?.data.message ? error.response?.data.message : error.response?.data || " tracking ID Field is empty";
      toast.error(errorMessage);
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
        {shipment && (
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <Typography variant="h6">Shipment Details</Typography>
              <Typography>Tracking ID: {shipment.trackingId}</Typography>
              <Typography>Status: {shipment.status}</Typography>
              <Typography>
                Estimated Delivery: {shipment.estimatedDelivery}
              </Typography>
              <Typography>Updates: {shipment.updates}</Typography>
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  );
};

export default TrackShipment;
