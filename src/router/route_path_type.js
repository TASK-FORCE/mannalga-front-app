import _ from '@/utils/common/lodashWrapper.js';

export const PATH = {
    LOGIN: '/login',
    BACKDOOR_LOGIN: '/backdoor',
    CLUB_LIST: '/clubList',
    SELECT_REGION: '/select/region',
    REGISTER: {
        MAIN: '/register',
        PROFILE: '/register/profile',
        REGION: '/register/region',
        INTEREST: '/register/interest',
    },
    CLUB: {
        CREATE: '/create/club',
        MAIN: '/club/:clubSeq',
        BOARD_CREATE: '/club/:clubSeq/create/board',
        BOARD_POST: '/club/:clubSeq/board/:boardSeq',
        MEETING_CREATE: '/club/:clubSeq/create/meeting',
        MEETING_EDIT: '/club/:clubSeq/meeting/edit/:meetingSeq',
        MEETING_POST: '/club/:clubSeq/meeting/:meetingSeq',
        ALBUM_POST: '/club/:clubSeq/album/:albumSeq',
        SEARCH: '/search/club',
    },
    USER: {
        SETTINGS: '/user/settings',
        REGION_EDIT: '/user/region/edit',
        INTEREST_EDIT: '/user/interest/edit',
    },
    BACK: 'back',
};

// route 계층 구조 이용시 child route path를 정의하기 위해 필요
export const getChildRoutePath = (path) => {
    const split = path.split('/');
    return split[split.length - 1];
};

export const generateParamPath = (path, params) => {
    if (!Array.isArray(params)) {
        // eslint-disable-next-line no-param-reassign
        params = [params];
    }
    if (_.isEmpty(path) || _.isEmpty(params)) {
        throw Error(`path or params must not be empty. path: ${path}, params: ${params}`);
    }

    let paramIndex = 0;
    return path
        .split('/')
        .map(token => {
            if (token.startsWith(':')) {
                // eslint-disable-next-line no-plusplus
                return params[paramIndex++];
            }
            return token;
        })
        .join('/');
};
