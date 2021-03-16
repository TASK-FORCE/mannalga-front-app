import DefaultBuilder from '@/store/utils/DefaultBuilder.ts';
import { toCurrency } from '@/utils/common/commonUtils.js';
import { AxiosResponse } from 'axios';
import { SuperInventionResponse } from '@/interfaces/common';

/** ResponseConverter
 *  - 백엔드 서버에서 전달받은 response를 converting
 */
export default class ResponseConverter {
    /** 일반 HTTP 응답 추출용
     *  - 카카오 로그인과 같은 일반 HTTP 요청에 대한 응답 데이터를 추출한다.
     *  - 요청이 성공한 경우 response data외에 필요한 정보가 없으므로 data만 추출하여 actions에게 전달한다.
     */
    static extractResponseData = (response) => response && response.data;

    /** Super Invention 응답 추출용(super invention은 응답 포맷이 다르다)
     *  - Super Invention 서버 응답 데이터를 추출한다.
     *  - 요청이 성공한 경우 response data외에 필요한 정보가 없으므로 data만 추출하여 actions에게 전달한다.
     */
    static extractSuperInventionResponseData(response: AxiosResponse<SuperInventionResponse>) {
        return response && response.data && response.data.data;
    }

    static convertProfile = ({ kakao_account }) => {
        const { thumbnail_image_url, nickname } = kakao_account.profile;
        const profile = DefaultBuilder.buildKakaoProfile();
        profile.imgUrl = thumbnail_image_url;
        profile.name = nickname;
        return profile;
    };

    static convertClubList = (data) => {
        const clubList = data.content;
        // @ts-ignore
        const clubPage = convertPage(data);
        return { clubList, clubPage };
    };

    static convertMyClubList = (data) => {
        const myClubListWrapper = data.content.map((wrapper) => {
            const myClub = wrapper.club;
            return {
                ...wrapper,
                club: {
                    ...myClub,
                    // TODO 백엔드에서 변수명 변경 요청하기
                    interests: myClub.clubInterest ? myClub.clubInterest : [],
                    regions: myClub.clubRegion ? myClub.clubRegion : [],
                },
            };
        });
        // @ts-ignore
        const clubPage = convertPage(data);
        return { clubList: myClubListWrapper, clubPage };
    };

    static convertMeetingList = (data) => {
        const meetingGroupList = data.content.map(group => ({
            groupYearMonth: group.groupYearMonth,
            meetings: group.meetings.map(mapMeeting),
        }));
        // @ts-ignore
        const meetingGroupPage = convertPage(data);
        return { meetingGroupList, meetingGroupPage };
    };

    static convertMeeting = (data) => mapMeeting(data);

    static convertMeetingApplicationStatus = (data) => mapMeetingApplicationStatus(data);

    static convertBoardList = (data) => {
        const boardList = data.content.map(mapBoard);
        // @ts-ignore
        const boardPage = convertPage(data);
        return { boardList, boardPage };
    };

    static convertBoard = (data) => mapBoard(data);

    static convertAlbumList = (data) => {
        const albumList = data.content;
        // @ts-ignore
        const albumPage = convertPage(data);
        return { albumList, albumPage };
    };

    static convertAlbumCommentList = (data) => {
        const albumCommentList = data.content;
        // @ts-ignore
        const albumCommentPage = convertPage(data);
        return { albumCommentList, albumCommentPage };
    };

    static convertBoardCommentList = (data) => {
        const boardCommentList = data.content;
        // @ts-ignore
        const boardCommentPage = convertPage(data);
        return { boardCommentList, boardCommentPage };
    };

    static convertUserRegions = ({ userRegions }) => userRegions;

    static convertUserInterests = ({ interestList }) => interestList.map(({ interest }) => interest);
}

const convertPage = ({ pageable, last, size }) => {
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

const mapBoard = (board) => ({
    seq: board.boardSeq,
    category: board.category,
    commentCnt: board.commentCnt,
    createAt: board.createAt && board.createAt.substring(0, 16),
    createdAt: board.createdAt && board.createdAt.substring(0, 16),
    likeCnt: board.likeCnt,
    isLiked: board.isLiked,
    mainImageUrl: board.mainImageUrl,
    simpleContent: board.simpleContent,
    content: board.content,
    imageList: board.imageList,
    title: board.title,
    writerImage: board.writer.imgUrl,
    writerName: board.writer.name,
    writerRole: board.writer.role[0],
    writerSeq: board.writer.writerUserSeq,
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
