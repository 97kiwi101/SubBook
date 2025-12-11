require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      process.env.CLIENT_ORIGIN,        // Your Netlify URL (Production)
      "http://localhost:5173",          // Vite Localhost
      "http://localhost:3000",          // React Localhost
      "http://localhost:3001"           // Your Custom Localhost
    ];

    if (allowedOrigins.indexOf(origin) === -1) {
      // Optional: Strict mode (blocks unknown origins)
      // return callback(new Error('CORS Policy: Origin not allowed'), false);
      
      // For now, let's be permissive to ensure it works:
      return callback(null, true); 
    }
    return callback(null, true);
  },
  credentials: true
}));

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