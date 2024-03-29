const { CreateMenu } = require("./GUI/Menu");
const { StartupModules } = require("./GUI/Modules");
const { ChatCommands } = require("./ChatCMD/Help")

StartupModules();

window.addEventListener("keydown", function (e) {
  if (e.key === ".") {
    CreateMenu();
  }
});