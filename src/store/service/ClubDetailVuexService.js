import RequestHelper from '@/store/service/helper/RequestHelper.js';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import store from '@/store';
import { MODULE } from '@/store/type/type.js';
import defaultBuilder from '@/store/utils/DefaultBuilder.js';
import gettersHelper from '@/store/helper/GettersHelper.js';
import _ from '@/utils/common/lodashWrapper.js';

function dispatchClubInfoAndUserInfo(clubSeq) {
    return actionsHelper.requestClubInfoAndUserInfo(clubSeq);
}

function dispatchClubMeetings(clubSeq) {
    return actionsHelper.requestFirstMeetingList(clubSeq);
}

function dispatchClubBoards() {
    return Promise.resolve();
}

function dispatchClubAlbums(clubSeq) {
    if (_.isEmpty(gettersHelper.albumList())) {
        return actionsHelper.requestFirstAlbumList(clubSeq);
    }
    return Promise.resolve();
}

class ClubDetailVuexService {
    async dispatch(clubSeq, withLoading, routePathWhenFail) {
        const promiseList = [
            dispatchClubInfoAndUserInfo(clubSeq),
            dispatchClubMeetings(clubSeq),
            dispatchClubBoards(),
            dispatchClubAlbums(clubSeq),
        ];
        await RequestHelper.dispatchAll(withLoading, routePathWhenFail, promiseList);
    }

    reset() {
        store.commit(`${MODULE.CLUB}/setClubInfo`, defaultBuilder.buildClubInfo());
        store.commit(`${MODULE.CLUB}/setUserInfo`, defaultBuilder.buildUserInfo());
        store.commit(`${MODULE.MEETING}/initMeetingList`);
        store.commit(`${MODULE.ALBUM}/initAlbumList`);
    }
}

const clubDetailVuexService = new ClubDetailVuexService();
export default clubDetailVuexService;
