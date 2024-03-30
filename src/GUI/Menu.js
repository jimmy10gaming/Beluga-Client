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
            background: linear-gradient(to right, #0072C6, #808080, #000000);
            border-radius: 2.5vh;
            display: flex;
            flex-direction: column;
            padding: 2vh;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
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
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
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
        id="SCMM-MODULES">
            <div style="
                background-color: rgba(255, 255, 255, 0.1);
                padding: 1.5vh 2vw;
                border-radius: 1vh;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                transition: transform 0.3s ease;
            ">
                <h3 style="
                    font-size: 2.5vh;
                    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
                ">Module 1</h3>
                <p style="
                    font-size: 1.8vh;
                    color: #ccc;
                ">Description of Module 1</p>
            </div>
            <div style="
                background-color: rgba(255, 255, 255, 0.1);
                padding: 1.5vh 2vw;
                border-radius: 1vh;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                transition: transform 0.3s ease;
            ">
                <h3 style="
                    font-size: 2.5vh;
                    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
                ">Module 2</h3>
                <p style="
                    font-size: 1.8vh;
                    color: #ccc;
                ">Description of Module 2</p>
            </div>
        </div>
        `;
    document.body.appendChild(Holder);
    Holder.appendChild(Menu);

    SetupModules();
  } else {
    document.getElementById("SCMM").remove();
    isMenuOpen = false;
  }
}