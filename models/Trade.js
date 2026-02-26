const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  asset: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["buy", "sell"],
    required: true
  },
  entry: {
    type: Number,
    required: true
  },
  exit: {
    type: Number
  },
  quantity: {
    type: Number,
    required: true
  },
  profit: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String
  }
});

module.exports = mongoose.model("Trade", tradeSchema);
