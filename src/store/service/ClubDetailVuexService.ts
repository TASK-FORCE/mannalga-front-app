import RequestHelper from '@/store/service/helper/RequestHelper.js';
import actionsHelper from '@/store/helper/ActionsHelper.ts';
import store from '@/store/index.ts';
import { MODULE } from '@/store/type/type.js';
import DefaultBuilder from '@/store/utils/DefaultBuilder.ts';
import { ClubMutationTypes } from '@/store/type/mutationTypes';
import { ClubActionTypes } from '@/store/type/actionTypes';

function dispatchClubInfoAndUserInfo(clubSeq: number) {
    return store.dispatch(ClubActionTypes.REQUEST_CLUB_INFO_AND_USER_INFO, clubSeq);
}

function dispatchClubMeetings(clubSeq: number) {
    return actionsHelper.requestFirstMeetingGroupList(clubSeq);
}

function dispatchClubBoards(clubSeq: number) {
    return actionsHelper.requestFirstBoardList({ clubSeq });
}

function dispatchClubAlbums(clubSeq: number) {
    return actionsHelper.requestFirstAlbumList(clubSeq);
}

class ClubDetailVuexService {

    private dispatching: boolean;

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
                dispatchClubBoards(clubSeq),
                dispatchClubAlbums(clubSeq),
            ];
            await RequestHelper.dispatchAll(withLoading, routePathWhenFail, promiseList);
        } finally {
            this.dispatching = false;
        }
    }

    reset() {

        store.commit(ClubMutationTypes.SET_CLUB_DETAIL_CONTEXT, DefaultBuilder.clubDetailContext());
        store.commit(`${MODULE.MEETING}/initMeetingGroupList`);
        store.commit(`${MODULE.ALBUM}/initAlbumList`);
    }
}

const clubDetailVuexService = new ClubDetailVuexService();
export default clubDetailVuexService;
