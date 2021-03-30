import { Page, PageRequest } from '@/interfaces/common';
import { Role } from './clubList';

export interface MeetingPageRequest {
  clubSeq: number;
  pageRequest: PageRequest;
}

export interface MeetingFeedGroup {
  groupYearMonth: string;
  meetings: MeetingFeed[];
}

export interface MeetingFeed {
  seq: number;
  title: string;
  isOpen: boolean;
  isSameDayMeeting: boolean;
  meetingDay: number;
  meetingDayOfWeek: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  isRegistered: boolean;
  isCreator: boolean;
  maximumNumber?: number;
  cost?: string;
  region?: string;
  applicationUsers: MeetingApplicationUser[];
}

export interface ServerMeetingFeedGroup {
  groupYearMonth: string;
  meetings: ServerMeetingFeed[];
}

export interface ServerMeetingFeed {
  content: string;
  cost: string;
  deleteFlag: boolean;
  endDate: string;
  endTime: string;
  endTimestamp: string;
  isCurrentUserApplicationMeeting: boolean;
  isCurrentUserRegMeeting: boolean;
  isOpen: boolean;
  maximumNumber?: number;
  meetingApplications: any[];
  meetingDay: number;
  meetingDayOfWeek: string;
  regClubUser: object;
  region: string;
  regionURL: string;
  seq: number;
  startDate: string;
  startTime: string;
  startTimestamp: string;
  title: string;
}

export interface ServerMeetingApplication {
  seq: number;
  createdAt: string;
  deleteFlag: boolean;
  updatedAt: string;
  userInfo: ServerMeetingApplicationUser;
}

export interface ServerMeetingApplicationUser {
  userSeq: number;
  userName: string;
  profileImageLink: string;
  regUserFlag: boolean;
}

export interface MeetingApplicationUser {
  seq: number;
  name: string;
  imgUrl: string;
}

export interface MeetingGroupListResponse {
  meetingGroupList: MeetingFeedGroup[];
  meetingGroupPage: Page;
}

export interface MeetingWriteRequest {
  title: string;
  content: string;
  maximumNumber?: number;
  startTimestamp: string;
  endTimestamp: string;
  cost?: number;
  region?: string;
}

export interface MeetingWriteRequestWithSeq {
  clubSeq: number;
  meetingSeq?: number;
  meetingWriteRequest: MeetingWriteRequest;
}

export interface MeetingSeqContext {
  clubSeq: number;
  meetingSeq: number;
}

export interface MeetingApplicationStatus {
  meetingSeq: number;
  isRegistered: boolean;
  applicationUsers: MeetingApplicationUser[];
}

export interface MeetingApplicationChangeResponse {
  meetingApplications: ServerMeetingApplication[];
  currentCount: string;
  maximumNumber: string;
  isCurrentUserRegMeeting: boolean;
  isCurrentUserApplicationMeeting: boolean;
}

export interface Meeting {
  seq: number;
  startTimestamp: string;
  endTimestamp: string;
  title: string;
  content: string;
  maximumNumber?: number;
  cost?: string;
  region?: string;
  isCreator: boolean;
  isRegistered: boolean;
  applicationUsers: MeetingApplicationUser[];
  registerUser: MeetingRegisterUser;
  registerUserRoles: Role[];
  isOpen: boolean;
  isSameDayMeeting: boolean;
  meetingDay: number;
  meetingDayOfWeek: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

export interface MeetingRegisterUser {
  seq: number;
  profileImageLink: string;
  userName: string;
  userRoles: string[];
}

export interface ServerMeeting {
  seq: number;
  content: string;
  cost?: number;
  deleteFlag: boolean;
  endDate: string;
  endTime: string;
  endTimestamp: string;
  isCurrentUserApplicationMeeting: boolean;
  isCurrentUserRegMeeting: boolean;
  isOpen: boolean;
  maximumNumber?: number;
  meetingApplications: ServerMeetingApplication[];
  meetingDay: number;
  meetingDayOfWeek: string;
  regClubUser: ServerMeetingRegisterUser;
  region?: string;
  regionURL?: string;
  startDate: string;
  startTime: string;
  startTimestamp: string;
  title: string;
}

export interface ServerMeetingRegisterUser {
  user: MeetingRegisterUser;
  roles: Role[];
}

export interface MeetingWriteContext {
  title: string;
  content: string;
  maximumNumber?: number;
  cost?: string;
  region?: string;
  startDateTime: DateTime;
  endDateTime: DateTime;
}

export interface DateTime {
  date: string;
  time?: string;
}
