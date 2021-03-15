import store from '@/store';
import { combineWithModuleName } from '@/store/utils/vuexUtils.js';
import { MODULE } from '@/store/type/type.js';

const { getters } = store;

class GettersHelper {
    // auth module
    hasToken = () => get(MODULE.AUTH, 'hasToken');
    appToken = () => get(MODULE.AUTH, 'appToken');

    // club module
    clubInfo = () => get(MODULE.CLUB, 'clubInfo');
    currentUserInfo = () => get(MODULE.CLUB, 'currentUserInfo');
    clubUserList = () => get(MODULE.CLUB, 'clubUserList');
    clubName = () => get(MODULE.CLUB, 'clubName');
    currentTab = () => get(MODULE.CLUB, 'currentTab');

    // meeting module
    meeting = () => get(MODULE.MEETING, 'meeting');
    meetingGroupList = () => get(MODULE.MEETING, 'meetingGroupList');
    meetingGroupPage = () => get(MODULE.MEETING, 'meetingGroupPage');

    // board module
    boardList = () => get(MODULE.BOARD, 'boardList');
    boardPage = () => get(MODULE.BOARD, 'boardPage');
    board = () => get(MODULE.BOARD, 'board');
    boardCommentList = () => get(MODULE.BOARD, 'boardCommentList');
    boardCommentPage = () => get(MODULE.BOARD, 'boardCommentPage');

    // album module
    album = () => get(MODULE.ALBUM, 'album');
    albumList = () => get(MODULE.ALBUM, 'albumList');
    albumPage = () => get(MODULE.ALBUM, 'albumPage');
    albumCommentList = () => get(MODULE.ALBUM, 'albumCommentList');
    albumCommentPage = () => get(MODULE.ALBUM, 'albumCommentPage');

    // clubList module
    clubList = () => get(MODULE.CLUB_LIST, 'clubList');
    clubPage = () => get(MODULE.CLUB_LIST, 'clubPage');
    myClubList = () => get(MODULE.CLUB_LIST, 'myClubList');
    myClubPage = () => get(MODULE.CLUB_LIST, 'myClubPage');
    clubSearchFilterInfo = () => get(MODULE.CLUB_LIST, 'clubSearchFilterInfo');

    // common module
    isLoading = () => get(MODULE.COMMON, 'isLoading');
    snackBarOptions = () => get(MODULE.COMMON, 'snackBarOptions');
    openSnackBar = () => get(MODULE.COMMON, 'openSnackBar');
    isFocusingChildCommentInput = () => get(MODULE.COMMON, 'isFocusingChildCommentInput');
    isDarkTheme = () => get(MODULE.COMMON, 'isDarkTheme');

    // template module
    rootRegions = () => get(MODULE.TEMPLATE, 'rootRegions');
    rootInterests = () => get(MODULE.TEMPLATE, 'rootInterests');

    // user module
    kakaoProfile = () => get(MODULE.USER, 'kakaoProfile');
    selectedRegions = () => get(MODULE.USER, 'selectedRegions');
    selectedInterests = () => get(MODULE.USER, 'selectedInterests');
    userProfile = () => get(MODULE.USER, 'userProfile');
}

const get = (moduleName, getterName) => getters[combineWithModuleName(moduleName, getterName)];

const gettersHelper = new GettersHelper();
export default gettersHelper;
