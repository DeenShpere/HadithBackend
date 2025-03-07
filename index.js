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


app.get("/quran", async (req, res) => {
    try {
        const response = await axios.get("http://api.alquran.cloud/v1/surah");
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Quran data" });
    }
});

app.get("/quran/:surahNumber", async (req, res) => {
    const surahNumber = req.params.surahNumber;
    try {
        console.log(`✅ Fetching Ayahs for Surah ${surahNumber}`);
        const response = await axios.get(`http://api.alquran.cloud/v1/surah/${surahNumber}`);
        console.log("✅ Sending Ayahs to frontend");
        res.json(response.data);
    } catch (error) {
        console.error(`❌ Error fetching Ayahs for Surah ${surahNumber}:`, error.message);
        res.status(500).json({ error: "Failed to fetch Ayahs" });
    }
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
