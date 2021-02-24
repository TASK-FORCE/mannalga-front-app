import store from '@/store';
import { combineWithModuleName } from '@/store/utils/vuexUtils.js';
import { MODULE } from '@/store/type/type.js';

class ActionsHelper {
    // auth module
    requestKakaoTokenByCode = (payload) => dispatch(MODULE.AUTH, 'requestKakaoTokenByCode', payload);

    // club module
    requestClubCreate = (payload) => dispatch(MODULE.CLUB, 'requestClubCreate', payload);
    requestClubChange = (payload) => dispatch(MODULE.CLUB, 'requestClubChange', payload);
    requestClubData = (payload) => dispatch(MODULE.CLUB, 'requestClubData', payload);
    requestClubJoin = (payload) => dispatch(MODULE.CLUB, 'requestClubJoin', payload);
    requestClubInfoAndUserInfo = (payload) => dispatch(MODULE.CLUB, 'requestClubInfoAndUserInfo', payload);

    // meeting module
    requestMeetingCreate = (payload) => dispatch(MODULE.MEETING, 'requestMeetingCreate', payload);
    requestMeetingEdit = (payload) => dispatch(MODULE.MEETING, 'requestMeetingEdit', payload);
    requestFirstMeetingGroupList = (payload) => dispatch(MODULE.MEETING, 'requestFirstMeetingGroupList', payload);
    requestNextMeetingGroupList = (payload) => dispatch(MODULE.MEETING, 'requestNextMeetingGroupList', payload);
    requestMeeting = (payload) => dispatch(MODULE.MEETING, 'requestMeeting', payload);
    requestMeetingApplication = (payload) => dispatch(MODULE.MEETING, 'requestMeetingApplication', payload);
    requestCancelMeetingApplication = (payload) => dispatch(MODULE.MEETING, 'requestCancelMeetingApplication', payload);

    // board module
    requestClubBoardCreate = (payload) => dispatch(MODULE.BOARD, 'requestClubBoardCreate', payload);
    requestBoard = (payload) => dispatch(MODULE.BOARD, 'requestBoard', payload);
    requestFirstBoardList = (payload) => dispatch(MODULE.BOARD, 'requestFirstBoardList', payload);
    requestNextBoardList = (payload) => dispatch(MODULE.BOARD, 'requestNextBoardList', payload);
    requestFirstBoardCommentList = (payload) => dispatch(MODULE.BOARD, 'requestFirstBoardCommentList', payload);
    requestNextBoardCommentList = (payload) => dispatch(MODULE.BOARD, 'requestNextBoardCommentList', payload);
    requestAllBoardCommentListWithPaging = (payload) => dispatch(MODULE.BOARD, 'requestAllBoardCommentListWithPaging', payload);
    requestBoardCommentWrite = (payload) => dispatch(MODULE.BOARD, 'requestBoardCommentWrite', payload);
    requestAllBoardSubCommentList = (payload) => dispatch(MODULE.BOARD, 'requestAllBoardSubCommentList', payload);
    requestApplyLikeClubBoard = (payload) => dispatch(MODULE.BOARD, 'requestApplyLikeClubBoard', payload);
    requestDeleteLikeClubBoard = (payload) => dispatch(MODULE.BOARD, 'requestDeleteLikeClubBoard', payload);

    // album module
    requestAlbumCreate = (payload) => dispatch(MODULE.ALBUM, 'requestAlbumCreate', payload);
    requestAlbum = (payload) => dispatch(MODULE.ALBUM, 'requestAlbum', payload);
    requestFirstAlbumList = (payload) => dispatch(MODULE.ALBUM, 'requestFirstAlbumList', payload);
    requestNextAlbumList = (payload) => dispatch(MODULE.ALBUM, 'requestNextAlbumList', payload);
    requestAlbumCommentWrite = (payload) => dispatch(MODULE.ALBUM, 'requestAlbumCommentWrite', payload);
    requestFirstAlbumCommentList = (payload) => dispatch(MODULE.ALBUM, 'requestFirstAlbumCommentList', payload);
    requestNextAlbumCommentList = (payload) => dispatch(MODULE.ALBUM, 'requestNextAlbumCommentList', payload);
    requestAllAlbumCommentListWithPaging = (payload) => dispatch(MODULE.ALBUM, 'requestAllAlbumCommentListWithPaging', payload);
    requestAllAlbumSubCommentList = (payload) => dispatch(MODULE.ALBUM, 'requestAllAlbumSubCommentList', payload);
    requestApplyLikeClubAlbum = (payload) => dispatch(MODULE.ALBUM, 'requestApplyLikeClubAlbum', payload);
    requestDeleteLikeClubAlbum = (payload) => dispatch(MODULE.ALBUM, 'requestDeleteLikeClubAlbum', payload);

    // clubList module
    requestFirstClubList = (payload) => dispatch(MODULE.CLUB_LIST, 'requestFirstClubList', payload);
    requestNextClubList = (payload) => dispatch(MODULE.CLUB_LIST, 'requestNextClubList', payload);
    requestFirstMyClubList = (payload) => dispatch(MODULE.CLUB_LIST, 'requestFirstMyClubList', payload);
    requestNextMyClubList = (payload) => dispatch(MODULE.CLUB_LIST, 'requestNextMyClubList', payload);

    // common module
    uploadTempImage = (payload) => dispatch(MODULE.COMMON, 'uploadTempImage', payload);

    // template module
    requestRegionTemplate = (payload) => dispatch(MODULE.TEMPLATE, 'requestRegionTemplate', payload);
    requestInterestTemplate = (payload) => dispatch(MODULE.TEMPLATE, 'requestInterestTemplate', payload);

    // user module
    requestKakaoProfile = (payload) => dispatch(MODULE.USER, 'requestKakaoProfile', payload);
    postRegister = (payload) => dispatch(MODULE.USER, 'postRegister', payload);
    requestRegisterStatus = (payload) => dispatch(MODULE.USER, 'requestRegisterStatus', payload);
    requestUserProfile = (payload) => dispatch(MODULE.USER, 'requestUserProfile', payload);
    requestUserRegions = (payload) => dispatch(MODULE.USER, 'requestUserRegions', payload);
    requestUserInterests = (payload) => dispatch(MODULE.USER, 'requestUserInterests', payload);
    requestChangeUserRegions = (payload) => dispatch(MODULE.USER, 'requestChangeUserRegions', payload);
    requestChangeUserInterests = (payload) => dispatch(MODULE.USER, 'requestChangeUserInterests', payload);
    requestCheckIsMember = (payload) => dispatch(MODULE.USER, 'requestCheckIsMember', payload);
    requestChangeUserProfile = (payload) => dispatch(MODULE.USER, 'requestChangeUserProfile', payload);
}

const dispatch = (moduleName, actionsName, payload) => store.dispatch(combineWithModuleName(moduleName, actionsName), payload);

const actionsHelper = new ActionsHelper();
export default actionsHelper;
