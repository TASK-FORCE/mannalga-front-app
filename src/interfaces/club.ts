import { InterestWithPriority, RegionWithPriority } from '@/interfaces/common';

export interface ClubDetailContext {
  clubInfo: ClubInfo;
  userInfo: ClubUserInfo;
  userList: ClubUserInfo[];
}

export interface ClubInfo {
  seq: number;
  name: string;
  description: string;
  mainImageUrl: string;
  maximumNumber: number;
  userCount: number;
  clubInterest: InterestWithPriority[];
  clubRegion: RegionWithPriority[];
}

export interface ClubUserInfo {
  clubUserSeq: number;
  userSeq: number;
  isLiked: boolean;
  role: string[];
}

export interface CurrentUserInfo {
  isMaster: boolean;
  isManager: boolean;
  isMember: boolean;
  isLiked: boolean;
  roles: string[];
}

export interface ClubWriteRequest {
  name: string;
  description: string;
  maximumNumber: number;
  mainImageUrl: string;
  interestList: any[];
  regionList: any[];
}

export interface ClubWriteRequestWithSeq {
  clubSeq: number;
  clubWriteRequest: ClubWriteRequest
}

export interface ClubUserRoleChangeRequest {
  clubSeq: number;
  clubUserSeq: number;
  role: string;
}

export interface ClubUserKickRequest {
  clubSeq: number;
  clubUserSeq: number;
}

export enum ClubListPageTab {
  CLUB = 'club',
  MY_CLUB = 'myClub',
}


