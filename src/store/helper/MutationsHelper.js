import store from '@/store';
import { combineWithModuleName, createSnackbarOption } from '@/store/utils/vuexUtils.js';
import { MODULE } from '@/store/type/type.js';

class MutationsHelper {
    // auth
    setAppToken = (payload) => commit(MODULE.AUTH, 'setAppToken', payload);
    removeAppToken = (payload) => commit(MODULE.AUTH, 'removeAppToken', payload);

    // clubList module
    changeClubSearchRegion = (payload) => commit(MODULE.CLUB_LIST, 'changeClubSearchRegion', payload);
    changeClubSearchInterest = (payload) => commit(MODULE.CLUB_LIST, 'changeClubSearchInterest', payload);
    changeClubSearchText = (payload) => commit(MODULE.CLUB_LIST, 'changeClubSearchText', payload);

    // meeting
    setMeeting = (payload) => commit(MODULE.MEETING, 'setMeeting', payload);

    // board
    countChildBoardCommentCnt = (payload) => commit(MODULE.BOARD, 'countChildBoardCommentCnt', payload);

    // album
    initAlbumCommentList = (payload) => commit(MODULE.ALBUM, 'initAlbumCommentList', payload);
    countChildAlbumCommentCnt = (payload) => commit(MODULE.ALBUM, 'countChildCommentCnt', payload);

    // common module
    closeSnackBar = (payload) => commit(MODULE.COMMON, 'closeSnackBar', payload);
    openSnackBar = (payload) => commit(MODULE.COMMON, 'openSnackBar', createSnackbarOption(payload));
    changeCommonLoading = (payload) => commit(MODULE.COMMON, 'changeLoading', payload);
    focusChildCommentInput = (payload) => commit(MODULE.COMMON, 'focusChildCommentInput', payload);
    focusOutChildCommentInput = (payload) => commit(MODULE.COMMON, 'focusOutChildCommentInput', payload);

    // user module
    changeProfileName = (payload) => commit(MODULE.USER, 'changeProfileName', payload);
    setSelectedRegions = (payload) => commit(MODULE.USER, 'setSelectedRegions', payload);
    addSelectedInterestSeqs = (payload) => commit(MODULE.USER, 'addSelectedInterestSeqs', payload);
    removeSelectedInterestSeqs = (payload) => commit(MODULE.USER, 'removeSelectedInterestSeqs', payload);
}

const commit = (moduleName, commitName, payload) => store.commit(combineWithModuleName(moduleName, commitName), payload);

const mutationsHelper = new MutationsHelper();
export default mutationsHelper;
