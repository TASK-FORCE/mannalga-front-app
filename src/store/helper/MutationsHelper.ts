import store from '@/store';
import { combineWithModuleName } from '@/store/utils/vuexUtils.js';
import { MODULE } from '@/store/type/type.js';

class MutationsHelper {
    // meeting
    setMeeting = (payload?) => commit(MODULE.MEETING, 'setMeeting', payload);

    // board
    initBoardCommentList = (payload?) => commit(MODULE.BOARD, 'initBoardCommentList', payload);
    countChildBoardCommentCnt = (payload?) => commit(MODULE.BOARD, 'countChildBoardCommentCnt', payload);
    countBoardCommentCnt = (payload?) => commit(MODULE.BOARD, 'countBoardCommentCnt', payload);

    // album
    initAlbumCommentList = (payload?) => commit(MODULE.ALBUM, 'initAlbumCommentList', payload);
    countChildAlbumCommentCnt = (payload?) => commit(MODULE.ALBUM, 'countChildCommentCnt', payload);
    countAlbumCommentCnt = (payload?) => commit(MODULE.ALBUM, 'countAlbumCommentCnt', payload);
}

// @ts-ignore
const commit = (moduleName, commitName, payload) => store.commit(combineWithModuleName(moduleName, commitName), payload);

const mutationsHelper = new MutationsHelper();
export default mutationsHelper;
