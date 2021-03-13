import store from '@/store';
import { combineWithModuleName, createSnackbarOption } from '@/store/utils/vuexUtils.js';
import { MODULE } from '@/store/type/type.js';

class MutationsHelper {
    // auth
    setAppToken = (payload) => commit(MODULE.AUTH, 'setAppToken', payload);
    removeAppToken = (payload) => commit(MODULE.AUTH, 'removeAppToken', payload);

    // club
    setCurrentTab = (payload) => commit(MODULE.CLUB, 'setCurrentTab', payload);

    // clubList module
    changeClubSearchRegion = (payload) => commit(MODULE.CLUB_LIST, 'changeClubSearchRegion', payload);
    changeClubSearchInterest = (payload) => commit(MODULE.CLUB_LIST, 'changeClubSearchInterest', payload);
    changeClubSearchText = (payload) => commit(MODULE.CLUB_LIST, 'changeClubSearchText', payload);

    // meeting
    setMeeting = (payload) => commit(MODULE.MEETING, 'setMeeting', payload);

    // board
    initBoardCommentList = (payload) => commit(MODULE.BOARD, 'initBoardCommentList', payload);
    countChildBoardCommentCnt = (payload) => commit(MODULE.BOARD, 'countChildBoardCommentCnt', payload);
    countBoardCommentCnt = (payload) => commit(MODULE.BOARD, 'countBoardCommentCnt', payload);

    // album
    initAlbumCommentList = (payload) => commit(MODULE.ALBUM, 'initAlbumCommentList', payload);
    countChildAlbumCommentCnt = (payload) => commit(MODULE.ALBUM, 'countChildCommentCnt', payload);
    countAlbumCommentCnt = (payload) => commit(MODULE.ALBUM, 'countAlbumCommentCnt', payload);

    // common module
    closeSnackBar = (payload) => commit(MODULE.COMMON, 'closeSnackBar', payload);
    openSnackBar = (payload) => commit(MODULE.COMMON, 'openSnackBar', createSnackbarOption(payload));
    changeCommonLoading = (payload) => commit(MODULE.COMMON, 'changeLoading', payload);
    focusChildCommentInput = (payload) => commit(MODULE.COMMON, 'focusChildCommentInput', payload);
    focusOutChildCommentInput = (payload) => commit(MODULE.COMMON, 'focusOutChildCommentInput', payload);
    setThemeStatus = (payload) => commit(MODULE.COMMON, 'setThemeStatus', payload);

    // user module
    changeProfileName = (payload) => commit(MODULE.USER, 'changeProfileName', payload);
    setSelectedRegions = (payload) => commit(MODULE.USER, 'setSelectedRegions', payload);
}

const commit = (moduleName, commitName, payload) => store.commit(combineWithModuleName(moduleName, commitName), payload);

const mutationsHelper = new MutationsHelper();
export default mutationsHelper;
