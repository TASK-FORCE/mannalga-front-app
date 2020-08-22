import _ from '@/utils/lodashWrapper.js';

export const USER = 'user';

export const EMPTY_PROFILE = {
    name: '',
    imgUrl: '',
    dayOfBirth: '',
    gender: '',
};

export const DEFAULT_PROFILE = _.cloneDeep(EMPTY_PROFILE);

// state & getters
export const SELECTED_LOCATION_SEQS = 'selectedLocationSeqs';
export const SELECTED_INTEREST_SEQS = 'selectedInterestSeqs';
export const PROFILE = 'profile';

// mutations
export const SET_PROFILE = 'setProfile';
export const CHANGE_PROFILE_NAME = 'changeProfileName';
export const REMOVE_SELECTED_LOCATION_SEQS = 'removeSelectedLocationSeqs';
export const ADD_SELECTED_LOCATION_SEQS = 'addSelectedLocationSeqs';
export const REMOVE_SELECTED_INTEREST_SEQS = 'removeSelectedInterestSeqs';
export const ADD_SELECTED_INTEREST_SEQS = 'addSelectedInterestSeqs';

// actions
export const REQUEST_PROFILE = 'requestProfile';
export const POST_REGISTER = 'postRegister';
export const REQUEST_REGISTER_STATUS = 'requestRegisterStatus';
