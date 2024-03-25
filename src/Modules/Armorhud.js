
let int;

export function ArmorStatsOn() {
  int = setInterval(() => {
    const armorDisplay = document.createElement("div");
    armorDisplay.id = "SCMM-ArmorStats";
    armorDisplay.style = `font-size: 2vh; transform: translate(-10%, -35%); display: grid; width: fit-content; height: fit-content; position: absolute; right: 0; bottom: 0; grid-template-areas: "Helmet Chestplate" "Leggings Boots"; gap: 5px;`;

    armorDisplay.innerHTML = `
      <div id="helmetStat" style="border-radius: 1vh; min-height: 6vh; min-width: 6vh; display: flex; justify-content: center; align-items: center; font-family: 'Minecraftia'; grid-area: Helmet;">Helmet: ${armorStats.helmet}</div>
      <div id="chestplateStat" style="border-radius: 1vh; min-height: 6vh; min-width: 6vh; display: flex; justify-content: center; align-items: center; font-family: 'Minecraftia'; grid-area: Chestplate;">Chestplate: ${armorStats.chestplate}</div>
      <div id="leggingsStat" style="border-radius: 1vh; min-height: 6vh; min-width: 6vh; display:flex; justify-content:center; align-items:center;font-family:'Minecraftia';grid-area:'Leggings';">Leggings:${armorStats.leggings}</div>
      <div id="bootsStat" style="border-radius:1vh;min-height:6vh;min-width:6vh;display:flex;justify-content:center;align-items:center;font-family:'Minecraftia';grid-area:'Boots';">Boots:${armorStats.boots}</div>`;

    document.body.appendChild(armorDisplay);
  }, 10);
}

export function UpdateArmorStats(piece, value) {
  if (armorStats.hasOwnProperty(piece)) {
    armorStats[piece] = value;
    const statElement = document.getElementById(`${piece}Stat`);
    if (statElement) statElement.innerText = `${piece.charAt(0).toUpperCase() + piece.slice(1)} : ${value}`;
  }
}

export function ArmorStatsOff() {
  if (int) clearInterval(int);
  
  const armorStatsDisplay = document.getElementById("SCMM-ArmorStats");
  
  if (armorStatsDisplay) {
    armorStatsDisplay.remove();
    Object.keys(armorStats).forEach(key => {
      armorStats[key] = 0;
    });
  }
}
