// TODO: icon, color는 나중에 확실히 정하기.
const INTEREST_GROUP_TYPES = {
    TRAVEL: {
        name: '아웃도어/여행',
        icon: 'mdi-airplane-takeoff',
        color: 'orange darken-1',
    },
    EXERCISE: {
        name: '운동/스포츠',
        icon: 'mdi-weight-lifter',
        color: 'blue lighten-2',
    },
    BOOK: {
        name: '인문학/책/글',
        icon: 'mdi-book-open-variant',
        color: 'light-green',
    },
    LANGUAGE: {
        name: '외국/언어',
        icon: 'mdi-alphabetical-variant',
        color: 'indigo darken-1',
    },
    CULTURAL: {
        name: '문화/공연/축제',
        icon: 'mdi-party-popper',
        color: 'red darken-1',
    },
    DEFAULT: {
        name: 'DEFAULT',
        icon: 'mdi-image-search',
        color: 'blue-grey lighten-3',
    },
};

export { INTEREST_GROUP_TYPES };
