export function Init(name) {
    const Data = JSON.parse(localStorage.getItem("SCMM-MODS"));
    const ModuleIndex = Data.findIndex((e) => e.name === name);

    if (ModuleIndex !== 1 && !Data[ModuleIndex].enabled) {
        // Minimap Mod functionality
        ModAPI.require("player");
        ModAPI.require("GlStateManager");
        ModAPI.require("ScaledResolution");

        // Toggle variable to enable/disable the minimap
        let isMinimapEnabled = true;

        ModAPI.addEventListener("sendchatmessage", function (event) {
            if (isMinimapEnabled) {
                // Minimap rendering code here
                const player = ModAPI.player;
                const resolution = new ModAPI.ScaledResolution();
                const width = resolution.getScaledWidth();
                const height = resolution.getScaledHeight();

                ModAPI.GlStateManager.pushMatrix();
                ModAPI.GlStateManager.translate(10, height - 10, 0);
                // Render the minimap here using ModAPI functions
                ModAPI.GlStateManager.popMatrix();
            }
        });

        // Add a function to toggle the minimap
        function ToggleMinimap() {
            isMinimapEnabled = !isMinimapEnabled;
            console.log(`Minimap is now ${isMinimapEnabled ? 'enabled' : 'disabled'}`);
        }
    } else {
        // Disable the minimap
        let isMinimapEnabled = false;
        console.log("Disabled Mod");
    }
}