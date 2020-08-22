const jsonReadHelper = require('../json/jsonReadHelper.js');

module.exports = {
    get() {
        return jsonReadHelper.readJson('states.json');
    },
    post() {},
    put() {},
    delete() {},
};
