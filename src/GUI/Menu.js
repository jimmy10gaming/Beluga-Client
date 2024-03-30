const { SetupModules } = require("./Modules");
const { LogoData } = require("../ModulesList");

let isMenuOpen = false;

export function CreateMenu() {
  if (!isMenuOpen) {
    isMenuOpen = true;

    const Holder = document.createElement("div");
    Holder.style =
      "backdrop-filter: blur(10px); width: 100vw; height: 100vh; position: fixed; left: 0; top: 0; display: flex; justify-content: center; align-items: center; z-index: 9999; background-color: rgba(0, 0, 0, 0.5);";
    Holder.id = "SCMM";
    const Menu = document.createElement("div");
    Menu.style = `
            width: 80%;
            max-width: 800px;
            height: 80%;
            max-height: 600px;
            background: linear-gradient(to bottom right, #2c3e50, #34495e);
            border-radius: 20px;
            display: flex;
            flex-direction: column;
            padding: 30px;
            box-shadow: 0 0 50px 20px rgba(0, 0, 0, 0.4);
            animation: shine 3s ease-in-out infinite;
        `;
    Menu.innerHTML = `
        <div style="
            display: flex;
            flex-direction: row;
            align-items: center;
            height: fit-content;
            width: 100%;
            color: #fff;
            gap: 20px;
            font-family: 'Montserrat', sans-serif;
            margin-bottom: 20px;
        ">
            <img style="
                width: 80px; 
                height: 80px;
                border-radius: 50%;
                box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
            " 
            src="${LogoData}">
            <h1 style="
                font-size: 32px;
                font-weight: 700;
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
            gap: 20px;
            font-family: 'Montserrat', sans-serif;" 
        id="SCMM-MODULES">
        </div>
        `;
    document.body.appendChild(Holder);
    Holder.appendChild(Menu);

    // Add some additional styles to the modules
    const modules = document.querySelectorAll("#SCMM-MODULES > *");
    modules.forEach((module) => {
      module.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
      module.style.padding = "20px";
      module.style.borderRadius = "10px";
      module.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.2)";
      module.style.transition = "transform 0.3s ease-in-out";
      module.addEventListener("mouseover", () => {
        module.style.transform = "scale(1.05)";
      });
      module.addEventListener("mouseout", () => {
        module.style.transform = "scale(1)";
      });
    });

    SetupModules();
  } else {
    document.getElementById("SCMM").remove();
    isMenuOpen = false;
  }
}