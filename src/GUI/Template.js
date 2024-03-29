export function Init(name) {
    const isEnabled = isModuleEnabled(name);
    if (isEnabled) {
      // enable mods 
      console.log("Enabled Mod");
    } else {
      // disable mods 
      console.log("Disabled Mod");
    }
  }
  
  function isModuleEnabled(name) {
    const data = JSON.parse(localStorage.getItem("SCMM-MODS"));
    const moduleIndex = data.findIndex((e) => e.name === name);
    return moduleIndex !== -1 && data[moduleIndex].enabled;
  }