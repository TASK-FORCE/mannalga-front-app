import { KAKAO } from '@/utils/kakao/kakao.ts';
import { ClubListRequest, ClubSearchContext, MyClubListRequest } from '@/interfaces/clubList';
import { Interest, InterestWriteRequest, Page, PageRequest, Region, RegionWriteRequest } from '@/interfaces/common';
import { UserRegisterContext, UserRegisterRequest } from '@/interfaces/user';
import { KakaoTokenRequest, KakaoTokenResponse, ServerTokenRequest } from '@/interfaces/auth';
import { AlbumCommentPageRequest, AlbumPageRequest, AlbumSeqContext } from '@/interfaces/album';
import { BoardCommentPageRequest, BoardSeqContext } from '@/interfaces/board/board';

/** RequestConverter
 *  - 백엔드 서버로 전달하는 request 정보를 converting
 */
export default class RequestConverter {
    static convertPage(page: Page): PageRequest {
        return {
            size: page.size,
            page: page.nextPage,
        }
    }

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

    static convertKakaoTokenCode(code): KakaoTokenRequest {
        return {
            grant_type: 'authorization_code',
            client_id: process.env.VUE_APP_KAKAO_REST_APP_KEY,
            redirect_uri: KAKAO.REDIRECT_URL,
            code,
        }
    }

    static convertKakaoTokenInfo(kakaoTokenInfo: KakaoTokenResponse): ServerTokenRequest {
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

    static convertAlbumPageRequest(clubSeq: number, page: Page): AlbumPageRequest {
        return {
            clubSeq,
            pageRequest: this.convertPage(page),
        }
    }

    static convertAlbumCommentPageRequest({ clubSeq, albumSeq }: AlbumSeqContext, page: Page): AlbumCommentPageRequest {
        return {
            clubSeq,
            albumSeq,
            pageRequest: this.convertPage(page)
        }
    }

    static convertBoardCommentPageRequest({ clubSeq, boardSeq }: BoardSeqContext, page: Page): BoardCommentPageRequest {
        return {
            clubSeq,
            boardSeq,
            pageRequest: this.convertPage(page)
        }
    }

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
