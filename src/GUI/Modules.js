const { ModulesList } = require("../ModulesList");

let parsedLSData = getModulesFromLocalStorage();

export function StartupModules() {
  if (!parsedLSData) {
    const mods = ModulesList.map((module) => ({ name: module.name, enabled: false }));
    localStorage.setItem("SCMM-MODS", JSON.stringify(mods));
    parsedLSData = mods;
  }
}

export function SetupModules() {
  function addModule(module) {
    const moduleElement = document.createElement("div");
    moduleElement.innerHTML = getModuleHTML(module.name, module.imagedata);
    document.getElementById("SCMM-MODULES").appendChild(moduleElement);
  }

  function enableModule(module) {
    document.getElementById(`SCMM-${module.name}-Toggle`).addEventListener("mousedown", () => {
      toggleModuleEnabled(module);
    });
  }

  function setCorrectToggle(module) {
    const isEnabled = isModuleEnabled(module.name);
    const toggle = document.getElementById(`SCMM-${module.name}-Toggle`);
    if (toggle) {
      toggle.style.backgroundColor = isEnabled ? "rgba(0, 255, 0, 0.25)" : "rgba(255, 0, 0, 0.25)";
      toggle.querySelector("p").innerHTML = isEnabled ? "ENABLED" : "DISABLED";
    }
  }

  function toggleModuleEnabled(module) {
    const index = parsedLSData.findIndex((e) => e.name === module.name);
    if (index !== -1) {
      parsedLSData[index].enabled = !parsedLSData[index].enabled;
      localStorage.setItem("SCMM-MODS", JSON.stringify(parsedLSData));
      if (parsedLSData[index].enabled) {
        module.init(module.name);
      } else {
        //disable mods
        eval(`${module.name}.Init("${module.name}")`);
      }
    }
  }

  function getModulesFromLocalStorage() {
    const data = localStorage.getItem("SCMM-MODS");
    return data ? JSON.parse(data) : null;
  }

  function getModuleHTML(name, imagedata) {
    return `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: end; height: 25vh; width: 25vh; border-radius: 2.5vh; background-color: rgba(255, 255, 255, 0.15); border: solid 0.1vw rgba(255, 255, 255, 0.5); position: relative;">
        <img style="position: absolute; top: 35%; left: 50%; transform: translate(-50%, -50%); font-size: 2vh; width: 15vh; height: 15vh;" src="${imagedata}"/>
        <h1 style="word-wrap: break-word;position: absolute; top: 62.5%; left: 50%; transform: translate(-50%, -50%); font-size: 1.5vh; width: 100%; text-align: center;">${name}</h1>
        <a style="background-color: rgba(255, 0, 0, 0.25); width: 100%; height: 20%; bottom: 0; border-radius: 0 0 2.5vh 2.5vh; position: relative; border: solid 0.1vw rgba(255, 255, 255, 0.5);" id="SCMM-${name}-Toggle">
          <p style="position: absolute; top: 10%; left: 50%; transform: translate(-50%, -50%); font-size: 2vh;">DISABLED</p>
        </a>
      </div>
    `;
  }

  ModulesList.forEach((module) => {
    addModule(module);
    enableModule(module);
    setInterval(() => {
      setCorrectToggle(module);
    }, 100);
  });
}