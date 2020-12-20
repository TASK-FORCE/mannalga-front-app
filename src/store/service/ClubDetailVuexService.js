import RequestHelper from '@/store/service/helper/RequestHelper.js';
import actionsHelper from '@/store/helper/ActionsHelper.js';
import store from '@/store';
import { MODULE } from '@/store/type/type.js';
import defaultBuilder from '@/store/utils/DefaultBuilder.js';

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
    return actionsHelper.requestFirstAlbumList(clubSeq);
}

class ClubDetailVuexService {
    constructor() {
        this.dispatching = false;
    }

    async dispatch(clubSeq, withLoading, routePathWhenFail) {
        if (this.dispatching) {
            return;
        }
        try {
            this.dispatching = true;
            const promiseList = [
                dispatchClubInfoAndUserInfo(clubSeq),
                dispatchClubMeetings(clubSeq),
                dispatchClubBoards(),
                dispatchClubAlbums(clubSeq),
            ];
            await RequestHelper.dispatchAll(withLoading, routePathWhenFail, promiseList);
        } finally {
            this.dispatching = false;
        }
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
