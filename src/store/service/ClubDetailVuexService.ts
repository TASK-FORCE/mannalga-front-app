import RequestHelper from '@/store/service/helper/RequestHelper.ts';
import actionsHelper from '@/store/helper/ActionsHelper.ts';
import store from '@/store/index.ts';
import { MODULE } from '@/store/type/type.js';
import DefaultBuilder from '@/store/utils/DefaultBuilder.ts';
import { AlbumMutationTypes, BoardMutationTypes, ClubMutationTypes } from '@/store/type/mutationTypes';
import { AlbumActionTypes, BoardActionTypes, ClubActionTypes } from '@/store/type/actionTypes';

class ClubDetailVuexService {

    private dispatching: boolean;

    constructor() {
        this.dispatching = false;
    }

    async dispatch(clubSeq: number, withLoading: boolean, routePathWhenFail: string) {
        if (this.dispatching) {
            return;
        }
        try {
            this.dispatching = true;
            const promiseList: Promise<any>[] = [
                this.dispatchClubInfoAndUserInfo(clubSeq),
                this.dispatchClubMeetings(clubSeq),
                this.dispatchClubBoards(clubSeq),
                this.dispatchClubAlbums(clubSeq),
            ];
            await RequestHelper.dispatchAll(withLoading, routePathWhenFail, promiseList);
        } finally {
            this.dispatching = false;
        }
    }

    private dispatchClubInfoAndUserInfo(clubSeq: number): Promise<any> {
        return store.dispatch(ClubActionTypes.REQUEST_CLUB_INFO_AND_USER_INFO, clubSeq);
    }

    private dispatchClubMeetings(clubSeq: number): Promise<any> {
        return actionsHelper.requestFirstMeetingGroupList(clubSeq);
    }

    private dispatchClubBoards(clubSeq: number): Promise<any> {
        return store.dispatch(BoardActionTypes.REQUEST_FIRST_BOARD_LIST, { clubSeq });
    }

    private dispatchClubAlbums(clubSeq: number): Promise<any> {
        return store.dispatch(AlbumActionTypes.REQUEST_FIRST_ALBUM_LIST, clubSeq)
    }

    public reset(): void {
        store.commit(ClubMutationTypes.SET_CLUB_DETAIL_CONTEXT, DefaultBuilder.clubDetailContext());
        store.commit(`${MODULE.MEETING}/initMeetingGroupList`);
        store.commit(AlbumMutationTypes.INIT_ALBUM_LIST);
        store.commit(BoardMutationTypes.INIT_BOARD_LIST);
    }
}

const clubDetailVuexService = new ClubDetailVuexService();
export default clubDetailVuexService;


