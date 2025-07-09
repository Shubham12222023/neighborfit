const express = require("express");
const router = express.Router();
const Neighborhood = require("../models/Neighborhood");

router.post("/", async (req, res) => {
  const prefs = req.body;

  try {
    const allNeighborhoods = await Neighborhood.find();

    const scored = allNeighborhoods.map(n => {
      let score = 0;

      if (prefs.rent >= n.rent) score += 3;
      if (prefs.safety <= n.safety) score += 2;
      if (prefs.transport <= n.transport) score += 2;
      if (prefs.greenery <= n.greenery) score += 2;
      if (prefs.nightlife === n.nightlife) score += 1;

      return { ...n._doc, score };
    });

    scored.sort((a, b) => b.score - a.score);

    res.json(scored.slice(0, 3));
  } catch (err) {
    console.error("❌ Match Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
