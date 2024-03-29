const fs = require('fs');
const path = require('path');

function createModule(moduleName) {
  const base64FilePath = path.join(__dirname, 'src', 'Base64', `${moduleName}.js`);
  fs.writeFileSync(base64FilePath, `export default "data:image/png;base64,...";`);

  const moduleListPath = path.join(__dirname, 'src', 'ModulesList.js');
  let moduleListContent = fs.readFileSync(moduleListPath, 'utf8');

  const initFunctionName = `Init as ${moduleName}Init`;
  const newImportStatement = `import { ${initFunctionName} } from '../Modules/${moduleName}';`;
  moduleListContent = moduleListContent.replace(/\n\]\;/, `\n${newImportStatement}\n]`);

  const newModuleEntry = `
  {
    name: "${moduleName}",
    imagedata: ${moduleName}Image,
    init: ${moduleName}Init
  },`;
  moduleListContent = moduleListContent.replace(/\]\;/, `${newModuleEntry}\n]`);

  fs.writeFileSync(moduleListPath, moduleListContent);

  console.log(`Successfully created module "${moduleName}".`);
}

const newModuleName = process.argv[2];
if (newModuleName) {
  createModule(newModuleName);
} else {
  console.error('Please provide a module name as an argument.');
}