import { GET_DEFAULT_PROFILE } from '@/store/type/user_type.js';

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
        const profile = GET_DEFAULT_PROFILE;
        profile.imgUrl = kakaoProfile.thumbnail_image_url;
        profile.name = kakaoProfile.nickname;
        profile.dayOfBirth = '2000-12-13';

        return profile;
    },
    buildRegisterRequestDto(profile, selectedRegions, selectedInterestSeqs) {
        const userRegions = [];
        for (const [priority, value] of Object.entries(selectedRegions)) {
            userRegions.push({ priority, seq: value.seq });
        }
        const userInterests = appendPriority(selectedInterestSeqs);
        return {
            userName: profile.name,
            birthday: profile.dayOfBirth,
            profileImageLink: profile.imgUrl,
            userRegions,
            userInterests,
        };
    },
};

const clubBuilder = {
    buildClubCreateDto: (clubCreateInfo) => ({
        name: clubCreateInfo.title,
        description: clubCreateInfo.description,
        maximumNumber: clubCreateInfo.maximumNumber,
        mainImageUrl: clubCreateInfo.imageUrl,
        interestList: [{
            seq: clubCreateInfo.interest.seq,
            priority: 1,
        }],
        regionList: [{
            seq: clubCreateInfo.region.seq,
            priority: 1,
        }],
    }),
};

function appendPriority(seqs) {
    return seqs.map((seq, index) => ({ seq, priority: index + 1 }));
}

export {
    kakaoTokenBuilder,
    userBuilder,
    clubBuilder,
};
