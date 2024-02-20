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
// Middleware for JSON body parsing
app.use(express.json());

// To allow requests from your web application's origin
const corsOptions = {
  origin: "https://cmf-wud5.onrender.com",
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(
  cors({
    origin: "http://localhost:3001", // Your frontend URL
  })
);

//dotenv config
require("dotenv").config();

// Connect to MongoDB
connectDB();

// Routes
app.use(cors(corsOptions));
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
