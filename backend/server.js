require("dotenv").config(); // Load environment variables
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors()); // Allow frontend to access API

const API_KEY = process.env.NEWS_API_KEY; // 

app.get("/news", async (req, res) => {
    try {
        const category = req.query.category || "general";
        const response = await axios.get("https://newsapi.org/v2/top-headlines", {
            params: { category, country: "us", apiKey: API_KEY } // 
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch news", details: error.message });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

