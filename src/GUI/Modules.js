const { ModulesList } = require("../ModulesList");
const { Init } = require("./Template");

let parsedLSData = getModulesFromLocalStorage();

export function StartupModules() {
  if (!parsedLSData) {
    const mods = ModulesList.map((module) => ({ name: module.name, enabled: false }));
    localStorage.setItem("SCMM-MODS", JSON.stringify(mods));
    parsedLSData = mods;
  }
}

export function SetupModules() {
  function addModule(name, img) {
    const module = document.createElement("div");
    module.innerHTML = getModuleHTML(name, img);
    document.getElementById("SCMM-MODULES").appendChild(module);
  }

  function enableToggle(name) {
    document.getElementById(`SCMM-${name}-Toggle`).addEventListener("mousedown", () => {
      toggleModuleEnabled(name);
    });
  }

  function setCorrectToggle(name) {
    const isEnabled = isModuleEnabled(name);
    const toggle = document.getElementById(`SCMM-${name}-Toggle`);
    if (toggle) {
      toggle.style.backgroundColor = isEnabled ? "rgba(0, 255, 0, 0.25)" : "rgba(255, 0, 0, 0.25)";
      toggle.querySelector("p").innerHTML = isEnabled ? "ENABLED" : "DISABLED";
    }
  }

  function toggleModuleEnabled(name) {
    const index = parsedLSData.findIndex((e) => e.name === name);
    if (index !== -1) {
      parsedLSData[index].enabled = !parsedLSData[index].enabled;
      localStorage.setItem("SCMM-MODS", JSON.stringify(parsedLSData));
      Init(name);
    }
  }

  function getModulesFromLocalStorage() {
    const data = localStorage.getItem("SCMM-MODS");
    return data ? JSON.parse(data) : null;
  }

  function getModuleHTML(name, img) {
    return `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: end; height: 25vh; width: 25vh; border-radius: 2.5vh; background-color: rgba(255, 255, 255, 0.15); border: solid 0.1vw rgba(255, 255, 255, 0.5); position: relative;">
        <img style="position: absolute; top: 35%; left: 50%; transform: translate(-50%, -50%); font-size: 2vh; width: 15vh; height: 15vh;" src="${img}"/>
        <h1 style="word-wrap: break-word;position: absolute; top: 62.5%; left: 50%; transform: translate(-50%, -50%); font-size: 1.5vh; width: 100%; text-align: center;">${name}</h1>
        <a style="background-color: rgba(255, 0, 0, 0.25); width: 100%; height: 20%; bottom: 0; border-radius: 0 0 2.5vh 2.5vh; position: relative; border: solid 0.1vw rgba(255, 255, 255, 0.5);" id="SCMM-${name}-Toggle">
          <p style="position: absolute; top: 10%; left: 50%; transform: translate(-50%, -50%); font-size: 2vh;">DISABLED</p>
        </a>
      </div>
    `;
  }

  ModulesList.forEach((module) => {
    addModule(module.name, module.imagedata);
    enableToggle(module.name);
    setInterval(() => {
      setCorrectToggle(module.name);
    }, 100);
  });
}