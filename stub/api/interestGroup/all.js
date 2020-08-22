const jsonReadHelper = require('../../json/jsonReadHelper.js');

module.exports = {
    get() {
        return jsonReadHelper.readJson('interests.json');
    },
    post() {
    },
    put() {
    },
    delete() {
    },
};
