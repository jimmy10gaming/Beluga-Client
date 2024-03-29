export function Init(name) {
    const Data = JSON.parse(localStorage.getItem("SCMM-MODS"));
    const ModuleIndex = Data.findIndex((e) => e.name === name);

    if (ModuleIndex !== 1 && !Data[ModuleIndex].enabled) {
        
        ModAPI.require("player");

        ModAPI.displayToChat({ msg: "Death Position Enabled" });

        ModAPI.addEventListener("playerdeath", () => {
            const player = ModAPI.player;
            const playerPos = player.getPositionVector();
            const x = Math.round(playerPos.x);
            const y = Math.round(playerPos.y);
            const z = Math.round(playerPos.z);

            ModAPI.displayToChat({
                msg: `You died at coordinates: X: ${x}, Y: ${y}, Z: ${z}`
            });
        });
        
    } else {
        console.log("Disabled Mod");
    }
}