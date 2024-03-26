ModAPI.require("player");

let XP = {};
let int;

export function Init(name) {
    const Data = JSON.parse(localStorage.getItem("SCMM-MODS"));
    const ModuleIndex = Data.findIndex((e) => e.name === name);
    const XpHud = document.getElementById("SCMM-XpHud");


    if (ModuleIndex !== 1 && !Data[ModuleIndex].enabled) {
        //start of the "enabled" stuff
        int = setInterval(() => {
      if (document.getElementById("SCMM-Keystrokes")) {
        const XP = ModAPI.player.eXPerienceTotal();
           XP.forEach((Area) => {
          const element = document.getElementById(`${Area}Area`);
          if (element && XP[Area]) {
            element.style.color = "black";
            element.style.background = "rgba(255, 255, 255, 0.5)";
          } else {
            element.style.color = "white";
            element.style.background = "rgba(0, 0, 0, 0.5)";
          }
        });
      }
    }, 10);

    const XP = document.createElement("div");
        XP.id = "SCMM-XpHud"
        XP.style = `font-size: 4vh;transform: translate(200px, -173px);display: grid;width: fit-content;height: fit-content;position: absolute;right: 0;bottom: 0;grid-template-areas: ". XP ." "Percent Needed";gap: 5px;`;
        XP.innerHTML = `<div id="XPMaxAndTotal" style="border-radius: 1vh;min-height: 6vh;min-width: 6vh;display: flex;justify-content: center;align-items: center;font-family: 'Minecraftia';grid-area: XP;">XP amount/XP Total</div>
        <div id="Percent" style="border-radius: 1vh;min-height: 6vh;min-width: 6vh;display: flex;justify-content: center;align-items: center;font-family: 'Minecraftia';grid-area: Percent;">Percent</div>
        <div id="Needed" style="border-radius: 1vh;min-height: 6vh;min-width: 6vh;display: flex;justify-content: center;align-items: center;font-family: 'Minecraftia';grid-area: Needed;">Needed</div>`
    document.body.appendChild(XP);
        //end of the Endabled stuff
    } else {
        //start of Disabled code
     if (int) clearInterval(int);
    if (XpHud) XpHud.remove();        
    //end of disabled code 
    }
}