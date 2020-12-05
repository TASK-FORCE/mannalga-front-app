import defaultBuilder from '@/store/utils/DefaultBuilder.js';

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
    static extractSuperInventionResponseData = (response) => response && response.data && response.data.data;

    static convertProfile = ({ kakao_account }) => {
        const { thumbnail_image_url, nickname } = kakao_account.profile;
        const profile = defaultBuilder.buildKakaoProfile();
        profile.imgUrl = thumbnail_image_url;
        profile.name = nickname;
        profile.dayOfBirth = '2000-12-13';
        return profile;
    };

    static convertClubList = (data) => {
        const clubList = data.content;
        const clubPage = this.convertPage(data);
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
        const clubPage = this.convertPage(data);
        return { clubList: myClubListWrapper, clubPage };
    };

    static convertMeetingList = (data) => {
        const meetingList = data.content.map(mapMeeting);
        const meetingPage = this.convertPage(data);
        return { meetingList, meetingPage };
    };

    // TODO: check
    static convertMeeting = (data) => mapMeeting(data)

    static convertPage = ({ pageable, last, size }) => {
        const currentPage = pageable.pageNumber;
        const nextPage = currentPage + 1;
        return {
            isLastPage: last,
            size,
            currentPage,
            nextPage,
        };
    };

    static convertUserRegions = ({ userRegions }) => userRegions.map(mapUserRegion);

    static convertUserInterests = ({ interestList }) => interestList.map(({ interest }) => interest).map(({ seq }) => seq);
}

const mapUserRegion = ({ priority, region }) => ({
    priority,
    region: {
        seq: region.seq,
        name: region.superRegionRoot,
    },
});

const mapMeeting = (meeting) => ({
    seq: meeting.seq,
    title: meeting.title,
    content: meeting.content,
    startTime: meeting.startTimestamp.substring(0, 16),
    endTime: meeting.endTimestamp.substring(0, 16),
    isRegistered: meeting.isCurrentUserApplicationMeeting,
    isCreator: meeting.isCurrentUserRegMeeting,
    maximumNumber: meeting.maximumNumber,
    registerUser: meeting.regClubUser,
    applicationUsers: meeting.meetingApplications.map(({ userInfo }) => ({
        seq: userInfo.uesrSeq,
        name: userInfo.userName,
        imgUrl: userInfo.profileImageLink,
    })),
});
