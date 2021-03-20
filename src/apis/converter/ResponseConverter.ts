import DefaultBuilder from '@/store/utils/DefaultBuilder.ts';
import { toCurrency } from '@/utils/common/commonUtils.ts';
import { AxiosResponse } from 'axios';
import { Comment, Interest, Page, Region, ServerPageResponse, SuperInventionResponse } from '@/interfaces/common';
import { ClubFeed, ClubListResponse, MyClubFeed, MyClubListResponse } from '@/interfaces/clubList';
import { KakaoProfile, ServerKakaoProfileContext, UserInterestResponse, UserRegionsResponse } from '@/interfaces/user';
import { AlbumCommentListResponse, AlbumFeed, AlbumListResponse } from '@/interfaces/album';
import { BoardCommentListResponse, BoardFeed, BoardListResponse } from '@/interfaces/board/board';

/** ResponseConverter
 *  - 백엔드 서버에서 전달받은 response를 converting
 */
export default class ResponseConverter {
    /** 일반 HTTP 응답 추출용
     *  - 카카오 로그인과 같은 일반 HTTP 요청에 대한 응답 데이터를 추출한다.
     *  - 요청이 성공한 경우 response data외에 필요한 정보가 없으므로 data만 추출하여 actions에게 전달한다.
     */
    static extractResponseData(response: AxiosResponse) {
        return response && response.data;
    }

    /** Super Invention 응답 추출용(super invention은 응답 포맷이 다르다)
     *  - Super Invention 서버 응답 데이터를 추출한다.
     *  - 요청이 성공한 경우 response data외에 필요한 정보가 없으므로 data만 추출하여 actions에게 전달한다.
     */
    static extractSuperInventionResponseData(response: AxiosResponse<SuperInventionResponse>) {
        return response && response.data && response.data.data;
    }

    static convertProfile({ kakao_account }: ServerKakaoProfileContext): KakaoProfile {
        const { thumbnail_image_url, nickname } = kakao_account.profile;
        const profile = DefaultBuilder.kakaoProfile();
        profile.imgUrl = thumbnail_image_url;
        profile.name = nickname;
        return profile;
    };

    static convertClubList(data: ServerPageResponse<ClubFeed[]>): ClubListResponse {
        return {
            clubList: data.content,
            clubPage: convertPage(data)
        };
    };

    static convertMyClubList(data: ServerPageResponse<MyClubFeed[]>): MyClubListResponse {
        return {
            myClubList: data.content,
            myClubPage: convertPage(data)
        };
    };

    static convertMeetingList(data) {
        const meetingGroupList = data.content.map(group => ({
            groupYearMonth: group.groupYearMonth,
            meetings: group.meetings.map(mapMeeting),
        }));
        const meetingGroupPage = convertPage(data);
        return { meetingGroupList, meetingGroupPage }
    }

    static convertMeeting(data) {
        return mapMeeting(data);
    }

    static convertMeetingApplicationStatus(data) {
        return mapMeetingApplicationStatus(data);
    }

    static convertBoardList(data: ServerPageResponse<BoardFeed[]>): BoardListResponse {
        return {
            boardList: data.content,
            boardPage: convertPage(data),
        };
    };

    static convertAlbumList(data: ServerPageResponse<AlbumFeed[]>): AlbumListResponse {
        return {
            albumList: data.content,
            albumPage: convertPage(data),
        };
    };

    static convertAlbumCommentList(data: ServerPageResponse<Comment[]>): AlbumCommentListResponse {
        return {
            albumCommentList: data.content,
            albumCommentPage: convertPage(data)
        };
    };

    static convertBoardCommentList(data: ServerPageResponse<Comment[]>): BoardCommentListResponse {
        return {
            boardCommentList: data.content,
            boardCommentPage: convertPage(data)
        };
    };

    static convertUserRegions({ userRegions }: UserRegionsResponse): Region[] {
        return userRegions.map(({ region }) => region)
    }

    static convertUserInterests({ interestList }: UserInterestResponse): Interest[] {
        return interestList.map(({ interest }) => interest);
    }
}

const convertPage = ({ pageable, last, size }: ServerPageResponse<any>): Page => {
    const currentPage = pageable.pageNumber;
    const nextPage = currentPage + 1;
    return {
        isLastPage: last,
        size,
        currentPage,
        nextPage,
    };
};

const mapMeeting = (meeting) => ({
    seq: meeting.seq,
    title: meeting.title,
    content: meeting.content,
    isOpen: meeting.isOpen,
    isSameDayMeeting: meeting.startDate === meeting.endDate,
    meetingDay: meeting.meetingDay,
    meetingDayOfWeek: meeting.meetingDayOfWeek,
    startDate: meeting.startDate,
    startTime: meeting.startTime,
    startTimestamp: meeting.startTimestamp,
    endDate: meeting.endDate,
    endTime: meeting.endTime,
    endTimestamp: meeting.endTimestamp,
    isRegistered: meeting.isCurrentUserApplicationMeeting,
    isCreator: meeting.isCurrentUserRegMeeting,
    registerUser: meeting.regClubUser,
    cost: toCurrency(meeting.cost),
    region: meeting.region,
    ...mapMeetingApplicationStatus(meeting),
});

const mapMeetingApplicationStatus = (dto) => {
    const registerNumber = dto.meetingApplications.length;
    const { maximumNumber } = dto;
    let numberInfoText = registerNumber;
    if (maximumNumber) {
        numberInfoText = `${numberInfoText}/${maximumNumber}`;
    }
    return {
        isRegistered: dto.isCurrentUserApplicationMeeting,
        isCreator: dto.isCurrentUserRegMeeting,
        registerNumber,
        maximumNumber,
        numberInfoText,
        applicationUsers: dto.meetingApplications.map(({ userInfo }) => ({
            seq: userInfo.userSeq,
            name: userInfo.userName,
            imgUrl: userInfo.profileImageLink,
        })),
    };
};