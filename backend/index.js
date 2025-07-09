require('dotenv').config(); // ✅ Always at the top

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.DB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Import and use match route
const matchRoute = require('./routes/match');
app.use('/api/match', matchRoute); // ✅ Only this

// ✅ Test route
app.get("/", (req, res) => {
  res.send("NeighborFit API is running");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
