module.exports = {
    get() {
    },
    post(req) {
        const { access_token } = req.body;
        return {
            appToken: access_token,
            isRegistered: false,
        };
    },
    put() {
    },
    delete() {
    },
};
