class DefaultBuilder {
    static buildDefaultSnackBarOption = () => ({
        message: '',
        color: 'pink',
        location: 'bottom',
    });

    static buildKakaoProfile = () => ({
        name: '',
        imgUrl: '',
        dayOfBirth: '',
        gender: '',
    });

    static buildUserProfile = () => ({
        userName: '',
        birthday: '',
        profileImageLink: '',
        userRegions: [],
        userInterests: [],
    });

    static buildClubSearchFilterInfo = () => ({
        region: {
            seq: null,
            name: null,
        },
        interest: {
            groupSeq: null,
            seq: null,
            name: null,
        },
        searchText: null,
    });

    static buildPage = (size = 20) => ({ size, currentPage: 0, nextPage: 0, isLastPage: false });

    static buildClubInfo = () => ({
        clubInterest: [],
        clubRegion: [],
        description: '',
        mainImageUrl: '',
        maximumNumber: 0,
        userCount: 0,
        name: '',
        seq: 0,
    });

    static buildCurrentUserInfo = () => ({
        isMaster: false,
        isManager: false,
        isMember: false,
        roles: null,
        isLiked: false,
    });

    static buildMeeting = () => ({
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

    static buildAlbum = () => ({
        albumSeq: 0,
        title: '',
        file_name: '',
        imgUrl: '',
        likeCnt: 0,
        commentCnt: 0,
        isLike: false,
        writer: {},
    });

    // TODO: to be deleted
    static buildClub = () => ({
        boardList: {
            boards: [
                {
                    seq: '1',
                    writerName: '동명',
                    writerSeq: 1,
                    writerImg: '',
                    writerRole: 'MASTER',
                    writeDate: '2020-01-01',
                    likeCnt: 3,
                    commentCnt: 3,
                    category: 'NOTICE',
                    title: '가입인사 드립니다.',
                    content: 'Lorem ipsum dolor sit amet, impedit ipsum itaque nemo, nesciunt nulla omnis praesentium quam quas quibusdam, saepe tempore ut voluptas? Nobis!',
                    mainImg: 'https://super-invention-static.s3.ap-northeast-2.amazonaws.com/temp/img/20201118101037-c9edf193-4fcc-451c-b0a8-5bdf47d0d028-test.png',
                },
                {
                    seq: '2',
                    writerName: '동명',
                    writerSeq: 1,
                    writerImg: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                    writerRole: 'MANAGER',
                    writeDate: '2020-01-01',
                    likeCnt: 3,
                    commentCnt: 3,
                    category: 'FREE',
                    title: '가입인사 드립니다.',
                    content: 'Lorem ipsum dolor sit amet, impedit ipsum itaque nemo, nesciunt nulla omnis praesentium quam quas quibusdam, saepe tempore ut voluptas? Nobis!',
                    mainImg: '',
                },
                {
                    seq: '3',
                    writerName: '동명',
                    writerSeq: 1,
                    writerImg: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                    writerRole: 'CLUB_MEMBER',
                    writeDate: '2020-01-01',
                    likeCnt: 3,
                    commentCnt: 3,
                    category: 'MEETING_REVIEW',
                    title: '가입인사 드립니다.',
                    content: 'Lorem ipsum dolor sit amet, impedit ipsum itaque nemo, nesciunt nulla omnis praesentium quam quas quibusdam, saepe tempore ut voluptas? Nobis!',
                    mainImg: 'https://super-invention-static.s3.ap-northeast-2.amazonaws.com/temp/img/20201118103423-c702c611-b3b8-45bc-980f-6c4b0ca74edb-test.png',
                },
                {
                    seq: '4',
                    writerName: '동명',
                    writerSeq: 1,
                    writerImg: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                    writerRole: 'CLUB_MEMBER',
                    writeDate: '2020-01-01',
                    likeCnt: 3,
                    commentCnt: 3,
                    category: 'JOIN_GREETING',
                    title: '가입인사 드립니다.',
                    content: 'Lorem ipsum dolor sit amet, impedit ipsum itaque nemo, nesciunt nulla omnis praesentium quam quas quibusdam, saepe tempore ut voluptas? Nobis!',
                    mainImg: '',
                },
            ],
            pagingInfo: {
                // ...
            },
        },
    });
}

export default DefaultBuilder;
