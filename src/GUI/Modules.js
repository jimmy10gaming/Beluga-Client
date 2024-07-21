export function StartupModules() {
  let mods = ModulesList.map(module => ({ name: module.name, enabled: false }));
  localStorage.setItem("SCMM-MODS", JSON.stringify(mods));
}

export function SetupModules() {
  const moduleData = JSON.parse(localStorage.getItem('SCMM-MODS')) || [];

  moduleData.forEach(mod => {
    const toggleSwitch = document.getElementById(`toggle-${mod.name}`);
    if (toggleSwitch) {
      toggleSwitch.classList.toggle('active', mod.enabled);
    }
  });
}