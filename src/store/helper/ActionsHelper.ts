import store from '@/store';
import { combineWithModuleName } from '@/store/utils/vuexUtils.js';
import { MODULE } from '@/store/type/type.js';

class ActionsHelper {
    // meeting module
    requestMeetingCreate = (payload): Promise<any> => dispatch(MODULE.MEETING, 'requestMeetingCreate', payload);
    requestMeetingEdit = (payload): Promise<any> => dispatch(MODULE.MEETING, 'requestMeetingEdit', payload);
    requestFirstMeetingGroupList = (payload): Promise<any> => dispatch(MODULE.MEETING, 'requestFirstMeetingGroupList', payload);
    requestNextMeetingGroupList = (payload): Promise<any> => dispatch(MODULE.MEETING, 'requestNextMeetingGroupList', payload);
    requestMeeting = (payload): Promise<any> => dispatch(MODULE.MEETING, 'requestMeeting', payload);
    requestMeetingApplication = (payload): Promise<any> => dispatch(MODULE.MEETING, 'requestMeetingApplication', payload);
    requestCancelMeetingApplication = (payload): Promise<any> => dispatch(MODULE.MEETING, 'requestCancelMeetingApplication', payload);

    // board module
    requestClubBoardCreate = (payload): Promise<any> => dispatch(MODULE.BOARD, 'requestClubBoardCreate', payload);
    requestBoard = (payload): Promise<any> => dispatch(MODULE.BOARD, 'requestBoard', payload);
    requestFirstBoardList = (payload): Promise<any> => dispatch(MODULE.BOARD, 'requestFirstBoardList', payload);
    requestNextBoardList = (payload): Promise<any> => dispatch(MODULE.BOARD, 'requestNextBoardList', payload);
    requestFirstBoardCommentList = (payload): Promise<any> => dispatch(MODULE.BOARD, 'requestFirstBoardCommentList', payload);
    requestNextBoardCommentList = (payload): Promise<any> => dispatch(MODULE.BOARD, 'requestNextBoardCommentList', payload);
    requestAllBoardCommentListWithPaging = (payload): Promise<any> => dispatch(MODULE.BOARD, 'requestAllBoardCommentListWithPaging', payload);
    requestBoardCommentWrite = (payload): Promise<any> => dispatch(MODULE.BOARD, 'requestBoardCommentWrite', payload);
    requestAllBoardSubCommentList = (payload): Promise<any> => dispatch(MODULE.BOARD, 'requestAllBoardSubCommentList', payload);
    requestApplyLikeClubBoard = (payload): Promise<any> => dispatch(MODULE.BOARD, 'requestApplyLikeClubBoard', payload);
    requestDeleteLikeClubBoard = (payload): Promise<any> => dispatch(MODULE.BOARD, 'requestDeleteLikeClubBoard', payload);

    // template module
    requestRegionTemplate = (payload): Promise<any> => dispatch(MODULE.TEMPLATE, 'requestRegionTemplate', payload);
    requestInterestTemplate = (payload): Promise<any> => dispatch(MODULE.TEMPLATE, 'requestInterestTemplate', payload);
}

const dispatch = (moduleName, actionsName, payload) => store.dispatch(combineWithModuleName(moduleName, actionsName), payload);

const actionsHelper = new ActionsHelper();
export default actionsHelper;
