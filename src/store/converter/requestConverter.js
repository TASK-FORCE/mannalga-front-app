import { KAKAO } from '@/utils/kakao/utlls.js';

const appendPriority = (seqs) => seqs.map((seq, index) => ({ seq, priority: index + 1 }));

/** RequestConverter
 *  - 백엔드 서버로 전달하는 request 정보를 converting
 */
export default class RequestConverter {
    static converterClubList = (clubPage, searchFiler) => {
        const { size, nextPage } = clubPage;
        return {
            size,
            page: nextPage,
            searchOptions: { ...searchFiler },
        };
    };

    static converterMyClubList = (myClubPage) => {
        const { size, nextPage } = myClubPage;
        return {
            size,
            page: nextPage,
        };
    };

    static converterKakaoTokenCode = (code) => ({
        grant_type: 'authorization_code',
        client_id: process.env.VUE_APP_KAKAO_REST_APP_KEY,
        redirect_uri: KAKAO.REDIRECT_URL,
        code,
    });

    static converterKakaoTokenInfo = (kakaoTokenInfo) => {
        const { access_token, expires_in, refresh_token, refresh_token_expires_in } = kakaoTokenInfo;
        return {
            access_token,
            expireds_in: expires_in,
            refresh_token,
            refresh_token_expires_in,
        };
    };

    static converterRegisterInfo = ({ profile, selectedRegions, selectedInterestSeqs }) => {
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
    };

    static converterClubCreateInfo = (clubCreateInfo) => ({
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
}
