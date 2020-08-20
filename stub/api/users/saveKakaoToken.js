module.exports = {
    get() {
    },
    post(req) {
        // eslint-disable-next-line camelcase
        const { access_token, refresh_token } = req.body;
        return {
            appToken: {
                accessToken: access_token,
                refreshToken: refresh_token,
            },
            isFirst: true,
        };
    },
    put() {
    },
    delete() {
    },
};
