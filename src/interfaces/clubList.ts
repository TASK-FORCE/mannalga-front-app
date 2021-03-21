import { InterestWithPriority, Page, RegionWithPriority } from '@/interfaces/common';

export interface ClubListRequest {
  size: number;
  page: number;
  regionSeq: number;
  interestSeq: number;
  interestGroupSeq: number;
  text: string;
}

export interface ClubListResponse {
  clubList: ClubFeed[]
  clubPage: Page,
}

export interface ClubFeed {
  seq: number;
  name: string;
  description: string;
  mainImageUrl: string;
  maximumNumber: number;
  userCount: number;
  regions: RegionWithPriority[];
  interests: InterestWithPriority[];
}

export interface MyClubListRequest {
  size: number;
  page: number;
}

export interface MyClubFeed {
  clubUserSeq: number;
  club: ClubFeed;
  roles: Role[];
}

export interface MyClubListResponse {
  myClubList: MyClubFeed[]
  myClubPage: Page,
}

export interface Role {
  name: string;
  roleGroupName: string;
}

export interface RegionForSearch {
  seq: number;
  name: string;
}

export interface InterestForSearch {
  seq?: number;
  groupSeq?: number;
  name: string;
}

export interface ClubSearchContext {
  region: RegionForSearch;
  interest: InterestForSearch;
  searchText: string;
}
