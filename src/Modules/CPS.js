export function Init(name) {
    const Data = JSON.parse(localStorage.getItem("SCMM-MODS"));
    const ModuleIndex = Data.findIndex((e) => e.name === name);

    if (ModuleIndex !== 1 && !Data[ModuleIndex].enabled) {
        
        function displayPlayerExpInfo() {
            const playerExp = ModAPI.player.getExperience(); // Get player's current experience
            const expNeeded = ModAPI.player.getExpNeeded(); // Get experience needed for next level
            const expTillLevelUp = expNeeded - playerExp; // Calculate experience needed till level up
            const percentage = Math.floor((playerExp / expNeeded) * 100); // Calculate percentage progress
        
            const expInfo = `${playerExp}/${expNeeded} (${percentage}%) ${expTillLevelUp}`;
            
            // Style the box with black background and green text
            const styledExpInfo = `%c${expInfo}`;
            const style = 'background-color: black; color: green; padding: 5px; border-radius: 5px;';
            }

    } else {
        console.log("Disabled Mod")
    }
}