import React, { useState } from "react";
import { rescheduleDelivery } from "../../services/shipmentService";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Grid,
} from "@mui/material";

const RescheduleDelivery = () => {
  const [shipmentId, setShipmentId] = useState(0);
  const [rescheduleData, setRescheduleData] = useState({
    newDate: "",
    instructions: "",
  });

  const handleChange = (e) => {
    setRescheduleData({ ...rescheduleData, [e.target.name]: e.target.value });
  };

  const handleReschedule = async () => {
    if (!shipmentId || !rescheduleData.newDate) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Validate that the new date is not in the past
    const currentDate = new Date();
    const selectedDate = new Date(rescheduleData.newDate);

    // Reset time for comparison
    currentDate.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < currentDate) {
      toast.error("The new delivery date cannot be in the past.");
      return;
    }

    try {
      await rescheduleDelivery(shipmentId, rescheduleData);
      toast.success("Delivery rescheduled successfully!");
    } catch (error) {
      toast.error("Failed to reschedule delivery.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Reschedule Delivery
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Shipment ID"
              value={shipmentId}
              onChange={(e) => setShipmentId(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="New Delivery Date"
              type="date"
              name="newDate"
              InputLabelProps={{ shrink: true }}
              value={rescheduleData.newDate}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Custom Instructions"
              name="instructions"
              multiline
              rows={4}
              value={rescheduleData.instructions}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={handleReschedule}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RescheduleDelivery;
