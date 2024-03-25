const { CreateMenu } = require("./GUI/Menu");
const { StartupModules } = require("./GUI/Modules");

const clientName = "Fracticle Client";
const clientVersion = "v1.0.0";

const logger = ModAPI.logger;
logger.setLogger({ name: clientName });
logger.logInfo({ string: `Starting ${clientName} ${clientVersion}...` });

document.title = `${clientVersion} ${clientName}`;

StartupModules();

window.addEventListener("keydown", function (e) {
  if (e.key === ".") {
    CreateMenu();
  }
});