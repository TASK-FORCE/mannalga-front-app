class DefaultBuilder {
    buildDefaultSnackBarOption = () => ({
        message: '',
        color: 'pink',
        location: 'bottom',
    });

    buildKakaoProfile = () => ({
        name: '',
        imgUrl: '',
        dayOfBirth: '',
        gender: '',
    });

    buildUserProfile = () => ({
        userName: '',
        birthday: '',
        profileImageLink: '',
        userRegions: [],
        userInterests: [],
    });

    buildClubSearchFilterInfo = () => ({
        region: {
            seq: null,
            name: null,
        },
        interest: {
            seq: null,
            name: null,
        },
    });

    buildPage = () => ({ size: 20, currentPage: 0, nextPage: 0, isLastPage: false });

    buildClubInfo = () => ({
        clubInterest: [],
        clubRegion: [],
        description: '',
        mainImageUrl: '',
        maximumNumber: 0,
        userCount: 0,
        name: '',
        seq: 0,
    });

    buildUserInfo = () => ({
        isMaster: false,
        isMember: false,
        isManager: false,
        roles: null,
        isLiked: false,
    });

    buildMeeting = () => ({
        seq: 0,
        title: '',
        content: '',
        startTime: '',
        endTime: '',
        isRegistered: false,
        isCreator: false,
        maximumNumber: 0,
        registerUser: {},
        applicationUsers: [],
    });

    // TODO: to be deleted
    buildClub = () => ({
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
    });
}

const defaultBuilder = new DefaultBuilder();
export default defaultBuilder;
