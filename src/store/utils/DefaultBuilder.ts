import { Page, SnackBarLocation, SnackBarOption } from '@/interfaces/common';
import { ClubDetailContext, ClubInfo, ClubUserInfo, CurrentUserInfo } from '@/interfaces/club';
import { ClubSearchContext } from '@/interfaces/clubList';

class DefaultBuilder {
    static snackbarOption(): SnackBarOption {
        return {
            message: '',
            location: SnackBarLocation.BOTTOM,
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

    static clubSearchContext(): ClubSearchContext {
        return {
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
        }
    }

    static buildPage(size = 20): Page {
        return { size, currentPage: 0, nextPage: 0, isLastPage: false }
    }

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

    static clubUserInfo(): ClubUserInfo {
        return {
            clubUserSeq: 0,
            userSeq: 0,
            isLiked: false,
            role: [],
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

    static clubDetailContext(): ClubDetailContext {
        return {
            clubInfo: this.clubInfo(),
            userInfo: this.clubUserInfo(),
            userList: [],
        }
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
