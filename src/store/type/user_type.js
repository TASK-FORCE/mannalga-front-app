export const USER = 'user';

export const GET_DEFAULT_PROFILE = () => (
    {
        name: '',
        imgUrl: '',
        dayOfBirth: '',
        gender: '',
    }
);

export const GET_DEFAULT_USER_SETTINGS = () => (
    {
        userName: '',
        birthday: '',
        profileImageLink: '',
        userRegions: [],
        userInterests: [],
    }
);

// state & getters
export const SELECTED_REGIONS = 'selectedRegions';
export const SELECTED_INTEREST_SEQS = 'selectedInterestSeqs';
export const KAKAO_PROFILE = 'kakaoProfile';
export const USER_PROFILE = 'userProfile';

// mutations
export const SET_PROFILE = 'setProfile';
export const CHANGE_PROFILE_NAME = 'changeProfileName';
export const ADD_SELECTED_REGIONS = 'addSelectedRegions';
export const REMOVE_SELECTED_INTEREST_SEQS = 'removeSelectedInterestSeqs';
export const ADD_SELECTED_INTEREST_SEQS = 'addSelectedInterestSeqs';
export const SET_USER_PROFILE = 'setUserProfile';

// actions
export const REQUEST_KAKAO_PROFILE = 'requestKakaoProfile';
export const REQUEST_USER_PROFILE = 'requestUserProfile';
export const REQUEST_USER_REGIONS = 'requestUserRegions';
export const REQUEST_USER_INTERESTS = 'requestUserInterests';
export const REQUEST_CHANGE_USER_REGIONS = 'requestChangeUserRegion';
export const REQUEST_CHANGE_USER_INTEREST = 'requestChangeUserRegion';
export const POST_REGISTER = 'postRegister';
export const REQUEST_REGISTER_STATUS = 'requestRegisterStatus';
