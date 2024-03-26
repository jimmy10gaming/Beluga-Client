const ModulesList = [
  { name: "Keystrokes", imagedata: "path/to/keystrokes-image" },
  { name: "CPS", imagedata: "path/to/cps-image" },
  { name: "Fullbright", imagedata: "path/to/fullbright-image" }
];

function initializeLocalStorage() {
  const defaultMods = [
    { name: "Fullbright", enabled: false },
    { name: "CPS", enabled: false },
    { name: "Keystrokes", enabled: false }
  ];

  if (!localStorage.getItem("SCMM-MODS")) {
    localStorage.setItem("SCMM-MODS", JSON.stringify(defaultMods));
  }
}

function toggleModuleState(name) {
  ParsedLSData.forEach((e) => {
    if (e.name === name) {
      e.enabled = !e.enabled;
      localStorage.setItem("SCMM-MODS", JSON.stringify(ParsedLSData));
      const toggleElement = document.getElementById(`SCMM-${name}-Toggle`);
      if (toggleElement) {
        toggleElement.style.backgroundColor = e.enabled ? "rgba(0, 255, 0, 0.25)" : "rgba(255, 0, 0, 0.25)";
        toggleElement.querySelector("p").innerHTML = e.enabled ? "ENABLED" : "DISABLED";
      }
    }
  });
}

function setupModule(Module) {
  const ModuleElement = document.createElement("div");
  ModuleElement.innerHTML = `
    <div class="module-container">
      <img src="${Module.imagedata}" alt="${Module.name}" />
      <h1>${Module.name}</h1>
      <a class="toggle-button" id="SCMM-${Module.name}-Toggle">DISABLED</a>
    </div>`;

  const Holder = document.getElementById("SCMM-MODULES");
  if (Holder) Holder.appendChild(ModuleElement);

  document.getElementById(`SCMM-${Module.name}-Toggle`).addEventListener("click", () => {
    toggleModuleState(Module.name);
  });
}

export function StartupModules() {
  initializeLocalStorage();
  
  if (ParsedLSData) {
    ModulesList.forEach((Module) => {
      ParsedLSData.forEach((e) => {
        if (e.name === Module.name) {
          if (e.enabled) eval(`${Module.name}.${Module.name}On()`);
          else eval(`${Module.name}.${Module.name}Off()`);
        }
      });
    });
  }
}

export function SetupModules() {
  initializeLocalStorage();

  ModulesList.forEach((Module) => {
    setupModule(Module);
    setInterval(() => toggleModuleState(Module.name), 100);
  });
}