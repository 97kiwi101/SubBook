require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// [FIXED] CORS Setup
// This allows both your specific Client Origin (Netlify) AND Localhost development
const allowedOrigins = [
  process.env.CLIENT_ORIGIN
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) === -1) {
        // Optional: Allow all localhost connections during dev if exact port varies
        if (origin.includes("localhost")) {
             return callback(null, true);
        }
        
        var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true
  })
);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ Error:", error));

const authRoutes = require('./routes/auth');
const shiftRoutes = require('./routes/shifts');

app.use('/api/auth', authRoutes);
// [IMPORTANT] Note this path: '/api/shifts'
app.use('/api/shifts', shiftRoutes); 

app.get("/", (req, res) => {
  res.send("Shift Coverage API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});