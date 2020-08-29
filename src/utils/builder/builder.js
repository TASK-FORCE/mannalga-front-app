import { EMPTY_PROFILE } from '@/store/type/user_type.js';

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

const userBuilder = {
    buildProfile(kakaoAccount) {
        const kakaoProfile = kakaoAccount.profile;
        const profile = EMPTY_PROFILE;
        profile.imgUrl = kakaoProfile.thumbnail_image_url;
        profile.name = kakaoProfile.nickname;
        profile.dayOfBirth = '2000-12-13';

        return profile;
    },
    buildRegisterRequestDto(profile, selectedLocations, selectedInterestSeqs) {
        const userStates = [];
        for (const [priority, value] of Object.entries(selectedLocations)) {
            userStates.push({ priority, seq: value.seq });
        }
        const userInterests = appendPriority(selectedInterestSeqs);
        return {
            userName: profile.name,
            birthday: profile.dayOfBirth,
            profileImageLink: profile.imgUrl,
            userStates,
            userInterests,
        };
    },
};

function appendPriority(seqs) {
    return seqs.map((seq, index) => ({ seq, priority: index + 1 }));
}

export {
    kakaoTokenBuilder,
    userBuilder,
};
