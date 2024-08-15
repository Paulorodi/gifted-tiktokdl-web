const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve the static HTML file
app.use(express.static(path.join(__dirname)));

// Endpoint to handle TikTok video download requests
app.get('/api/download', async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ success: false, message: 'TikTok video URL is required' });
    }

    try {
        const apiUrl = `https://gifted-apis.vercel.app/download/tiktok?url=${encodeURIComponent(url)}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.status === 200 && data.success) {
            res.json({ success: true, url: data.url });
        } else {
            res.status(500).json({ success: false, message: 'Failed to obtain the video download URL' });
        }
    } catch (error) {
        console.error("Error fetching video download URL:", error);
        res.status(500).json({ success: false, message: 'An error occurred while fetching the video download URL' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
