import { KAKAO } from '@/utils/kakao/kakao.js';
import { ClubListRequest, ClubSearchContext, MyClubListRequest } from '@/interfaces/clubList';
import { Page } from '@/interfaces/common';

/** RequestConverter
 *  - 백엔드 서버로 전달하는 request 정보를 converting
 */
export default class RequestConverter {
    static convertPage = (page) => ({
        size: page.size,
        page: page.nextPage,
    });

    static convertClubList(clubPage: Page, clubSearchContext: ClubSearchContext): ClubListRequest {
        return {
            size: clubPage.size,
            page: clubPage.nextPage,
            regionSeq: clubSearchContext.region.seq,
            interestSeq: clubSearchContext.interest.seq,
            interestGroupSeq: clubSearchContext.interest.groupSeq,
            text: clubSearchContext.searchText,
        }
    }

    static convertMyClubList(myClubPage: Page): MyClubListRequest {
        return {
            size: myClubPage.size,
            page: myClubPage.nextPage,
        }
    }

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

    static convertRegisterInfo = ({ profile, selectedRegions, selectedInterests }) => {
        const userInterests = buildUserInterestsDto(selectedInterests);
        const userRegions = buildUserRegionsDto(selectedRegions);
        return {
            userName: profile.name,
            profileImageLink: profile.imgUrl,
            userRegions,
            userInterests,
        };
    };

    static convertUserRegionsForChange = (selectedRegions) => buildUserRegionsDto(selectedRegions);

    static convertUserInterestForChange = (selectedInterests) => buildUserInterestsDto(selectedInterests);
}

const buildUserRegionsDto = (selectedRegions) => selectedRegions
    .map((region, index) => ({
        priority: index + 1,
        seq: region.seq,
    }));

const buildUserInterestsDto = (selectedInterests) => selectedInterests
    .map((interest, index) => ({
        priority: index + 1,
        seq: interest.seq,
    }));
