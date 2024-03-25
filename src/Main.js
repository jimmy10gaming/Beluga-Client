const { ModuleGraphConnection } = require("webpack");
const { CreateMenu } = require("./GUI/Menu");
const { StartupModules } = require("./GUI/Modules");

let clientname = "Fracticle Client";
let clientversion = "v1.0.0";

ModAPI.logger.setlogger({name: clientname});
ModAPI.logger.loginfo({string: "Starting " + clientname + " " + clientversion + "..."});
document.title = clientversion + " " + clientversion;

StartupModules();

window.addEventListener("keydown", function (e) {
  if (e.key === ".") {
    CreateMenu();
  }
});