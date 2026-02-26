const cors = require("cors");
const Trade = require("./models/Trade");
const User = require("./models/User");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();



const app = express();
app.use(cors());


// Middleware
app.use(express.json());

app.use(cors({
  origin:"*"
}));

const tradeRoutes = require("./routes/trade");
app.use("/api/trades", tradeRoutes);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  family: 4
})
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("Connection Error ❌", err));

// Basic Route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const authMiddleware = require("./middleware/authMiddleware");

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You accessed protected route 🔐",
    user: req.user
  });
});
