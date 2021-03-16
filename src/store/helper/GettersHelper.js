import store from '@/store';
import { combineWithModuleName } from '@/store/utils/vuexUtils.js';
import { MODULE } from '@/store/type/type.js';

const { getters } = store;

class GettersHelper {
    // auth module
    hasToken = () => getState(MODULE.AUTH, 'hasToken');
    appToken = () => getState(MODULE.AUTH, 'appToken');

    // club module
    clubInfo = () => getState(MODULE.CLUB, 'clubInfo');
    currentUserInfo = () => getState(MODULE.CLUB, 'currentUserInfo');
    clubUserList = () => getState(MODULE.CLUB, 'clubUserList');
    clubName = () => getState(MODULE.CLUB, 'clubName');
    currentTab = () => getState(MODULE.CLUB, 'currentTab');

    // meeting module
    meeting = () => getState(MODULE.MEETING, 'meeting');
    meetingGroupList = () => getState(MODULE.MEETING, 'meetingGroupList');
    meetingGroupPage = () => getState(MODULE.MEETING, 'meetingGroupPage');

    // board module
    boardList = () => getState(MODULE.BOARD, 'boardList');
    boardPage = () => getState(MODULE.BOARD, 'boardPage');
    board = () => getState(MODULE.BOARD, 'board');
    boardCommentList = () => getState(MODULE.BOARD, 'boardCommentList');
    boardCommentPage = () => getState(MODULE.BOARD, 'boardCommentPage');

    // album module
    album = () => getState(MODULE.ALBUM, 'album');
    albumList = () => getState(MODULE.ALBUM, 'albumList');
    albumPage = () => getState(MODULE.ALBUM, 'albumPage');
    albumCommentList = () => getState(MODULE.ALBUM, 'albumCommentList');
    albumCommentPage = () => getState(MODULE.ALBUM, 'albumCommentPage');

    // clubList module
    clubList = () => getState(MODULE.CLUB_LIST, 'clubList');
    clubPage = () => getState(MODULE.CLUB_LIST, 'clubPage');
    myClubList = () => getState(MODULE.CLUB_LIST, 'myClubList');
    myClubPage = () => getState(MODULE.CLUB_LIST, 'myClubPage');
    clubSearchFilterInfo = () => getState(MODULE.CLUB_LIST, 'clubSearchFilterInfo');

    // template module
    rootRegions = () => getState(MODULE.TEMPLATE, 'rootRegions');
    rootInterests = () => getState(MODULE.TEMPLATE, 'rootInterests');

    // user module
    kakaoProfile = () => getState(MODULE.USER, 'kakaoProfile');
    selectedRegions = () => getState(MODULE.USER, 'selectedRegions');
    selectedInterests = () => getState(MODULE.USER, 'selectedInterests');
    userProfile = () => getState(MODULE.USER, 'userProfile');
}

const getState = (moduleName, getterName) => getters[combineWithModuleName(moduleName, getterName)];

const gettersHelper = new GettersHelper();
export default gettersHelper;
