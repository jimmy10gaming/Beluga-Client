const fs = require('fs');
const path = require('path');

function convertToBase64(folderPath, outputFilePath) {
  const files = fs.readdirSync(folderPath);

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    const fileBuffer = fs.readFileSync(filePath);
    const base64 = fileBuffer.toString('base64');

    const outputContent = `export default "${base64}";`;
    fs.writeFileSync(path.join(outputFilePath, `${path.parse(file).name}.js`), outputContent);
  });
}

// Example usage
const baseImageFolder = path.join(__dirname, 'src', 'Base64');
const outputFolder = path.join(__dirname, 'src', 'Base64');
convertToBase64(baseImageFolder, outputFolder);