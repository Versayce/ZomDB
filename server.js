const express = require('express');
const { savePlayerData, getPlayerData } = require('./readData');

const app = express();
app.use(express.json()); // For parsing application/json

// Endpoint to save player data (POST /api/player)
app.post('/api/player', (req, res) => {
    const playerData = req.body;

    try {
        savePlayerData(playerData);
        res.status(200).json({ message: 'Player data saved successfully' });
    } catch (error) {
        console.error('Error saving player data:', error);
        res.status(500).json({ error: 'Failed to save player data' });
    }
});

// Endpoint to get player data (GET /api/player/:username)
app.get('/api/player/:username', (req, res) => {
    const username = req.params.username;

    try {
        const playerData = getPlayerData(username);
        if (playerData) {
            res.status(200).json(playerData);
        } else {
            res.status(404).json({ error: 'Player not found' });
        }
    } catch (error) {
        console.error('Error retrieving player data:', error);
        res.status(500).json({ error: 'Failed to retrieve player data' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
