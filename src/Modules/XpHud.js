export function Init(name) {
    const Data = JSON.parse(localStorage.getItem("SCMM-MODS"));
    const ModuleIndex = Data.findIndex((e) => e.name === name);

    if (ModuleIndex !== 1 && !Data[ModuleIndex].enabled) {
        ModAPI.require("player");

        // Display a message in the chat when the mod is enabled
        ModAPI.displayToChat({
            msg: "Death Position Enabled"
        });

        // Listen for the playerDeath event
        ModAPI.addEventListener("playerDeath", () => {
            // Get the player's coordinates
            const player = ModAPI.player;
            const playerPos = player.getPositionVector();
            const x = Math.round(playerPos.x);
            const y = Math.round(playerPos.y);
            const z = Math.round(playerPos.z);

            // Display the coordinates in the chat
            ModAPI.displayToChat({
                msg: `You died at coordinates: X: ${x}, Y: ${y}, Z: ${z}`
            });
        });
    } else {
        console.log("Disabled Mod");
    }
}