const jsonReadHelper = require('../../json/jsonReadHelper.js');

module.exports = {
    get() {
        return jsonReadHelper.readJson('settings.json');
    },
    post() {
    },
    put() {
    },
    delete() {
    },
};
