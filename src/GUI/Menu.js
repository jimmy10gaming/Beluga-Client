const { SetupModules } = require("./Modules");
const { LogoData } = require("../ModulesList");

let isMenuOpen = false;

export function CreateMenu() {
  if (!isMenuOpen) {
    isMenuOpen = true;

    const Holder = document.createElement("div");
    Holder.style =
      "backdrop-filter: blur(2px); width: fit-content; height: fit-content; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);";
    Holder.id = "SCMM";
    const Menu = document.createElement("div");
    Menu.style = `
            width: 65vw;
            height: 70vh;
            background: radial-gradient(circle, rgba(255,0,0,1) 0%, rgba(255,154,0,1) 10%, rgba(208,222,33,1) 20%, rgba(79,220,74,1) 30%, rgba(63,218,216,1) 40%, rgba(47,201,226,1) 50%, rgba(28,127,238,1) 60%, rgba(95,21,242,1) 70%, rgba(186,12,248,1) 80%, rgba(251,7,217,1) 90%, rgba(255,0,0,1) 100%);
            border-radius: 2.5vh;
            display: flex;
            flex-direction: column;
            padding: 2vh;
        `;
    Menu.innerHTML = `
        <div style="
            display: flex;
            flex-direction: row;
            align-items: center;
            height: fit-content;
            width: 100%;
            color: #fff;
            gap: 1.5vw;
            font-family: 'Minecraftia', sans-serif;"
            margin-bottom: 1vh;
        >
            <img style="
                width:  20vh; 
                height: 20vh;" 
            src="${LogoData}">
            <h1 style="
                font-size: 4vh;
            ">Fracticle Client</h1>
        </div>
        <div style="
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            flex-direction: row;
            align-items: center;
            height: fit-content;
            width: 100%;
            color: #fff;
            gap: 1.5vw;
            font-family: 'Minecraftia', sans-serif;" 
        id="SCMM-MODULES"></div>
        `;
    document.body.appendChild(Holder);
    Holder.appendChild(Menu);

    SetupModules();
  } else {
    document.getElementById("SCMM").remove();
    isMenuOpen = false;
  }
}