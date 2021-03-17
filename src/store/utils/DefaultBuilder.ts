import { SNACKBAR_LOCATION, SnackBarOption } from '@/interfaces/common';
import { ClubInfo, CurrentUserInfo } from '@/interfaces/club';

class DefaultBuilder {
    static snackbarOption(): SnackBarOption {
        return {
            message: '',
            location: SNACKBAR_LOCATION.BOTTOM,
            open: false,
        };
    }

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

    static clubInfo(): ClubInfo {
        return {
            clubInterest: [],
            clubRegion: [],
            description: '',
            mainImageUrl: '',
            maximumNumber: 0,
            userCount: 0,
            name: '',
            seq: 0,
        }
    }

    static currentUserInfo(): CurrentUserInfo {
        return {
            isMaster: false,
            isManager: false,
            isMember: false,
            roles: null,
            isLiked: false,
        };
    }

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
        isLiked: false,
        writer: {},
    });

    static buildBoard = () => ({
        seq: 0,
        category: '',
        commentCnt: 0,
        createAt: '',
        likeCnt: 0,
        mainImageUrl: '',
        content: '',
        imageList: [],
        title: '',
        writerImage: '',
        writerName: '',
        writerRole: '',
        writerSeq: [],
    });
}

export default DefaultBuilder;
