const jsonReadHelper = require('../../json/jsonReadHelper.js');

module.exports = {
    get() {
        return jsonReadHelper.readJson('kakao-profile.json');
    },
    post() {
    },
    put() {
    },
    delete() {
    },
};
