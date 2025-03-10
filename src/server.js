require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(express.json()); // ✅ Allows JSON body parsing
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// ✅ Request Logging Middleware (Place it here)
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Connect to Database
connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes")); // ✅ Ensure this line is present

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
