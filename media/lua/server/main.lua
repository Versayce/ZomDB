-- main.lua

-- Print a message to the console when the mod loads
print("ZomDB Mod is initializing...")

-- Require the player stats module to set up any event listeners or functionalities
local status, err = pcall(require, "playerStats")
if not status then
    print("Error loading playerStats module: " .. err)
else
    print("playerStats module loaded successfully.")
end
