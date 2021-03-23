import DefaultBuilder from '@/store/utils/DefaultBuilder.ts';
import { toCurrency } from '@/utils/common/commonUtils.ts';
import { AxiosResponse } from 'axios';
import { Comment, Interest, Page, Region, ServerPageResponse, SuperInventionResponse } from '@/interfaces/common';
import { ClubFeed, ClubListResponse, MyClubFeed, MyClubListResponse } from '@/interfaces/clubList';
import { KakaoProfile, ServerKakaoProfileContext, UserInterestResponse, UserRegionsResponse } from '@/interfaces/user';
import { AlbumCommentListResponse, AlbumFeed, AlbumListResponse } from '@/interfaces/album';
import { BoardCommentListResponse, BoardFeed, BoardListResponse } from '@/interfaces/board/board';
import {
  Meeting,
  MeetingApplicationChangeResponse,
  MeetingApplicationStatus,
  MeetingApplicationUser,
  MeetingFeed,
  MeetingGroupListResponse,
  ServerMeeting,
  ServerMeetingApplication,
  ServerMeetingFeed,
  ServerMeetingFeedGroup
} from '@/interfaces/meeting';

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
  }

  static convertMyClubList(data: ServerPageResponse<MyClubFeed[]>): MyClubListResponse {
    return {
      myClubList: data.content,
      myClubPage: convertPage(data)
    };
  }

  static convertMeetingList(data: ServerPageResponse<ServerMeetingFeedGroup[]>): MeetingGroupListResponse {
    return {
      meetingGroupList: data.content.map(group => ({
        groupYearMonth: group.groupYearMonth,
        meetings: group.meetings.map(mapMeetingFeed),
      })),
      meetingGroupPage: convertPage(data)
    }
  }

  static convertMeeting(meeting: ServerMeeting): Meeting {
    return {
      seq: meeting.seq,
      title: meeting.title,
      content: meeting.content,
      startTimestamp: meeting.startTimestamp,
      endTimestamp: meeting.endTimestamp,
      isRegistered: meeting.isCurrentUserApplicationMeeting,
      isCreator: meeting.isCurrentUserRegMeeting,
      registerUser: meeting.regClubUser.user,
      cost: toCurrency(meeting.cost),
      region: meeting.region,
      maximumNumber: meeting.maximumNumber,
      applicationUsers: convertMeetingApplicationUsers(meeting.meetingApplications),
    }
  }

  static convertMeetingApplicationStatus(data: MeetingApplicationChangeResponse, meetingSeq: number): MeetingApplicationStatus {
    return {
      meetingSeq: meetingSeq,
      isRegistered: data.isCurrentUserApplicationMeeting,
      applicationUsers: convertMeetingApplicationUsers(data.meetingApplications),
    };
  }

  static convertBoardList(data: ServerPageResponse<BoardFeed[]>): BoardListResponse {
    return {
      boardList: data.content,
      boardPage: convertPage(data),
    };
  }

  static convertAlbumList(data: ServerPageResponse<AlbumFeed[]>): AlbumListResponse {
    return {
      albumList: data.content,
      albumPage: convertPage(data),
    };
  }

  static convertAlbumCommentList(data: ServerPageResponse<Comment[]>): AlbumCommentListResponse {
    return {
      albumCommentList: data.content,
      albumCommentPage: convertPage(data)
    };
  }

  static convertBoardCommentList(data: ServerPageResponse<Comment[]>): BoardCommentListResponse {
    return {
      boardCommentList: data.content,
      boardCommentPage: convertPage(data)
    };
  }

  static convertUserRegions({ userRegions }: UserRegionsResponse): Region[] {
    return userRegions.map(({ region }) => region)
  }

  static convertUserInterests({ interestList }: UserInterestResponse): Interest[] {
    return interestList.map(({ interest }) => interest);
  }
}

function convertPage({ pageable, last, size }: ServerPageResponse<any>): Page {
  const currentPage = pageable.pageNumber;
  const nextPage = currentPage + 1;
  return {
    isLastPage: last,
    size,
    currentPage,
    nextPage,
  };
}

function mapMeetingFeed(meeting: ServerMeetingFeed): MeetingFeed {
  return {
    seq: meeting.seq,
    title: meeting.title,
    isOpen: meeting.isOpen,
    isSameDayMeeting: meeting.startDate === meeting.endDate,
    meetingDay: meeting.meetingDay,
    meetingDayOfWeek: meeting.meetingDayOfWeek,
    startDate: meeting.startDate,
    startTime: meeting.startTime,
    endDate: meeting.endDate,
    endTime: meeting.endTime,
    isRegistered: meeting.isCurrentUserApplicationMeeting,
    isCreator: meeting.isCurrentUserRegMeeting,
    maximumNumber: meeting.maximumNumber,
    cost: toCurrency(meeting.cost),
    region: meeting.region,
    applicationUsers: convertMeetingApplicationUsers(meeting.meetingApplications),
  }
}

function convertMeetingApplicationUsers(serverMeetingApplications: ServerMeetingApplication[]): MeetingApplicationUser[] {
  return serverMeetingApplications.map(({ userInfo }) => ({
    seq: userInfo.userSeq,
    name: userInfo.userName,
    imgUrl: userInfo.profileImageLink
  }))
}

