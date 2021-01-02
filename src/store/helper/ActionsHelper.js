import store from '@/store';
import { combineWithModuleName } from '@/store/utils/vuexUtils.js';
import { MODULE } from '@/store/type/type.js';

class ActionsHelper {
    // auth module
    requestKakaoTokenByCode = (payload) => dispatch(MODULE.AUTH, 'requestKakaoTokenByCode', payload);

    // club module
    requestClubCreate = (payload) => dispatch(MODULE.CLUB, 'requestClubCreate', payload);
    requestClubData = (payload) => dispatch(MODULE.CLUB, 'requestClubData', payload);
    requestClubJoin = (payload) => dispatch(MODULE.CLUB, 'requestClubJoin', payload);
    requestClubCreateBoard = (payload) => dispatch(MODULE.CLUB, 'requestClubBoardCreate', payload);
    requestClubInfoAndUserInfo = (payload) => dispatch(MODULE.CLUB, 'requestClubInfoAndUserInfo', payload);

    // meeting module
    requestMeetingCreate = (payload) => dispatch(MODULE.MEETING, 'requestMeetingCreate', payload);
    requestFirstMeetingList = (payload) => dispatch(MODULE.MEETING, 'requestFirstMeetingList', payload);
    requestNextMeetingList = (payload) => dispatch(MODULE.MEETING, 'requestNextMeetingList', payload);
    requestMeeting = (payload) => dispatch(MODULE.MEETING, 'requestMeeting', payload);
    requestMeetingApplication = (payload) => dispatch(MODULE.MEETING, 'requestMeetingApplication', payload);
    requestCancelMeetingApplication = (payload) => dispatch(MODULE.MEETING, 'requestCancelMeetingApplication', payload);

    // album module
    requestAlbumCreate = (payload) => dispatch(MODULE.ALBUM, 'requestAlbumCreate', payload);
    requestFirstAlbumList = (payload) => dispatch(MODULE.ALBUM, 'requestFirstAlbumList', payload);
    requestNextAlbumList = (payload) => dispatch(MODULE.ALBUM, 'requestNextAlbumList', payload);
    requestAlbumCommentWrite = (payload) => dispatch(MODULE.ALBUM, 'requestAlbumCommentWrite', payload);

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
    requestChangeUserRegions = (payload) => dispatch(MODULE.USER, 'requestChangeUserRegion', payload);
    requestChangeUserInterests = (payload) => dispatch(MODULE.USER, 'requestChangeUserInterest', payload);
    requestCheckIsMember = (payload) => dispatch(MODULE.USER, 'requestCheckIsMember', payload);
}

const dispatch = (moduleName, actionsName, payload) => store.dispatch(combineWithModuleName(moduleName, actionsName), payload);

const actionsHelper = new ActionsHelper();
export default actionsHelper;
