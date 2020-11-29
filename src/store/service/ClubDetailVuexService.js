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

function dispatchClubAlbums() {
    return Promise.resolve();
}

class ClubDetailVuexService {
    async dispatch(clubSeq, withLoading, routePathWhenFail) {
        const promiseList = [
            dispatchClubInfoAndUserInfo(clubSeq),
            dispatchClubMeetings(clubSeq),
            dispatchClubBoards(),
            dispatchClubAlbums(),
        ];
        await RequestHelper.dispatchAll(withLoading, routePathWhenFail, promiseList);
    }

    reset() {
        store.commit(`${MODULE.CLUB}/setClubInfo`, defaultBuilder.buildClubInfo());
        store.commit(`${MODULE.CLUB}/setUserInfo`, defaultBuilder.buildUserInfo());
        store.commit(`${MODULE.MEETING}/setMeetingList`, {
            meetingList: [],
            meetingPage: defaultBuilder.buildPage(),
        });
    }
}

const clubDetailVuexService = new ClubDetailVuexService();
export default clubDetailVuexService;
