import { Interest, InterestWithPriority, InterestWriteRequest, Region, RegionWithPriority, RegionWriteRequest, UploadImageResponse } from '@/interfaces/common';

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
  interests: InterestWithPriority[];
  regions: RegionWithPriority[];
}

export interface ClubUserInfo {
  clubUserSeq: number;
  userSeq: number;
  isLiked: boolean;
  role: string[];
  name?: string;
  imgUrl?: string;
}

export interface CurrentUserInfo {
  isMaster: boolean;
  isManager: boolean;
  isMember: boolean;
  isLiked: boolean;
  roles: string[];
  userSeq: number;
}

export interface ClubWriteRequest {
  name: string;
  description: string;
  maximumNumber: number;
  img?: UploadImageResponse;
  interestList: InterestWriteRequest[];
  regionList: RegionWriteRequest[];
}

export interface ClubWriteRequestWithSeq {
  clubSeq: number;
  clubWriteRequest: ClubWriteRequest;
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

export interface ClubWriteContext {
  name: string;
  description: string;
  maximumNumber: number;
  imageUrl: string;
  interestList: Interest[];
  regionList: Region[];
}
