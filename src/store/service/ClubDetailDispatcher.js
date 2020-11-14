import RequestHelper from '@/store/service/helper/RequestHelper.js';
import actionsHelper from '@/store/helper/ActionsHelper.js';

function dispatchClubInfoAndUserInfo(clubSeq) {
    return actionsHelper.requestClubInfoAndUserInfo(clubSeq);
}

function dispatchClubMeetings() {
    return Promise.resolve();
}

function dispatchClubBoards() {
    return Promise.resolve();
}

function dispatchClubAlbums() {
    return Promise.resolve();
}

class ClubDetailDispatcher {
    async dispatch(clubSeq, withLoading, routePathWhenFail) {
        const promiseList = [
            dispatchClubInfoAndUserInfo(clubSeq),
            dispatchClubMeetings(),
            dispatchClubBoards(),
            dispatchClubAlbums(),
        ];
        await RequestHelper.dispatchAll(withLoading, routePathWhenFail, promiseList);
    }
}

const clubDetailDispatcher = new ClubDetailDispatcher();
export default clubDetailDispatcher;
