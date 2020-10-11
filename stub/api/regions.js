const jsonReadHelper = require('../json/jsonReadHelper.js');

module.exports = {
    get() {
        return jsonReadHelper.readJson('regions.json');
    },
    post() {},
    put() {},
    delete() {},
};
