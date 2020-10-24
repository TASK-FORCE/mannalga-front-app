const fs = require('fs');
const path = require('path');

module.exports = {
    readJson(fileName) {
        const jsonPath = path.join(__dirname, '..', 'json', fileName);
        const json = fs.readFileSync(jsonPath, 'utf8');
        return { data: JSON.parse(json) };
    },
};
