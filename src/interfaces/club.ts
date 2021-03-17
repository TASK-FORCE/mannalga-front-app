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

export interface Region {
    seq: number;
    level: number;
    name: string
    superRegionRoot: string;
}

export interface RegionWithPriority {
    priority: number;
    region: Region;
}


export interface InterestGroup {
    seq: number;
    name: string;
}

export interface Interest {
    seq: number;
    name: string;
    interestGroup: InterestGroup;
}

export interface InterestWithPriority {
    priority: number;
    interest: Interest;
}

