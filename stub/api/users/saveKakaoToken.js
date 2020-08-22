module.exports = {
    get() {
    },
    post(req) {
        const { access_token } = req.body;
        return {
            appToken: access_token,
            isFirst: true,
        };
    },
    put() {
    },
    delete() {
    },
};
