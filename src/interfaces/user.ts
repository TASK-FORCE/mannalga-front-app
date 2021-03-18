import { Interest, InterestWithPriority, InterestWriteRequest, Region, RegionWithPriority, RegionWriteRequest } from '@/interfaces/common';

export interface KakaoProfile {
    name: string;
    imgUrl: string;
    dayOfBirth: string;
    gender: string;
}

export interface UserProfile {
    seq: number;
    userName: string;
    birthday: string;
    profileImageLink: string;
    userRegions: Region[];
    userInterests: Interest[];
}

export interface IsMember {
    isMember: boolean;
}

export interface ServerKakaoProfileContext {
    kakao_account: ServerKakaoAccount
}

export interface ServerKakaoAccount {
    profile: ServerKakaoProfile
}

export interface ServerKakaoProfile {
    nickname: string;
    thumbnail_image_url: string;
}

export interface UserRegionsResponse {
    userRegions: RegionWithPriority[]
}

export interface UserInterestResponse {
    interestList: InterestWithPriority[]
}

export interface UserRegisterContext {
    profile: KakaoProfile
    selectedRegions: Region[]
    selectedInterests: Interest[]
}

export interface UserRegisterRequest {
    userName: string;
    profileImageLink: string;
    userRegions: RegionWriteRequest[],
    userInterests: InterestWriteRequest[],
}
