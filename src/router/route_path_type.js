export const PATH = {
    LOGIN: '/login',
    APP_MAIN: '/main',
    SELECT_REGION: '/select/region',
    REGISTER: {
        MAIN: '/register',
        PROFILE: '/register/profile',
        REGION: '/register/region',
        INTEREST: '/register/interest',
    },
    CLUB: {
        MAIN: '/club/:seq',
        CREATE: '/create/club',
        BOARD_POST: '/club/board/:seq',
        BOARD_CREATE: '/club/create/board',
    },
    USER: {
        SETTINGS: '/user/settings',
        REGION_EDIT: '/user/region/edit',
        INTEREST_EDIT: '/user/interest/edit',
    },
};

export const getChildRoutePath = (path) => {
    const split = path.split('/');
    return split[split.length - 1];
};
