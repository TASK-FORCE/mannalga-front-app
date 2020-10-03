export const TEMPLATE = 'template';

export const DEFAULT_ROOT_STATE = {
    seq: 1,
    level: 1,
    name: '',
    subStates: [],
    superStateRoot: '',
};

export const DEFAULT_INTEREST = {
    name: '',
    groupSeq: 1,
    interestList: [
        {
            seq: 1,
            name: '',
        },
    ],
};

// state && getters
export const ROOT_LOCATIONS = 'rootStates';
export const ROOT_INTERESTS = 'rootInterests';

// mutations
export const SET_LOCATION_TEMPLATE = 'setLocationTemplate';
export const SET_INTEREST_TEMPLATE = 'setInterestTemplate';

// actions
export const REQUEST_LOCATION_TEMPLATE = 'requestStateTemplate';
export const REQUEST_INTEREST_TEMPLATE = 'requestInterestTemplate';
