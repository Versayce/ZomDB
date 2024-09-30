const fs = require('fs');
const { savePlayerData } = require('./database');

// Function to read player data from the JSON file
function readPlayerData() {
    fs.readFile('/path/to/player_data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading player data file:', err);
            return;
        }

        try {
            const playerList = JSON.parse(data);
            playerList.forEach(playerData => {
                savePlayerData(playerData);  // Save each player's data to the database
            });
        } catch (error) {
            console.error('Error parsing player data JSON:', error);
        }
    });
}

// Run this function at intervals (e.g., every 5 minutes)
setInterval(readPlayerData, 5 * 60 * 1000);  // Every 5 minutes
