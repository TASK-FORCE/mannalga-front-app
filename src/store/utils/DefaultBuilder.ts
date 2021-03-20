import { Page, SnackBarLocation, SnackBarOption, Writer } from '@/interfaces/common';
import { ClubDetailContext, ClubInfo, ClubUserInfo, CurrentUserInfo } from '@/interfaces/club';
import { ClubSearchContext } from '@/interfaces/clubList';
import { KakaoProfile, UserProfile } from '@/interfaces/user';
import { Album } from '@/interfaces/album';
import { Board, BoardCategoryType } from '@/interfaces/board/board';

class DefaultBuilder {
    static snackbarOption(): SnackBarOption {
        return {
            message: '',
            location: SnackBarLocation.BOTTOM,
            open: false,
        };
    }

    static kakaoProfile(): KakaoProfile {
        return {
            name: '',
            imgUrl: '',
            dayOfBirth: '',
            gender: '',
        }
    }

    static userProfile(): UserProfile {
        return {
            seq: 0,
            userName: '',
            birthday: '',
            profileImageLink: '',
            userRegions: [],
            userInterests: [],
        }
    }

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

    static page(size = 20): Page {
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

    static album(): Album {
        return {
            albumSeq: 0,
            title: '',
            file_name: '',
            imgUrl: '',
            likeCnt: 0,
            commentCnt: 0,
            isLiked: false,
            writer: this.writer(),
        }
    }

    static board(): Board {
        return {
            boardSeq: 0,
            category: BoardCategoryType.NORMAL,
            commentCnt: 0,
            content: '',
            createdAt: '',
            imageList: [],
            isLiked: false,
            likeCnt: 0,
            title: '',
            updatedAt: '',
            writer: this.writer(),
        }
    }

    static writer(): Writer {
        return {
            writerUserSeq: 0,
            writerClubUserSeq: 0,
            name: '',
            imgUrl: '',
            role: [],
        }
    }
}

export default DefaultBuilder;
