import { KAKAO } from '@/utils/auth/kakao/utlls.js';

/** RequestConverter
 *  - 백엔드 서버로 전달하는 request 정보를 converting
 */
export default class RequestConverter {
    static convertPage = (page) => ({
        size: page.size,
        page: page.nextPage,
    });

    static convertClubList = (clubPage, clubSearchFilterInfo) => {
        const { size, nextPage } = clubPage;
        const regionSeq = clubSearchFilterInfo.region.seq;
        const interestSeq = clubSearchFilterInfo.interest.seq;
        const text = clubSearchFilterInfo.searchText;
        return {
            size,
            page: nextPage,
            regionSeq,
            interestSeq,
            text,
        };
    };

    static convertMyClubList = (myClubPage) => {
        const { size, nextPage } = myClubPage;
        return {
            size,
            page: nextPage,
        };
    };

    static convertKakaoTokenCode = (code) => ({
        grant_type: 'authorization_code',
        client_id: process.env.VUE_APP_KAKAO_REST_APP_KEY,
        redirect_uri: KAKAO.REDIRECT_URL,
        code,
    });

    static convertKakaoTokenInfo = (kakaoTokenInfo) => {
        const { access_token, expires_in, refresh_token, refresh_token_expires_in } = kakaoTokenInfo;
        return {
            access_token,
            expireds_in: expires_in,
            refresh_token,
            refresh_token_expires_in,
        };
    };

    static convertRegisterInfo = ({ profile, selectedRegions, selectedInterestSeqs }) => {
        const userInterests = buildUserInterestsDto(selectedInterestSeqs);
        const userRegions = buildUserRegionsDto(selectedRegions);
        return {
            userName: profile.name,
            birthday: profile.dayOfBirth,
            profileImageLink: profile.imgUrl,
            userRegions,
            userInterests,
        };
    };

    static convertClubCreateInfo = (clubCreateInfo) => ({
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
    });

    static convertUserRegionsForChange = (selectedRegions) => buildUserRegionsDto(selectedRegions);

    static convertUserInterestForChange = (selectedInterestSeqs) => buildUserInterestsDto(selectedInterestSeqs);
}

const buildUserRegionsDto = (selectedRegions) => {
    const userRegions = [];
    for (const [priority, region] of Object.entries(selectedRegions)) {
        userRegions.push({ priority, seq: region.seq });
    }
    return userRegions;
};

const buildUserInterestsDto = (seqs) => seqs.map((seq, index) => ({ seq, priority: index + 1 }));
