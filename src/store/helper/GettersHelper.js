import store from '@/store';
import { combineWithModuleName } from '@/store/utils/vuexUtils.js';
import { MODULE } from '@/store/type/type.js';

const { getters } = store;

class GettersHelper {
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

    // template module
    rootRegions = () => getState(MODULE.TEMPLATE, 'rootRegions');
    rootInterests = () => getState(MODULE.TEMPLATE, 'rootInterests');
}

const getState = (moduleName, getterName) => getters[combineWithModuleName(moduleName, getterName)];

const gettersHelper = new GettersHelper();
export default gettersHelper;
