const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");

// Import routes
const authRoutes = require("./routes/authRoutes");
const componentRoutes = require("./routes/backCompInv/componentRoutes");
const frontendComponentRoutes = require("./routes/frontCompInv/frontendComponentRoutes");
const projectRoutes = require("./routes/ProjectManegement/projectRoutes");
const dashboardRoutes = require("./routes/Dashboard/dashboardRoutes");
const clientMessageRoutes = require("./routes/Customer/clientMessageRoutes");
const customerTireRoutes = require("./routes/customerTireRoutes");

const allowedOrigins = [
  "http://localhost:3001",
  "https://cmf-wud5.onrender.com",
];

// Middleware for JSON body parsing
app.use(express.json());

// Dynamic CORS Configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    optionsSuccessStatus: 200, // For legacy browser support
  })
);

// dotenv config
require("dotenv").config();

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", componentRoutes);
app.use("/api", frontendComponentRoutes);
app.use("/api", projectRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api", clientMessageRoutes);
app.use("/api/customer-tires", customerTireRoutes);

// Start the server
const PORT = process.env.PORT || 2500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
