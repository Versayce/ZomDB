local json = require "json"

-- Function to collect player data
function collectPlayerData(player)
    if not player then
        return nil
    end

    -- Pull player data using Project Zomboid's Lua API
    local playerData = {
        username = player:getUsername() or "Unknown",
        health = player:getBodyDamage():getHealth() or 0,
        hunger = player:getStats():getHunger() or 0,
        thirst = player:getStats():getThirst() or 0,
        endurance = player:getStats():getEndurance() or 0
    }

    return playerData
end

-- Function to write player data to a file
function writePlayerDataToFile(playerData)
    -- grab filepath in the .env file
    local filePath = os.getenv("JSON_DATA_FILEPATH")
    local file, err = io.open(filePath, "w")

    if file then
        file:write(json.encode(playerData))
        file:close()
        print("Player data successfully written to " .. filePath)
    else
        print("Error: Could not open file to write player data. Reason: " .. tostring(err))
    end
end

-- Function to collect all online players' data and write to a file
function getAllOnlinePlayers()
    local players = getOnlinePlayers()  -- Get all online players
    local playerList = {}

    for i = 0, players:size() - 1 do
        local player = players:get(i)
        local playerData = collectPlayerData(player)
        if playerData then
            table.insert(playerList, playerData)
        end
    end

    -- Write the collected data to a file
    writePlayerDataToFile(playerList)
end

-- Hook to run every 10 minutes to update the player data file
Events.EveryTenMinutes.Add(getAllOnlinePlayers)
