require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Manual CORS (Allows frontend to talk to backend)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

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

app.get("/", (req, res) => {
  res.send("Shift Coverage API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});