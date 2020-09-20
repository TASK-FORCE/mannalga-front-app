import _ from '@/utils/lodashWrapper.js';

export const CLUB = 'club';

export const EMPTY_CLUB = {
    clubInfo: {
        seq: '',
        clubName: '코딩 스터디',
        clubDetail: '코딩 스터디에 온 것을 환영합니다. 가입인사 남겨주세용!',
        memberCnt: 10,
        memberMaxCnt: 100,
        clubInterest: '모임 관심사',
        clubLocation: '모임 지역',
        clubImg: '',
    },
    memberInfo: {
        // ...
    },
    boardList: {
        boards: [
            {
                seq: '1',
                writerName: '작성자명',
                writerImg: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                favoriteCnt: 3,
                commentCnt: 3,
                writeDate: '01/01 10:40',
                title: '가입인사 드립니다.',
                isMaster: false,
                isManager: false,
                isLoginUser: true,
            },
            {
                seq: '2',
                writerName: '작성자명2',
                writerImg: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                favoriteCnt: 3,
                commentCnt: 3,
                writeDate: '01/01 10:42',
                title: '[필독] 코딩 스터디 공지',
                isMaster: false,
                isManager: false,
                isLoginUser: true,
            },
            {
                seq: '3',
                writerName: '작성자명3',
                writerImg: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                favoriteCnt: 3,
                commentCnt: 3,
                writeDate: '01/01 10:42',
                title: '[필독] 코딩 스터디 공지',
                isMaster: false,
                isManager: false,
                isLoginUser: true,
            },
            {
                seq: '4',
                writerName: '작성자명4',
                writerImg: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                favoriteCnt: 3,
                commentCnt: 3,
                writeDate: '01/01 10:42',
                title: '[필독] 코딩 스터디 공지',
                isMaster: false,
                isManager: false,
                isLoginUser: true,
            },
            {
                seq: '5',
                writerName: '작성자명3',
                writerImg: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                favoriteCnt: 3,
                commentCnt: 3,
                writeDate: '01/01 10:42',
                title: '[필독] 코딩 스터디 공지',
                isMaster: false,
                isManager: false,
                isLoginUser: true,
            },
            {
                seq: '6',
                writerName: '작성자명4',
                writerImg: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                favoriteCnt: 3,
                commentCnt: 3,
                writeDate: '01/01 10:42',
                title: '[필독] 코딩 스터디 공지',
                isMaster: false,
                isManager: false,
                isLoginUser: true,
            },
        ],
        pagingInfo: {
            // ... 
        },
    },
    albumList: {
        // ...
    },
    scheduleList: {
        // ...
    },
    // ...
};

export const DEFAULT_CLUB = _.cloneDeep(EMPTY_CLUB);

// state & getters
export const CLUB_DATA = 'clubData';

// mutations
export const SET_CLUB_DATA = 'setClubData';

// actions
export const REQUEST_CLUB_DATA = 'requestClubData'; // export const GET_CLUB_DATA = 'getClubData';

// export const REQUEST_CLUB_INFO = 'requestClubInfo';
// export const REQUEST_CLUB_MEMBERS = 'requestClubMembers';
// export const REQUEST_CLUB_SCHEDULES = 'requestClubSchedules';
// export const REQUEST_CLUB_BOARDS = 'requestClubBoards';
// export const REQUEST_CLUB_ALBUMS = 'requestClubAlbums';
