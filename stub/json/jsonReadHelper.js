const fs = require('fs');
const path = require('path');

module.exports = {
    readJson(fileName) {
        const jsonPath = path.join(__dirname, '..', 'json', fileName);
        return fs.readFileSync(jsonPath, 'utf8');
    },
};
