const fs = require('fs');
const path = require('path');
const addCheckMark = require('../helpers/checkmark');
const addXMark = require('../helpers/xmark');

// what the heck does this file do?
// Adds: scripts, repo, license
// adds watch, dev scripts
function updatePackageJson() {
  const msg = 'Updated package.json';
  try {
    const packageJsonDirectory = path.normalize(
      this.targetPath + '/package.json'
    );
    // let packageJson = require(packageJsonDirectory);
    let packageJson = JSON.parse(fs.readFileSync(packageJsonDirectory, 'utf8'));

    // update properties
    packageJson.repository = 'https://github.com/turutupa/cf-create-app';
    packageJson.license = 'MIT';
    packageJson.scripts['dev:cds'] = 'npx cds watch';
    packageJson.scripts['build'] = 'npx mbt build';
    packageJson.scripts.dev = 'concurrently npm:dev:*';
    packageJson.scripts.watch = 'npx cds watch';
    switch (this.frontendFramework) {
      case false:
        break;
      case 'react':
        packageJson.scripts['dev:app'] = 'npm start --prefix app';
        break;
      case 'vue':
        packageJson.scripts['dev:app'] = 'npm run serve --prefix app';
        break;
      case 'angular':
        packageJson.scripts['dev:app'] = 'npm start --prefix app';
        break;
      default:
        break;
    }

    packageJson.cds.requires.db.kind = 'hana';

    fs.writeFileSync(
      packageJsonDirectory,
      JSON.stringify(packageJson, null, 2)
    );
    addCheckMark(msg);
  } catch (e) {
    addXMark(msg);
  }
}

module.exports = updatePackageJson;
