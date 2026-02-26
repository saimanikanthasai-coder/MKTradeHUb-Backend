const express = require("express");
const Trade = require("../models/Trade");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/* ---------------- CREATE TRADE ---------------- */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const trade = new Trade({
      ...req.body,
      user: req.user.id
    });

    await trade.save();
    res.status(201).json(trade);

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

/* ---------------- GET ALL TRADES ---------------- */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const trades = await Trade.find({ user: req.user.id });
    res.json(trades);

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

/* ---------------- UPDATE TRADE ---------------- */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const trade = await Trade.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!trade) {
      return res.status(404).json({ message: "Trade not found" });
    }

    res.json(trade);

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

/* ---------------- DELETE TRADE ---------------- */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    console.log("PARAM ID:", req.params.id);
    console.log("USER ID:", req.user.id);

    const trade = await Trade.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    console.log("TRADE FOUND:", trade);

    if (!trade) {
      return res.status(404).json({ message: "Trade not found" });
    }

    res.json({ message: "Trade deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


module.exports = router;
