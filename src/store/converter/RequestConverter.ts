import { KAKAO } from '@/utils/kakao/kakao.js';
import { ClubListRequest, ClubSearchContext, MyClubListRequest } from '@/interfaces/clubList';
import { Interest, InterestWriteRequest, Page, Region, RegionWriteRequest } from '@/interfaces/common';
import { UserRegisterContext, UserRegisterRequest } from '@/interfaces/user';

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

    static convertRegisterInfo({ profile, selectedRegions, selectedInterests }: UserRegisterContext): UserRegisterRequest {
        return {
            userName: profile.name,
            profileImageLink: profile.imgUrl,
            userRegions: buildUserRegionsDto(selectedRegions),
            userInterests: buildUserInterestsDto(selectedInterests),
        };
    };

    static convertUserRegionsForChange(selectedRegions: Region[]) {
        return buildUserRegionsDto(selectedRegions);
    }

    static convertUserInterestForChange(selectedInterests: Interest[]) {
        return buildUserInterestsDto(selectedInterests);
    }
}

const buildUserRegionsDto = (selectedRegions: Region[]): RegionWriteRequest[] =>
    selectedRegions
        .map((region, index) => ({
            priority: index + 1,
            seq: region.seq,
        }));

const buildUserInterestsDto = (selectedInterests: Interest[]): InterestWriteRequest[] =>
    selectedInterests
        .map((interest, index) => ({
            priority: index + 1,
            seq: interest.seq,
        }));
