require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(express.json()); // ✅ Allows JSON body parsing
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// ✅ Request Logging Middleware (Logs incoming requests)
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Connect to Database
connectDB()
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", authRoutes); // ✅ Authentication routes
app.use("/api/users", userRoutes); // ✅ User-related routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
