export function Init(name) {
    const Data = JSON.parse(localStorage.getItem("SCMM-MODS"));
    const ModuleIndex = Data.findIndex((e) => e.name === name);

    if (ModuleIndex !== 1 && !Data[ModuleIndex].enabled) {
        ModAPI.require("player");

        // Override the default death screen
        ModAPI.addEventListener("playerDeath", (playerDeathEvent) => {
            // Get the player's coordinates
            const player = ModAPI.player;
            const playerPos = player.getPositionVector();
            const x = Math.round(playerPos.x);
            const y = Math.round(playerPos.y);
            const z = Math.round(playerPos.z);

            // Display the coordinates on the death screen
            ModAPI.displayToChat({
                msg: `You died at coordinates: X: ${x}, Y: ${y}, Z: ${z}`
            });
        });
    } else {
        console.log("Disabled Mod");
    }
}