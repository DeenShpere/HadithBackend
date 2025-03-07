require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const API_URL = "https://hadithapi.com/api/hadiths";
const API_KEY = process.env.API_KEY;

// Serve Hadith Data
const serveHadiths = async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/?apiKey=${API_KEY}`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Hadiths:", error.message);
    res.status(500).json({ error: "Failed to fetch Hadiths" });
  }
};

app.get("/api/hadiths", serveHadiths);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
