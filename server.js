const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

app.use(cors({
  origin: "*"
}));

// Routes
const tradeRoutes = require("./routes/trade");
const authRoutes = require("./routes/auth");

app.use("/api/trades", tradeRoutes);
app.use("/api/auth", authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { family: 4 })
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("Connection Error ❌", err));

// Test Route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Protected test route
const authMiddleware = require("./middleware/authMiddleware");
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You accessed protected route 🔐",
    user: req.user
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});