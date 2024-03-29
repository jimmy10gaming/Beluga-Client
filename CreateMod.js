const fs = require('fs');
const path = require('path');

function createModule(moduleName) {
  // create the base64
  const base64FilePath = path.join(__dirname, 'src', 'Base64', `${moduleName}.js`);
  fs.writeFileSync(base64FilePath, `export default "data:image/png;base64,...";`);

  // add mod to modulelist.js
  const moduleListPath = path.join(__dirname, 'src', 'ModulesList.js');
  let moduleListContent = fs.readFileSync(moduleListPath, 'utf8');

  // import mod init function
  const initFunctionName = `Init as ${moduleName}Init`;
  const newImportStatement = `import { ${initFunctionName} } from '../Modules/${moduleName}';`;
  moduleListContent = moduleListContent.replace(/\n\]\;/, `\n${newImportStatement}\n]`);

  // add mod to modulelist.js
  const newModuleEntry = `
  {
    name: "${moduleName}",
    imagedata: ${moduleName}Image,
    init: ${moduleName}Init
  },`;
  moduleListContent = moduleListContent.replace(/\]\;/, `${newModuleEntry}\n]`);

  // update modules.js
  const modulesFilePath = path.join(__dirname, 'src', 'Modules.js');
  let modulesContent = fs.readFileSync(modulesFilePath, 'utf8');

  // import mod init functions
  const modulesImportStatement = `const ${moduleName}Init = require('../Modules/${moduleName}').Init;`;
  modulesContent = modulesContent.replace(/\n\]\;/, `\n${modulesImportStatement}\n]`);

  fs.writeFileSync(moduleListPath, moduleListContent);
  fs.writeFileSync(modulesFilePath, modulesContent);

  console.log(`Successfully created module "${moduleName}".`);
}

// um usage
const newModuleName = process.argv[2];
if (newModuleName) {
  createModule(newModuleName);
} else {
  console.error('Please provide a module name as an argument.');
}