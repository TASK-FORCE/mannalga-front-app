export const TEMPLATE = 'template';

export const DEFAULT_ROOT_REGION = {
    seq: 1,
    level: 1,
    name: '',
    subRegions: [],
    superRegionRoot: '',
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
export const ROOT_REGIONS = 'rootRegions';
export const ROOT_INTERESTS = 'rootInterests';

// mutations
export const SET_REGION_TEMPLATE = 'setRegionTemplate';
export const SET_INTEREST_TEMPLATE = 'setInterestTemplate';

// actions
export const REQUEST_REGION_TEMPLATE = 'requestRegionTemplate';
export const REQUEST_INTEREST_TEMPLATE = 'requestInterestTemplate';
