export function Init(name) {
    const Data = JSON.parse(localStorage.getItem("SCMM-MODS"));
    const ModuleIndex = Data.findIndex((e) => e.name === name);
    if (ModuleIndex !== 1 && !Data[ModuleIndex].enabled) {

        ModAPI.require("player")
        ModAPI.addEventListener("update", function (){
          ModAPI.displayToChat({msg: ModAPI.player.experience})
        })

    } else {
        console.log("Disabled Mod")
    }
}