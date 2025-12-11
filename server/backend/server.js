require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
  })
);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ Error:", error));

// Import Routes
const authRoutes = require('./routes/auth');
const shiftRoutes = require('./routes/shifts');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/shifts', shiftRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("Shift Coverage API is running...");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});