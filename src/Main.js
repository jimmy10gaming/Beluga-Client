const { CreateMenu } = require("./GUI/Menu");
const { StartupModules } = require("./GUI/Modules");
const { ChatCommands } = require("./ChatCMD/Help")
const { RequireAll } = require("./RequireAll.js")

StartupModules();

window.addEventListener("keydown", function (e) {
  if (e.key === "=") {
    CreateMenu();
  }
});