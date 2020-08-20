const path = require('path');
const fs = require('fs');

module.exports = {
    get() {
        const jsonPath = path.join(__dirname, '..', 'json', 'state.json');
        return fs.readFileSync(jsonPath, 'utf8');
    },
    post() {},
    put() {},
    delete() {},
};
