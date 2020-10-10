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
export const PROFILE = 'profile';
export const USER_SETTINGS = 'userSettings';

// mutations
export const SET_PROFILE = 'setProfile';
export const CHANGE_PROFILE_NAME = 'changeProfileName';
export const ADD_SELECTED_REGIONS = 'addSelectedRegions';
export const REMOVE_SELECTED_INTEREST_SEQS = 'removeSelectedInterestSeqs';
export const ADD_SELECTED_INTEREST_SEQS = 'addSelectedInterestSeqs';
export const SET_USER_SETTINGS = 'setUserSettings';

// actions
export const REQUEST_PROFILE = 'requestProfile';
export const POST_REGISTER = 'postRegister';
export const REQUEST_REGISTER_STATUS = 'requestRegisterStatus';
export const REQUEST_USER_SETTINGS = 'requestUserSettings';
