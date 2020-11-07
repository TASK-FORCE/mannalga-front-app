export const CLUB = 'club';

export const EMPTY_CLUB = {
    clubInfo: {
        seq: '',
        name: '코딩 스터디',
        description: '### 코딩 스터디에 온 것을 환영합니다. \n 텍스트1 \n 텍스트2 \n\n ### 규칙 \n 규칙1 \n 규칙2 \n\n ### 추가 설명 \n 설명 1\n 설명 2',
        current_number: 5,
        maximum_number: 10,
        clubInterest: [
            {
                interest: {
                    seq: 2148,
                    name: '해외여행',
                    interestGroup: {
                        seq: 1,
                        name: '아웃도어/여행',
                    },
                },
                priority: 1,
            },
            {
                interest: {
                    seq: 2148,
                    name: '배드민턴',
                    interestGroup: {
                        seq: 1,
                        name: '운동/스포츠',
                    },
                },
                priority: 2,
            },
        ],
        clubRegions: [
            {
                region: {
                    seq: 101,
                    name: '종로구',
                    superRegionRoot: '서울특별시/종로구',
                    level: 2,
                },
                priority: 1,
            },
        ],
        main_image_url: '',
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

export const GET_DEFAULT_CLUB = () => ({ ...EMPTY_CLUB });

// state & getters
export const CLUB_DATA = 'clubData';
export const CLUB_NAME = 'clubName';

// mutations
export const SET_CLUB_DATA = 'setClubData';

// actions
export const REQUEST_CLUB_DATA = 'requestClubData'; // export const GET_CLUB_DATA = 'getClubData';
export const REQUEST_CLUB_CREATE = 'requestClubCreate';
export const REQUEST_CLUB_JOIN = 'requestClubJoin';
export const REQUEST_CLUB_BOARD_CREATE = 'requestClubBoardCreate';
