const path = require('path');
const fs = require('fs');

const pkgPath = path.join(__dirname, '../package.json');
const pkgJSON = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
const options = process.argv;

if (options[2] && options[2] === '--add') {
  pkgJSON.scripts.postinstall = 'node ./dist/roo-report.js';
} else {
  delete pkgJSON.scripts.postinstall;
}

fs.writeFileSync(pkgPath, JSON.stringify(pkgJSON, null, 2), null, 'utf-8');