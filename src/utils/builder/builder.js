const kakaoTokenBuilder = {
    buildRequestDto(kakaoToken) {
        const {
            // eslint-disable-next-line camelcase
            access_token, expires_in, refresh_token, refresh_token_expires_in,
        } = kakaoToken;
        return {
            access_token,
            expireds_in: expires_in,
            refresh_token,
            refresh_token_expires_in,
        };
    },
};

export {
    kakaoTokenBuilder,
};
